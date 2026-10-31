import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';
import siteData from '../../data/data.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SPA_NAV_PREFIXES = ['/', '/productos'];

function isSpaNavLink(url) {
  return SPA_NAV_PREFIXES.some((prefix) => url === prefix || url.startsWith(`${prefix}?`));
}

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/productos?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/productos');
    }
  };

  return (
    <header className="site-header">
      <div className="top-bar">
        <span>{siteData.announcement}</span>
        <span className="arrow"> &rarr;</span>
      </div>

      <div className="main-header">
        <Link to="/" className="logo-container">
          <h1 className="brand-logo">ALMA</h1>
          <span className="brand-tagline">BELLEZA CON CALMA</span>
        </Link>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <span className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type="text"
            placeholder="Busca tu próximo favorito"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="user-actions">
          <a href="/account" className="action-item">
            <span className="icon">&#128100;</span>
            <span>Mi cuenta</span>
          </a>
          <Link to="/favoritos" className="action-item">
            <span className="icon">&#10084;</span>
            <span>Favoritos</span>
          </Link>
          <Link to="/carrito" className="action-item cart-button">
            <span className="icon">&#128092;</span>
            <span>Carrito ({cartCount})</span>
          </Link>
        </div>
      </div>

      <nav className="nav-bar">
        <ul>
          {siteData.navigation.map((item) => (
            <li key={item.id}>
              {isSpaNavLink(item.url) ? (
                <Link
                  to={item.url}
                  className={item.featured ? 'nav-link featured' : 'nav-link'}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.url}
                  className={item.featured ? 'nav-link featured' : 'nav-link'}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
