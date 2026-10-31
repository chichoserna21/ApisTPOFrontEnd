import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/productCard/productCard.jsx';
import { getProductById } from '../../data/products';
import '../../components/productCard/productCard.css';

export default function FavoritesPage() {
  const ids = useSelector((state) => state.favorites.ids);
  const favorites = ids.map((id) => getProductById(id)).filter(Boolean);

  if (favorites.length === 0) {
    return (
      <section>
        <h2 className="page-title">Favoritos</h2>
        <p className="page-empty">Todavía no agregaste favoritos.</p>
        <Link to="/productos" className="detail-back">Ir al catálogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h2 className="page-title">Favoritos</h2>
      <div className="product-grid">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
