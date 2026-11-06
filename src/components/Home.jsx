import { Link, useNavigate } from 'react-router-dom';
import CardProducto from './CardProducto';
import './Home.css';

const Home = ({ products = [], loading = false, onAddToCart }) => {
  const navigate = useNavigate();

  const categories = [...new Set(products.map((product) => product.categoria).filter(Boolean))]
    .map((nombre) => ({
      nombre,
      imagen: products.find((product) => product.categoria === nombre && product.imagen)?.imagen
    }));
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="alma-home">
      {/* 1. HERO BANNER */}
      <section className="alma-hero-section">
        <div className="hero-content">
          <span className="hero-pill">CATÁLOGO ALMA</span>
          <h1 className="hero-title">Encuentra<br />tu ritual</h1>
          <p className="hero-description">
            Dale a tu piel el cuidado que merece. Encuentra tus favoritos a un precio especial.
          </p>
          <Link to="/productos" className="hero-cta-btn">
            Ver productos &rarr;
          </Link>
        </div>

        {products[0]?.imagen && (
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src={products[0].imagen}
                alt={products[0].nombre}
                className="hero-img"
              />
            </div>
          </div>
        )}
      </section>

      {/* 2. TU RITUAL EMPIEZA AQUÍ (Categorías circulares) */}
      <section className="alma-categories-circles-section">
        <div className="section-header-center">
          <h2 className="section-title">Tu ritual empieza aquí.</h2>
          <p className="section-subtitle">Encuentra lo que va contigo.</p>
        </div>

        <div className="circles-grid">
          {categories.map((cat) => (
            <div
              key={cat.nombre}
              className="circle-category-item"
              onClick={() => navigate(`/productos?categoria=${encodeURIComponent(cat.nombre)}`)}
            >
              {cat.imagen && <div className="circle-image-wrapper">
                <img src={cat.imagen} alt={cat.nombre} />
              </div>}
              <span className="circle-category-name">{cat.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OFERTAS DESTACADAS */}
      <section className="alma-featured-offers-section">
        <div className="section-header-split">
          <div>
            <h2 className="section-title">Productos del catálogo</h2>
            <p className="section-subtitle">
              Productos cargados desde el backend.
            </p>
          </div>
          <Link to="/ofertas" className="view-all-link">
            Ver todas las ofertas &rarr;
          </Link>
        </div>

        {loading ? (
          <p>Cargando productos desde la API...</p>
        ) : featuredProducts.length === 0 ? (
          <p>No hay productos disponibles en el catálogo del backend.</p>
        ) : (
          <div className="alma-products-grid">
            {featuredProducts.map((product) => (
              <CardProducto
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
