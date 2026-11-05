import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="alma-footer">
      {/* 4 Pilares de Beneficio */}
      <div className="alma-benefits-strip">
        <div className="alma-benefits-container">
          <div className="alma-benefit-item">
            <span className="benefit-icon">🚚</span>
            <div className="benefit-text">
              <strong>Envío gratis desde 50 €</strong>
              <span>Recíbelo en 24-48 horas</span>
            </div>
          </div>
          <div className="alma-benefit-item">
            <span className="benefit-icon">↩️</span>
            <div className="benefit-text">
              <strong>Devoluciones en 30 días</strong>
              <span>Tranquilidad en tus compras</span>
            </div>
          </div>
          <div className="alma-benefit-item">
            <span className="benefit-icon">🔒</span>
            <div className="benefit-text">
              <strong>Pago 100% seguro</strong>
              <span>Tarjetas y métodos encriptados</span>
            </div>
          </div>
          <div className="alma-benefit-item">
            <span className="benefit-icon">🌿</span>
            <div className="benefit-text">
              <strong>Belleza consciente</strong>
              <span>Cruelty-free & fórmulas limpias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación y Copyright */}
      <div className="alma-footer-main">
        <div className="alma-footer-container">
          <div className="alma-footer-brand">
            <span className="brand-logo">ALMA</span>
            <span className="brand-slogan">El arte de cuidarte</span>
          </div>

          <div className="alma-footer-links">
            <Link to="/sobre-nosotros">Sobre ALMA</Link>
            <Link to="/envios">Envíos y devoluciones</Link>
            <Link to="/contacto">Contacto</Link>
          </div>

          <div className="alma-footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              Facebook
            </a>
          </div>
        </div>

        <div className="alma-footer-bottom">
          <p>© 2026 ALMA Beauty. Todos los derechos reservados.</p>
          <div className="alma-legal-links">
            <Link to="#">Privacidad</Link>
            <span>·</span>
            <Link to="#">Términos y condiciones</Link>
            <span>·</span>
            <Link to="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
