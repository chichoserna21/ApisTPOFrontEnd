import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="alma-notfound-page">
      <div className="notfound-card">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Página no encontrada</h1>
        <p className="notfound-text">
          Lo sentimos, la página que buscas no existe, ha cambiado de dirección o se encuentra temporalmente fuera de servicio.
        </p>
        <div className="notfound-actions">
          <button onClick={() => navigate(-1)} className="btn-secondary">
            &larr; Volver atrás
          </button>
          <Link to="/" className="btn-primary">
            Ir al inicio
          </Link>
          <Link to="/productos" className="btn-outline">
            Ver catálogo de productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
