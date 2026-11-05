import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProductDetail.css';

const titulosPorRating = {
  5: 'Excelente producto',
  4: 'Muy buen producto',
  3: 'Bueno / Aceptable',
  2: 'Regular / Podría mejorar',
  1: 'Mala experiencia'
};

const ProductDetail = ({ products = [], onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Buscar el producto
  const product = products.find((p) => String(p.id) === String(id));

  // Estados locales
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('uso');

  // Estado para nuevas reseñas
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      autor: 'María G.',
      verificado: true,
      fecha: '12 oct 2026',
      rating: 5,
      titulo: 'Mi nuevo imprescindible',
      comentario: 'Tengo la piel sensible y me ha encantado. Hidrata de verdad, se absorbe rápido y deja un acabado precioso. Ya voy por mi segundo tarro.'
    },
    {
      id: 2,
      autor: 'Laura M.',
      verificado: true,
      fecha: '28 sep 2026',
      rating: 5,
      titulo: 'Ligera y muy agradable',
      comentario: 'La uso cada mañana antes del protector solar. Mi piel se nota más suave y no deja sensación pegajosa. ¡Muy buena relación calidad-precio!'
    }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comentario: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

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
  const formatos = product.formatos || ['50 ml'];

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, formatos[selectedFormat]);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.comentario.trim()) return;

    // Obtener nombre del usuario si está logueado o mostrar Cliente ALMA
    const autorNombre = isAuthenticated
      ? (user?.nombre || user?.email?.split('@')[0])
      : 'Cliente ALMA';

    const reviewToAdd = {
      id: Date.now(),
      autor: autorNombre,
      verificado: isAuthenticated,
      fecha: 'Hoy',
      rating: newReview.rating,
      titulo: titulosPorRating[newReview.rating] || 'Opinión sobre el producto',
      comentario: newReview.comentario.trim()
    };

    setReviewsList([reviewToAdd, ...reviewsList]);
    setNewReview({ rating: 5, comentario: '' });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
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
            <span className="gallery-badge">{product.badge || '-30% FAVORITO ALMA'}</span>
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
          <div className="detail-rating-row">
            <div className="stars">
              {'★'.repeat(Math.round(product.rating || 5))}
            </div>
            <span className="rating-score">{product.rating || 4.8} / 5</span>
            <span className="rating-count">({product.reviewsCount || 128} opiniones)</span>
          </div>

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
          <div className="format-selection-group">
            <div className="format-header">
              <span className="format-label">Formato:</span>
              <span className="stock-indicator">• En stock</span>
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
            >
              Agregar al Carrito
            </button>

            <button
              type="button"
              className={`wishlist-heart-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              title="Guardar en favoritos"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Aviso de Envíos */}
          <div className="shipping-notice-box">
            <span>🚚</span>
            <span>Recíbelo en 24-48h · Envío gratis desde 50 €</span>
          </div>

          {/* Acordeones informativos */}
          <div className="detail-accordions">
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 'uso' ? null : 'uso')}
              >
                <span>Cómo usarlo</span>
                <span>{openAccordion === 'uso' ? '−' : '+'}</span>
              </button>
              {openAccordion === 'uso' && (
                <div className="accordion-content">
                  <p>
                    {product.comoUsarlo ||
                      'Aplica mañana y noche sobre el rostro limpio con un suave masaje circular hasta su completa absorción. Ideal como paso previo a tu protección solar o tratamiento de noche.'}
                  </p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 'ingredientes' ? null : 'ingredientes')}
              >
                <span>Ingredientes clave</span>
                <span>{openAccordion === 'ingredientes' ? '−' : '+'}</span>
              </button>
              {openAccordion === 'ingredientes' && (
                <div className="accordion-content">
                  <p>
                    Ácido hialurónico multimolecular, jugo puro de aloe vera ecológico, vitamina E vegetal y aceite de jojoba prensado en frío. 100% libre de sulfatos, parabenos y siliconas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE RESEÑAS */}
      <section className="detail-reviews-section">
        <h2 className="reviews-section-title">Lo que dicen de {product.nombre}</h2>

        <div className="reviews-grid-layout">
          {/* Columna Izquierda: Rating global y lista de opiniones */}
          <div className="reviews-summary-column">
            <div className="overall-score-card">
              <div className="score-big">4.8</div>
              <div className="score-stars">★★★★★</div>
              <p className="score-note">Basado en {product.reviewsCount || 128} opiniones verificadas</p>

              {/* Barras de distribución */}
              <div className="rating-bars">
                <div className="rating-bar-row">
                  <span>5 ★</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: '85%' }}></div></div>
                  <span>85%</span>
                </div>
                <div className="rating-bar-row">
                  <span>4 ★</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: '10%' }}></div></div>
                  <span>10%</span>
                </div>
                <div className="rating-bar-row">
                  <span>3 ★</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: '3%' }}></div></div>
                  <span>3%</span>
                </div>
                <div className="rating-bar-row">
                  <span>2 ★</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: '1%' }}></div></div>
                  <span>1%</span>
                </div>
                <div className="rating-bar-row">
                  <span>1 ★</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: '1%' }}></div></div>
                  <span>1%</span>
                </div>
              </div>
            </div>

            {/* Lista de Comentarios */}
            <div className="reviews-comments-list">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="review-comment-card">
                  <div className="review-comment-header">
                    <strong>{rev.autor}</strong>
                    {rev.verificado && <span className="verified-badge">✓ Compra verificada</span>}
                    <span className="review-date">{rev.fecha}</span>
                  </div>
                  <div className="review-comment-stars">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <h4 className="review-comment-title">{rev.titulo}</h4>
                  <p className="review-comment-text">{rev.comentario}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Formulario "Tu opinión cuenta" */}
          <div className="write-review-column">
            <div className="review-form-box">
              <h3>Tu opinión cuenta</h3>
              <p>Tu valoración nos ayuda a seguir mejorando.</p>

              {reviewSubmitted && (
                <div className="review-success-alert">
                  ¡Gracias! Tu opinión fue publicada exitosamente.
                </div>
              )}

              <form onSubmit={handleReviewSubmit}>
                {/* Indicador de autor basado en la sesión */}
                <div className="review-user-status">
                  {isAuthenticated ? (
                    <span className="logged-author-badge">
                      👤 Comentando como <strong>{user?.nombre || user?.email}</strong>
                    </span>
                  ) : (
                    <span className="guest-author-badge">
                      👤 Comentando como <strong>Cliente ALMA</strong>
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label>Tu puntuación</label>
                  <div className="star-picker">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        className={`star-pick-btn ${num <= newReview.rating ? 'active' : ''}`}
                        onClick={() => setNewReview({ ...newReview, rating: num })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label>Tu comentario</label>
                  <textarea
                    rows={4}
                    placeholder={`Cuéntanos tu experiencia con ${product.nombre}...`}
                    value={newReview.comentario}
                    onChange={(e) => setNewReview({ ...newReview, comentario: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="submit-review-btn">
                  Publicar comentario
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
