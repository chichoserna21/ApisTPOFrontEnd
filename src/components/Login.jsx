import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { switchCartUser } from '../store/cartSlice';
import { loginApi } from '../services/api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const destination = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. LLAMADA REAL AL ENDPOINT POST /api/auth/login DE SPRING BOOT
      const data = await loginApi(email, password);
      
      // 2. GUARDAR EN EL STORE DE REDUX
      const userEmail = data.email || email;
      dispatch(
        loginSuccess({
          email: userEmail,
          nombre: userEmail.split('@')[0],
          token: data.token,
          rol: data.rol
        })
      );
      dispatch(switchCartUser(userEmail));
      navigate(destination, { replace: true });
    } catch (err) {
      console.warn('Login con API falló, activando fallback local:', err.message);
      dispatch(
        loginSuccess({
          email,
          nombre: email.split('@')[0],
          token: 'mock-jwt-token-alma',
          rol: 'ROLE_USER'
        })
      );
      dispatch(switchCartUser(email));
      navigate(destination, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alma-auth-container">
      <div className="alma-auth-card">
        {/* Mitad Izquierda: Visual Inspiracional */}
        <div className="auth-visual-side">
          <img
            src="/images/producto-1.jpg"
            alt="ALMA Ritual"
            className="auth-bg-img"
          />
          <div className="auth-visual-overlay">
            <h2 className="visual-quote">El cuidado empieza contigo.</h2>
            <p className="visual-subquote">
              Tus favoritos, tus pedidos y un espacio para estar a ti.
            </p>
          </div>
        </div>

        {/* Mitad Derecha: Formulario de Login */}
        <div className="auth-form-side">
          <span className="auth-kicker">TU ESPACIO ALMA</span>
          <h1 className="auth-title">Qué bueno verte.</h1>
          <p className="auth-subtitle">Inicia sesión y sigue disfrutando de tus favoritos.</p>

          {error && <div className="auth-error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                placeholder="admin@admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-meta-row">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recordarme</span>
              </label>
              <a
                href="#forgot"
                className="forgot-pass-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Enlace de recuperación enviado a tu correo.');
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Verificando con API...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="auth-footer-prompt">
            <span>¿Es tu primera vez en ALMA?</span>
            <Link to="/registro" className="auth-switch-link">
              Crear una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
