import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente de Ruta Protegida:
 * Si el usuario no está autenticado, lo redirige al login guardando la ruta de origen
 * en el state para volver a ella una vez iniciada la sesión.
 */
const ProtectedRoute = ({
  children,
  isAuthenticated,
  userRole,
  requiredRole,
  checkingRole = false,
  checkingSession = false
}) => {
  const location = useLocation();

  if (checkingSession) {
    return <p className="protected-route-loading">Verificando sesión...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && checkingRole) {
    return <p className="protected-route-loading">Verificando permisos...</p>;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
