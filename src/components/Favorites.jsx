import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CardProducto from './CardProducto';
import { toggleFavoriteOnServer } from '../store/accountSlice';
import './ProductList.css';

const Favorites = ({ products = [], favoriteIds = [], loading = false, onAddToCart }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.account.error);
  const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id));

  const removeFavorite = (id) => {
    dispatch(toggleFavoriteOnServer(id));
  };

  return (
    <section className="alma-catalog-page">
      <h1 className="catalog-title">Mis favoritos</h1>
      {error && <p role="alert" className="auth-error-banner">{error}</p>}
      {loading ? (
        <p>Cargando tus favoritos...</p>
      ) : favoriteProducts.length === 0 ? (
        <p>Todavía no guardaste productos favoritos.</p>
      ) : (
        <div className="catalog-grid">
          {favoriteProducts.map((product) => (
            <div key={product.id}>
              <CardProducto product={product} onAddToCart={onAddToCart} />
              <button type="button" onClick={() => removeFavorite(product.id)}>
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
