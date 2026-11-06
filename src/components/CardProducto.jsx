import { Link } from 'react-router-dom';
import './CardProducto.css';

const CardProducto = ({ product, onAddToCart }) => {
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="alma-product-card">
      {/* Badge de Descuento */}
      {product.descuento && (
        <span className="card-badge">-{product.descuento}</span>
      )}

      {/* Imagen del Producto */}
      <Link to={`/productos/${product.id}`} className="card-image-link">
        <div className="card-image-wrapper">
          {product.imagen && (
            <img
              src={product.imagen}
              alt={product.nombre}
              className="card-image"
              loading="lazy"
            />
          )}
        </div>
      </Link>

      {/* Información del producto */}
      <div className="card-details">
        <Link to={`/productos/${product.id}`} className="card-title-link">
          <h3 className="card-title">{product.nombre}</h3>
        </Link>

        {(product.subtitulo || product.categoria) && (
          <p className="card-subtitle">{product.subtitulo || product.categoria}</p>
        )}

        {/* Rating con estrellas */}
        {product.rating != null && (
          <div className="card-rating">
            <span className="star-icon">★</span>
            <span className="rating-val">{product.rating}</span>
            {product.reviewsCount != null && (
              <span className="reviews-count">({product.reviewsCount})</span>
            )}
          </div>
        )}

        {/* Precio y Botón Agregar */}
        <div className="card-footer-action">
          <div className="price-box">
            <span className="current-price">{Number(product.precio).toFixed(2).replace('.', ',')} €</span>
            {product.precioAnterior && (
              <span className="old-price">{Number(product.precioAnterior).toFixed(2).replace('.', ',')} €</span>
            )}
          </div>

          <button
            type="button"
            className="quick-add-btn"
            onClick={handleAdd}
            disabled={product.stock === 0}
            title="Agregar al carrito"
            aria-label="Agregar al carrito"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
