import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Estética & Cuidado Personal</h1>
      <p>Bienvenido/a a nuestra tienda. Descubrí nuestros productos y promociones exclusivas.</p>
    </div>
  );
}

function Ofertas() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Ofertas Especiales</h2>
      <p>Aprovechá los descuentos y tratamientos destacados de la semana.</p>
    </div>
  );
}

function Login({ isAuthenticated, setIsAuthenticated }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <p>Estado actual: {isAuthenticated ? 'Conectado' : 'No conectado'}</p>
      <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
        {isAuthenticated ? 'Cerrar Sesión' : 'Simular Iniciar Sesión'}
      </button>
    </div>
  );
}

function App() {
  // Estado para simular si el usuario inició sesión
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <nav style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '1.5rem', 
        padding: '1rem 2rem', 
        backgroundColor: '#2c3e50', 
        color: '#ffffff'
      }}>
        <h2 style={{ margin: 0, marginRight: 'auto', fontSize: '1.4rem' }}>Estética App</h2>
        
        <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/productos" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Productos</Link>
        <Link to="/ofertas" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Ofertas</Link>
        <Link to="/carrito" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Carrito</Link>
        <Link to="/login" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Ingresar</Link>
      </nav>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/ofertas" element={<Ofertas />} />
          
          {/* Ruta Protegida: Solo accede si isAuthenticated es true */}
          <Route 
            path="/carrito" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/login" 
            element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;