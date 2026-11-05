import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="alma-profile-page">
      <div className="profile-header-card">
        <div className="profile-avatar">
          {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="profile-info">
          <span className="profile-badge">Cliente ALMA</span>
          <h1 className="profile-name">{user?.nombre || 'Usuario'}</h1>
          <p className="profile-email">{user?.email}</p>
        </div>
        <button onClick={handleLogoutClick} className="profile-logout-cta">
          Cerrar sesión
        </button>
      </div>

      <div className="profile-grid">
        {/* Sección: Mis Pedidos */}
        <div className="profile-card">
          <h3>📦 Mis Pedidos Recientes</h3>
          <div className="order-history-item">
            <div className="order-history-header">
              <strong>Pedido #ALMA-2026-89</strong>
              <span className="status-delivered">Entregado</span>
            </div>
            <p className="order-date">15 de octubre, 2026</p>
            <p className="order-items">Crema Hidratante Hydra 50ml, Sérum Vitamina C</p>
            <span className="order-total">Total: 50,40 €</span>
          </div>
        </div>

        {/* Sección: Información de cuenta y seguridad */}
        <div className="profile-card">
          <h3>🔒 Seguridad y Sesión</h3>
          <p className="security-info">
            Estado de autenticación: <strong>Activo</strong>
          </p>
          <p className="security-info">
            Token JWT: <code>{user?.token ? `${user.token.slice(0, 24)}...` : 'Sesión local'}</code>
          </p>
          <p className="security-info">
            Rol de usuario: <code>{user?.rol || 'ROLE_USER'}</code>
          </p>
          <button onClick={() => navigate('/productos')} className="profile-shop-btn">
            Ir a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
