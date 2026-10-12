import "./footer.css"
import siteData from '../../data/data.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo-group">
            <span className="brand-logo">ALMA</span>
            <span className="brand-tagline">BELLEZA CON CALMA</span>
          </div>
          <span className="footer-slogan">El arte de cuidarte.</span>
        </div>

        <nav className="footer-nav">
          {siteData.footerLinks.map((link) => (
            <a key={link.id} href={link.url} className="footer-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="social-links">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
            <i className="icon-instagram">&#x1F4F8;</i>
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
            <i className="icon-facebook">&#x1F4D8;</i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} ALMA Beauty. Todos los derechos reservados.
        </p>
        <div className="legal-links">
          <a href="/privacidad">Privacidad</a>
          <span>&middot;</span>
          <a href="/terminos">Términos y condiciones</a>
          <span>&middot;</span>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}