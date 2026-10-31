import React from 'react';
import { useNavigate } from 'react-router-dom';
import './oferta.css';

const PromoBanner = ({
  category = "TU NUEVO RITUAL, POR MENOS",
  title = "30% OFF\nen Skincare",
  description = "Dale a tu piel el cuidado que merece.\nTus esenciales favoritos, a un precio especial.",
  buttonText = "Descubrir ofertas",
  redirectTo = "/ofertas",
  counterText = "01 / 03",
  expiryText = "Hasta el 31 de octubre",
  imageUrl,
  imageAlt = "Promoción Skincare"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectTo);
  };

  return (
    <div className="promo-banner-container">
      {/* Contenido izquierdo (Texto y Botón) */}
      <div className="promo-banner-content">
        <span className="promo-banner-category">{category}</span>
        
        <h2 className="promo-banner-title">
          {title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h2>

        <p className="promo-banner-description">
          {description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        <button 
          type="button" 
          className="promo-banner-button" 
          onClick={handleClick}
        >
          {buttonText} <span className="promo-banner-arrow">&rarr;</span>
        </button>

        {/* Footer interior con indicador y fecha */}
        <div className="promo-banner-footer">
          <div className="promo-banner-pagination">
            <span className="pagination-bar active"></span>
            <span className="pagination-dot"></span>
            <span className="pagination-dot"></span>
            <span className="pagination-text">{counterText}</span>
          </div>
          <span className="promo-banner-expiry">{expiryText}</span>
        </div>
      </div>

      {/* Contenedor derecho (Espacio para la Imagen) */}
      <div className="promo-banner-image-wrapper">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="promo-banner-image" 
          />
        ) : (
          <div className="promo-banner-image-placeholder">
            <span>Espacio para imagen</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;