import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart, clearCart, switchCartUser } from './store/cartSlice';
import { logoutUser, restoreSession } from './store/authSlice';
import { clearAccount, checkoutOrder, loadAccountData, mutateServerCart } from './store/accountSlice';
import { fetchProductos } from './services/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Favorites from './components/Favorites';
import Ofertas from './components/Ofertas';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const cartMutationQueue = useRef(Promise.resolve(null));

  // Estados de Redux
  const cartItems = useSelector((state) => state.cart.items);
  const {
    user,
    isAuthenticated,
    sessionInitialized,
    sessionLoading,
    sessionError,
    logoutError
  } = useSelector((state) => state.auth);
  const { profile, favorites, orders, loading: accountLoading, error: accountError } = useSelector((state) => state.account);
  const cartError = useSelector((state) => state.cart.syncError);

  // Estados locales para los productos y API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  /**
   * LLAMADA A LA API DEL TPO MEDIANTE EL HOOK useEffect
   * Consume GET /api/productos al montar el componente.
   */
  useEffect(() => {
    let isMounted = true;
    fetchProductos()
      .then((apiProducts) => {
        if (!isMounted) return;
        setProducts(apiProducts);
        setBackendOnline(true);
        setApiError(
          apiProducts.length === 0
            ? 'La API respondió correctamente, pero no hay productos cargados en la base de datos.'
            : null
        );
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('No se pudo cargar el catálogo desde la API:', err);
        setProducts([]);
        setApiError(`No se pudo cargar el catálogo desde la API: ${err.message}`);
        setBackendOnline(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) dispatch(loadAccountData());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(switchCartUser(isAuthenticated ? user?.email : null));
  }, [dispatch, isAuthenticated, user?.email]);

  const syncServerCart = (operation) => {
    const result = cartMutationQueue.current.then(() => dispatch(mutateServerCart(operation)));
    cartMutationQueue.current = result.catch(() => null);
    return result;
  };

  // Handlers que ahora despachan acciones a REDUX
  const handleAddToCart = (product, quantity = 1, formato = '') => {
    if (isAuthenticated) {
      syncServerCart({ type: 'add', product, quantity, formato });
    } else {
      dispatch(addToCart({ product, quantity, formato }));
    }
  };

  const handleUpdateQuantity = (id, formato, cantidad) => {
    if (isAuthenticated) {
      syncServerCart({ type: 'quantity', id, formato, cantidad });
    } else {
      dispatch(updateQuantity({ id, formato, cantidad }));
    }
  };

  const handleRemoveItem = (id, formato) => {
    if (isAuthenticated) {
      syncServerCart({ type: 'remove', id, formato });
    } else {
      dispatch(removeFromCart({ id, formato }));
    }
  };

  const handleClearCart = () => {
    if (isAuthenticated) {
      syncServerCart({ type: 'clear' });
    } else {
      dispatch(clearCart());
    }
  };

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (!logoutUser.fulfilled.match(result)) return false;
    dispatch(clearAccount());
    dispatch(switchCartUser(null));
    return true;
  };

  const handleCheckout = async () => {
    const lastCartMutation = await cartMutationQueue.current;
    if (lastCartMutation && mutateServerCart.rejected.match(lastCartMutation)) {
      throw new Error(lastCartMutation.payload || lastCartMutation.error.message);
    }

    const order = await dispatch(checkoutOrder()).unwrap();
    try {
      const updatedProducts = await fetchProductos();
      setProducts(updatedProducts);
      setBackendOnline(true);
      setApiError(
        updatedProducts.length === 0
          ? 'El pedido se confirmó, pero la API no devolvió productos para actualizar el catálogo.'
          : null
      );
    } catch (error) {
      console.error('El pedido se confirmó, pero no se pudo actualizar el catálogo:', error);
      setApiError(
        `El pedido #${order.id} se confirmó, pero no se pudo actualizar el catálogo: ${error.message}`
      );
    }
    return order;
  };

  return (
    <BrowserRouter>
      {/* Header con Redux y categorías del backend */}
      <Navbar />

      {/* Indicador de estado de la API Spring Boot */}
      <div className="api-status-banner">
        {backendOnline ? (
          <span className="api-status-pill online">
            ● API Spring Boot conectada · {products.length} productos cargados desde el backend
          </span>
        ) : (
          <span className="api-status-pill offline" title={apiError || ''}>
            ○ Modo Catálogo Local Activo (Backend 8080 desconectado)
          </span>
        )}
      </div>
      {apiError && <p role="alert" className="auth-error-banner">{apiError}</p>}
      {sessionError && <p role="alert" className="auth-error-banner">{sessionError}</p>}
      {logoutError && <p role="alert" className="auth-error-banner">{logoutError}</p>}
      {accountError && <p role="alert" className="auth-error-banner">{accountError}</p>}
      {cartError && <p role="alert" className="auth-error-banner">{cartError}</p>}

      {/* Contenido principal ruteado con React Router */}
      <main className="alma-main-viewport">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                loading={loading}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <ProductList
                products={products}
                loading={loading}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/productos/:id"
            element={
              <ProductDetail
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/ofertas"
            element={
              <Ofertas
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/carrito"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                checkingSession={!sessionInitialized || sessionLoading}
              >
                <Favorites
                  products={products}
                  favoriteIds={favorites}
                  loading={accountLoading}
                  onAddToCart={handleAddToCart}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* RUTA PROTEGIDA CON REDUX */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                checkingSession={!sessionInitialized || sessionLoading}
              >
                <Profile
                  user={{ ...user, ...profile }}
                  orders={orders}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                checkingSession={!sessionInitialized || sessionLoading}
                userRole={user?.rol}
                requiredRole="ROLE_ADMIN"
                checkingRole={
                  accountLoading ||
                  (isAuthenticated && !user?.rol && !accountError)
                }
              >
                <AdminDashboard
                  onProductsChanged={async () => {
                    const updatedProducts = await fetchProductos();
                    setProducts(updatedProducts);
                    setBackendOnline(true);
                    setApiError(null);
                  }}
                />
              </ProtectedRoute>
            }
          />

          {/* RUTA 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
