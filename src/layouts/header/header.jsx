import { useState } from 'react';
import './header.css';
import siteData from '../../data/data.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header({ cartCount = 0, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <header className="site-header">
      
      <div className="top-bar">
        <span>{siteData.announcement}</span>
        <span className="arrow"> &rarr;</span>
      </div>

      
      <div className="main-header">
        <div className="logo-container">
          <h1 className="brand-logo">ALMA</h1>
          <span className="brand-tagline">BELLEZA CON CALMA</span>
        </div>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
            <span className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span> {/* Reemplazar con SVG/Icono */}
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
          <button className="action-item cart-button">
            <span className="icon">&#128092;</span>
            <span>Carrito ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* 3. Menú de Navegación */}
      <nav className="nav-bar">
        <ul>
          {siteData.navigation.map((item) => (
            <li key={item.id}>
              <a 
                href={item.url} 
                className={item.featured ? 'nav-link featured' : 'nav-link'}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}