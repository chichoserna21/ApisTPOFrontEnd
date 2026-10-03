import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import './App.css';
import ProductDetail from './components/ProductDetail';

// Componentes para las vistas principales del proyecto
function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Estética & Cuidado Personal</h1>
      <p>Bienvenido/a a nuestra tienda. Descubrí nuestros productos y promociones exclusivas.</p>
    </div>
  );
}

function Cart() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tu Carrito de Compras</h2>
      <p>Aquí se visualizarán los ítems seleccionados antes de confirmar tu pedido.</p>
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

function Login() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <p>Accedé con tu cuenta para gestionar tus compras y perfil.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegación superior (SPA) */}
      <nav style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '1.5rem', 
        padding: '1rem 2rem', 
        backgroundColor: '#2c3e50', 
        color: '#ffffff'
      }}>
        <h2 style={{ margin: 0, marginRight: 'auto', fontSize: '1.4rem' }}>Estética App</h2>
        
        {/* Uso de <Link> en lugar de <a href=""> para evitar recargar la página */}
        <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/productos" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Productos</Link>
        <Link to="/ofertas" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Ofertas</Link>
        <Link to="/carrito" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Carrito</Link>
        <Link to="/login" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Ingresar</Link>
      </nav>

      {/* Definición de Rutas */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} /> {/* <--- Ruta dinámica */}
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;