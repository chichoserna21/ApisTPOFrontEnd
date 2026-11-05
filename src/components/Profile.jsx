import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, orders = [], onLogout }) => {
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
          <span className="profile-badge">{user?.rol || 'Cliente ALMA'}</span>
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
          {orders.length === 0 ? <p>Todavía no tenés pedidos.</p> : orders.map((order) => (
            <div className="order-history-item" key={order.id}>
              <div className="order-history-header">
                <strong>Pedido #{order.id}</strong>
                <span className="status-delivered">{order.estado}</span>
              </div>
              <p className="order-date">{new Date(order.fecha).toLocaleString('es-AR')}</p>
              <p className="order-items">
                {order.items.map((item) => `${item.nombre} x${item.cantidad}`).join(', ')}
              </p>
              <span className="order-total">Total: {Number(order.total).toFixed(2).replace('.', ',')} €</span>
            </div>
          ))}
        </div>

        {/* Sección: Información de cuenta y seguridad */}
        <div className="profile-card">
          <h3>🔒 Seguridad y Sesión</h3>
          <p className="security-info">
            Estado de autenticación: <strong>Activo</strong>
          </p>
          <p className="security-info">
            Rol de usuario: <code>{user?.rol || 'ROLE_CLIENTE'}</code>
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
