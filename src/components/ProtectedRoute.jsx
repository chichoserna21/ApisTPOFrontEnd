import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente de Ruta Protegida:
 * Si el usuario no está autenticado, lo redirige al login guardando la ruta de origen
 * en el state para volver a ella una vez iniciada la sesión.
 */
const ProtectedRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
