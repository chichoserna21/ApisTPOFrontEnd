import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart, clearCart, switchCartUser } from './store/cartSlice';
import { logout } from './store/authSlice';
import { clearAccount, checkoutOrder, loadAccountData, mutateServerCart } from './store/accountSlice';
import productsData from './data/products.json';
import { fetchProductos, normalizeProduct } from './services/api';
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
import './App.css';

function App() {
  const dispatch = useDispatch();

  // Estados de Redux
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { profile, favorites, orders, loading: accountLoading, error: accountError } = useSelector((state) => state.account);

  // Estados locales para los productos y API
  const [products, setProducts] = useState(productsData.map(normalizeProduct));
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);

  /**
   * LLAMADA A LA API DEL TPO MEDIANTE EL HOOK useEffect
   * Consume GET /api/productos al montar el componente.
   */
  useEffect(() => {
    let isMounted = true;
    fetchProductos()
      .then((apiProducts) => {
        if (!isMounted) return;
        if (apiProducts && apiProducts.length > 0) {
          setProducts(apiProducts);
          setBackendOnline(true);
        } else {
          setProducts(productsData.map(normalizeProduct));
        }
        setApiError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('Backend API no disponible (usando catálogo de respaldo):', err.message);
        setProducts(productsData.map(normalizeProduct));
        setApiError('Backend fuera de línea (puerto 8080).');
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

  // Handlers que ahora despachan acciones a REDUX
  const handleAddToCart = (product, quantity = 1, formato = '50 ml') => {
    if (isAuthenticated) {
      dispatch(mutateServerCart({ type: 'add', product, quantity, formato }));
    } else {
      dispatch(addToCart({ product, quantity, formato }));
    }
  };

  const handleUpdateQuantity = (id, formato, cantidad) => {
    if (isAuthenticated) {
      dispatch(mutateServerCart({ type: 'quantity', id, formato, cantidad }));
    } else {
      dispatch(updateQuantity({ id, formato, cantidad }));
    }
  };

  const handleRemoveItem = (id, formato) => {
    if (isAuthenticated) {
      dispatch(mutateServerCart({ type: 'remove', id, formato }));
    } else {
      dispatch(removeFromCart({ id, formato }));
    }
  };

  const handleClearCart = () => {
    if (isAuthenticated) {
      dispatch(mutateServerCart({ type: 'clear' }));
    } else {
      dispatch(clearCart());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAccount());
    dispatch(switchCartUser(null));
  };

  const handleCheckout = async () => {
    const order = await dispatch(checkoutOrder()).unwrap();
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
            ● API Spring Boot Conectada (http://localhost:8080)
          </span>
        ) : (
          <span className="api-status-pill offline" title={apiError || ''}>
            ○ Modo Catálogo Local Activo (Backend 8080 desconectado)
          </span>
        )}
      </div>
      {accountError && <p role="alert" className="auth-error-banner">{accountError}</p>}

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
              <ProtectedRoute isAuthenticated={isAuthenticated}>
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
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile
                  user={{ ...user, ...profile }}
                  orders={orders}
                  onLogout={handleLogout}
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
