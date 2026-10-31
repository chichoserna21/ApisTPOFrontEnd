import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import { getProductById, formatPrice } from '../../data/products';
import '../../components/productCard/productCard.css';
import './productDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    product ? state.favorites.ids.includes(product.id) : false
  );

  if (!product) {
    return (
      <section>
        <h2 className="page-title">Producto no encontrado</h2>
        <p className="page-empty">No existe un producto con ese identificador.</p>
        <Link to="/productos" className="detail-back">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <section className="product-detail">
      <div className="product-detail-placeholder">Espacio para imagen</div>
      <div className="product-detail-info">
        <span className="product-detail-category">{product.categoria}</span>
        <h2 className="page-title">{product.nombre}</h2>
        <p className="product-detail-description">{product.descripcion}</p>
        <p className="product-detail-price">{formatPrice(product.precio)}</p>
        <div className="product-detail-actions">
          <button
            type="button"
            className="product-card-button"
            onClick={() => dispatch(addToCart(product.id))}
          >
            Agregar al carrito
          </button>
          <button
            type="button"
            className={`product-card-fav ${isFavorite ? 'is-active' : ''}`}
            onClick={() => dispatch(toggleFavorite(product.id))}
            aria-pressed={isFavorite}
          >
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
      </div>
    </section>
  );
}
