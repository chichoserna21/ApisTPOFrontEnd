import { Navigate } from 'react-router-dom';

// Componente que simula la protección de rutas (ej: solo usuarios autenticados)
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // Redirige al login si no está autenticado, reemplazando la historia
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;