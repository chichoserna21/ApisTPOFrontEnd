import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart, clearCart, switchCartUser } from './store/cartSlice';
import { logout } from './store/authSlice';
import productsData from './data/products.json';
import { fetchProductos, normalizeProduct } from './services/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
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
    setLoading(true);

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

  // Handlers que ahora despachan acciones a REDUX
  const handleAddToCart = (product, quantity = 1, formato = '50 ml') => {
    dispatch(addToCart({ product, quantity, formato }));
  };

  const handleUpdateQuantity = (id, formato, cantidad) => {
    dispatch(updateQuantity({ id, formato, cantidad }));
  };

  const handleRemoveItem = (id, formato) => {
    dispatch(removeFromCart({ id, formato }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(switchCartUser(null));
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
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* RUTA PROTEGIDA CON REDUX */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} onLogout={handleLogout} />
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
