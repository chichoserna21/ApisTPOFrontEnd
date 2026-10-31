import PromoBanner from '../../components/oferta/oferta.jsx';
import ProductCard from '../../components/productCard/productCard.jsx';
import { products } from '../../data/products';
import '../../components/productCard/productCard.css';
import './home.css';

export default function HomePage() {




  return (
    <section className="home-page">
      <PromoBanner redirectTo="/productos" />
      <h2 className="page-title home-products-title">Productos</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
