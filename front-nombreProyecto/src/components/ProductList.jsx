import { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import CardProducto from './CardProducto';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulamos una petición asíncrona (como si llamáramos al backend)
    const timer = setTimeout(() => {
      try {
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError('Ocurrió un error al cargar los productos');
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 1. Manejo de estado de carga
  if (loading) {
    return <h3 style={{ textAlign: 'center', padding: '2rem' }}>Cargando catálogo...</h3>;
  }

  // 2. Manejo de estado de error
  if (error) {
    return <h3 style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>{error}</h3>;
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nuestros Productos</h2>

      {/* Renderizado condicional con .map() */}
      <div className="products-grid">
        {products.map((product) => (
          <CardProducto key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;