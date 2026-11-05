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
          <img
            src={product.imagen || 'https://images.unsplash.com/photo-1608248597359-2696660be01e?auto=format&fit=crop&w=600&q=80'}
            alt={product.nombre}
            className="card-image"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Información del producto */}
      <div className="card-details">
        <Link to={`/productos/${product.id}`} className="card-title-link">
          <h3 className="card-title">{product.nombre}</h3>
        </Link>

        <p className="card-subtitle">{product.subtitulo || product.categoria}</p>

        {/* Rating con estrellas */}
        <div className="card-rating">
          <span className="star-icon">★</span>
          <span className="rating-val">{product.rating || '4.8'}</span>
          <span className="reviews-count">({product.reviewsCount || 85})</span>
        </div>

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
