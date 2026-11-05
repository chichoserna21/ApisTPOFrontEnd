import { Link } from 'react-router-dom';
import CardProducto from './CardProducto';
import './ProductList.css';

const Ofertas = ({ products = [], onAddToCart }) => {
  // Productos que tienen descuento
  const productosEnOferta = products.filter((p) => p.descuento || p.precioAnterior);

  return (
    <div className="alma-catalog-page">
      <nav className="catalog-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>&gt;</span>
        <span>Ofertas Especiales</span>
      </nav>

      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Ofertas Especiales</h1>
          <p className="catalog-count">
            Aprovecha hasta un 30% de descuento en tus fórmulas favoritas de cuidado personal.
          </p>
        </div>
      </div>

      <div className="catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {productosEnOferta.map((product) => (
          <CardProducto
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Ofertas;
