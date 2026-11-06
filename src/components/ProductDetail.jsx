import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteOnServer } from '../store/accountSlice';
import './ProductDetail.css';

const ProductDetail = ({ products = [], onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const favoriteIds = useSelector((state) => state.account.favorites);

  // Buscar el producto
  const product = products.find((p) => String(p.id) === String(id));

  // Estados locales
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favoritePending, setFavoritePending] = useState(false);
  const [favoriteError, setFavoriteError] = useState('');

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que estás buscando no existe o fue retirado del catálogo.</p>
        <button onClick={() => navigate('/productos')} className="back-btn">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const gallery = product.imagenes || [product.imagen];
  const formatos = product.formatos || [];
  const isFavorite = favoriteIds.includes(product.id);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, formatos[selectedFormat]);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/productos/${product.id}` } } });
      return;
    }
    setFavoritePending(true);
    setFavoriteError('');
    try {
      await dispatch(toggleFavoriteOnServer(product.id)).unwrap();
    } catch (error) {
      setFavoriteError(error);
    } finally {
      setFavoritePending(false);
    }
  };

  return (
    <div className="alma-detail-page">
      {/* Breadcrumb */}
      <nav className="detail-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>&gt;</span>
        <Link to={`/productos?categoria=${encodeURIComponent(product.categoria || '')}`}>
          {product.categoria || 'Catálogo'}
        </Link>
        <span>&gt;</span>
        <span>{product.nombre}</span>
      </nav>

      {/* DETALLE PRINCIPAL */}
      <div className="detail-main-grid">
        {/* GALERÍA DE IMÁGENES */}
        <div className="detail-gallery">
          <div className="main-image-container">
            {product.badge && <span className="gallery-badge">{product.badge}</span>}
            <img
              src={gallery[selectedImage] || product.imagen}
              alt={product.nombre}
              className="detail-main-img"
            />
          </div>

          {gallery.length > 1 && (
            <div className="gallery-thumbnails">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail-btn ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFORMACIÓN Y COMPRA */}
        <div className="detail-info-box">
          <span className="detail-category-tag">{product.categoria}</span>
          <h1 className="detail-title">{product.nombre}</h1>

          {/* Rating */}
          {product.rating != null && (
            <div className="detail-rating-row">
              <div className="stars">{'★'.repeat(Math.round(product.rating))}</div>
              <span className="rating-score">{product.rating} / 5</span>
              {product.reviewsCount != null && (
                <span className="rating-count">({product.reviewsCount} opiniones)</span>
              )}
            </div>
          )}

          {/* Precios */}
          <div className="detail-price-box">
            <span className="current-price-lg">
              {Number(product.precio).toFixed(2).replace('.', ',')} €
            </span>
            {product.precioAnterior && (
              <span className="old-price-lg">
                {Number(product.precioAnterior).toFixed(2).replace('.', ',')} €
              </span>
            )}
            {product.precioAnterior && (
              <span className="saving-badge">
                Ahorra {(Number(product.precioAnterior) - Number(product.precio)).toFixed(2).replace('.', ',')} €
              </span>
            )}
          </div>

          <p className="detail-description">{product.descripcion}</p>

          {/* Beneficios con checks */}
          {product.beneficios && (
            <div className="benefits-checklist">
              {product.beneficios.map((b, i) => (
                <div key={i} className="benefit-check-item">
                  <span className="check-icon">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}

          {/* Formato / Tamaño */}
          {formatos.length > 0 && (
            <div className="format-selection-group">
              <div className="format-header">
                <span className="format-label">Formato:</span>
                {product.stock != null && (
                  <span className="stock-indicator">
                    {product.stock > 0 ? `• Stock: ${product.stock}` : '• Sin stock'}
                  </span>
                )}
              </div>
              <div className="format-buttons">
                {formatos.map((fmt, idx) => (
                  <button
                    key={fmt}
                    type="button"
                    className={`format-btn ${selectedFormat === idx ? 'active' : ''}`}
                    onClick={() => setSelectedFormat(idx)}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {formatos.length === 0 && product.stock != null && (
            <p className="stock-indicator">
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
            </p>
          )}

          {/* Selector de cantidad y Agregar al carrito */}
          <div className="purchase-actions-row">
            <div className="quantity-selector">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="add-to-cart-cta-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Agregar al Carrito
            </button>

            <button
              type="button"
              className={`wishlist-heart-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              disabled={favoritePending}
              title="Guardar en favoritos"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            {favoriteError && <p role="alert">{favoriteError}</p>}
          </div>

          {/* Aviso de Envíos */}
          <div className="shipping-notice-box">
            <span>🚚</span>
            <span>Recíbelo en 24-48h · Envío gratis desde 50 €</span>
          </div>

          {/* Acordeones informativos */}
          {product.comoUsarlo && (
            <div className="detail-accordions">
              <div className="accordion-item">
                <h2 className="accordion-header">Cómo usarlo</h2>
                <div className="accordion-content"><p>{product.comoUsarlo}</p></div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
