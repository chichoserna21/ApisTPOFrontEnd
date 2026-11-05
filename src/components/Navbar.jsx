import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { switchCartUser } from '../store/cartSlice';
import { clearAccount } from '../store/accountSlice';
import { fetchCategorias } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Datos globales desde Redux
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.account.profile);

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0
  );

  // Cargar categorías reales desde el backend con useEffect
  useEffect(() => {
    fetchCategorias()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategorias(data);
        } else {
          setCategorias([{ id: 1, nombre: 'Skincare' }, { id: 2, nombre: 'Maquillaje' }]);
        }
      })
      .catch(() => {
        setCategorias([{ id: 1, nombre: 'Skincare' }, { id: 2, nombre: 'Maquillaje' }]);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/productos');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAccount());
    dispatch(switchCartUser(null));
    navigate('/');
  };

  return (
    <header className="alma-header">
      {/* Barra superior de anuncios */}
      <div className="alma-top-bar">
        <span>UN FOCO DE CUIDADO, MUCHO DE TI · Envío gratis en pedidos desde 50 €</span>
      </div>

      {/* Barra principal: Logo, Buscador, Acciones */}
      <div className="alma-main-nav">
        <div className="alma-nav-container">
          <Link to="/" className="alma-logo-brand">
            <span className="alma-brand-name">ALMA</span>
            <span className="alma-brand-tagline">El arte de cuidarte</span>
          </Link>

          {/* Buscador */}
          <form className="alma-search-form" onSubmit={handleSearch}>
            <span className="alma-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Busca tu próximo favorito..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="alma-search-input"
            />
          </form>

          {/* Acciones de usuario y carrito */}
          <div className="alma-user-actions">
            {isAuthenticated ? (
              <div className="alma-user-badge">
                <Link to="/perfil" className="alma-action-link">
                  👤 <span>{profile?.nombre || user?.nombre || 'Mi Cuenta'}</span>
                </Link>
                <Link to="/favoritos" className="alma-action-link">
                  ❤️ <span>Favoritos</span>
                </Link>
                <button onClick={handleLogout} className="alma-logout-btn" title="Cerrar sesión">
                  (Salir)
                </button>
              </div>
            ) : (
              <Link to="/login" className="alma-action-link" title="Ingresar">
                👤 <span>Mi cuenta</span>
              </Link>
            )}

            <Link to="/carrito" className="alma-action-link alma-cart-link">
              🛍️ <span>Carrito</span>
              {totalCartCount > 0 && <span className="alma-cart-badge">{totalCartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Menú de categorías dinámico desde el backend */}
      <nav className="alma-categories-nav">
        <div className="alma-categories-container">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Inicio
          </NavLink>
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              to={`/productos?categoria=${encodeURIComponent(cat.nombre)}`}
              className={location.search.includes(encodeURIComponent(cat.nombre)) ? 'active' : ''}
            >
              {cat.nombre}
            </Link>
          ))}
          <NavLink 
            to="/ofertas" 
            className={({ isActive }) => `ofertas-link ${isActive ? 'active' : ''}`}
          >
            Ofertas
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
