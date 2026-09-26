import products from '../data/products.json';
import CardProducto from './CardProducto';
import './ProductList.css';

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nuestros Productos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <CardProducto key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
