import { Link, useNavigate } from 'react-router-dom';
import CardProducto from './CardProducto';
import './Home.css';

const Home = ({ products = [], onAddToCart }) => {
  const navigate = useNavigate();

  // Filtrar ofertas destacadas para la grilla
  const ofertasDestacadas = products.slice(0, 4);

  const categories = [
    {
      nombre: 'Cuidado Facial',
      slug: 'Cuidado+Facial',
      imagen: '/images/firming-cashmere.jpg'
    },
    {
      nombre: 'Maquillaje',
      slug: 'Maquillaje',
      imagen: '/images/rhode-2.jpg'
    },
    {
      nombre: 'Cuerpo y Baño',
      slug: 'Cuerpo+y+Baño',
      imagen: '/images/producto-2.jpg'
    },
    {
      nombre: 'Tratamientos',
      slug: 'Cuidado+Facial',
      imagen: '/images/producto-3.jpg'
    },
    {
      nombre: 'Edición Especial',
      slug: 'Cuidado+Facial',
      imagen: '/images/producto-1.jpg'
    }
  ];

  return (
    <div className="alma-home">
      {/* 1. HERO BANNER */}
      <section className="alma-hero-section">
        <div className="hero-content">
          <span className="hero-pill">TU RITUAL POR MENOS</span>
          <h1 className="hero-title">30% OFF<br />en Skincare</h1>
          <p className="hero-description">
            Dale a tu piel el cuidado que merece. Encuentra tus favoritos a un precio especial.
          </p>
          <Link to="/ofertas" className="hero-cta-btn">
            Descubrir ofertas &rarr;
          </Link>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="/images/hero-rhode.jpg"
              alt="Skincare ALMA 30% OFF"
              className="hero-img"
            />
            <div className="hero-badge-circle">
              <span>Piel feliz</span>
            </div>
          </div>
        </div>
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
              onClick={() => navigate(`/productos?categoria=${cat.slug}`)}
            >
              <div className="circle-image-wrapper">
                <img src={cat.imagen} alt={cat.nombre} />
              </div>
              <span className="circle-category-name">{cat.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OFERTAS DESTACADAS */}
      <section className="alma-featured-offers-section">
        <div className="section-header-split">
          <div>
            <h2 className="section-title">Ofertas Destacadas</h2>
            <p className="section-subtitle">
              Pequeños rituales. Grandes favoritos. Todos con un 30% de descuento.
            </p>
          </div>
          <Link to="/ofertas" className="view-all-link">
            Ver todas las ofertas &rarr;
          </Link>
        </div>

        <div className="alma-products-grid">
          {ofertasDestacadas.map((product) => (
            <CardProducto
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
