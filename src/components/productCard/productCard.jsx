import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import { formatPrice } from '../../data/products';
import './productCard.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorites.ids.includes(product.id));

  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} className="product-card-media">
        <div className="product-card-placeholder">Espacio para imagen</div>
      </Link>
      <div className="product-card-body">
        <span className="product-card-category">{product.categoria}</span>
        <Link to={`/producto/${product.id}`} className="product-card-title">
          {product.nombre}
        </Link>
        <p className="product-card-price">{formatPrice(product.precio)}</p>
        <div className="product-card-actions">
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
            {isFavorite ? 'Quitar de favoritos' : 'Favorito'}
          </button>
        </div>
      </div>
    </article>
  );
}
