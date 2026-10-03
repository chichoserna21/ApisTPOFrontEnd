import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar el producto en el JSON
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/productos')}>Volver a Productos</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{product.nombre}</h2>
      <p><strong>Categoría:</strong> {product.categoria}</p>
      <p>{product.descripcion}</p>
      <h3>Precio: ${product.precio}</h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => navigate('/productos')}>Volver al catálogo</button>
        <button onClick={() => navigate('/carrito')}>Ir al Carrito</button>
      </div>
    </div>
  );
};

export default ProductDetail;