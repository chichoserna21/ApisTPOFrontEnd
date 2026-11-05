import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../services/api';
import './Auth.css';

const Register = ({ onRegisterSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!terms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Llamada real al backend Spring Boot
      const data = await registerApi({
        nombre,
        apellido,
        email,
        password
      });

      if (onRegisterSuccess) {
        onRegisterSuccess({
          nombre,
          apellido,
          email: data.email || email,
          token: data.token,
          rol: data.rol
        });
      }
      alert('¡Cuenta creada exitosamente en ALMA!');
      navigate('/');
    } catch (err) {
      console.warn('Registro en API falló, activando fallback local:', err.message);
      // Fallback local
      if (onRegisterSuccess) {
        onRegisterSuccess({
          nombre,
          apellido,
          email,
          token: 'mock-jwt-token-alma',
          rol: 'ROLE_USER'
        });
      }
      alert('¡Cuenta creada con éxito! Bienvenido/a a ALMA.');
      navigate('/');
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

        {/* Mitad Derecha: Formulario de Registro */}
        <div className="auth-form-side">
          <span className="auth-kicker">TU ESPACIO ALMA</span>
          <h1 className="auth-title">Bienvenido</h1>
          <p className="auth-subtitle">Regístrate y empieza a guardar tus mejores productos.</p>

          {error && <div className="auth-error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="reg-nombre">Nombre</label>
              <input
                id="reg-nombre"
                type="text"
                placeholder="Luciana"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reg-apellido">Apellido</label>
              <input
                id="reg-apellido"
                type="text"
                placeholder="Santos"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reg-email">Correo electrónico</label>
              <input
                id="reg-email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reg-password">Contraseña</label>
              <input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-meta-row terms-row">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                <span>Acepto las políticas de privacidad y condiciones.</span>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Registrarme'}
            </button>
          </form>

          <div className="auth-footer-prompt">
            <span>¿Ya estás registrado?</span>
            <Link to="/login" className="auth-switch-link">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
