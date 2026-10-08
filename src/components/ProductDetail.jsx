import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/productos')}>Volver a Productos</button>
      </div>
    );
  }

  const handleAgregarAlCarrito = () => {
    // 1. Navegación programática con transferencia de datos en state
    // 2. { replace: true } evita dejar la pantalla de detalle en el historial si así se requiere
    navigate('/carrito', { 
      state: { producto: product },
      replace: false 
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <span style={{ color: '#888', fontSize: '0.9rem' }}>{product.categoria || 'Sin categoría'}</span>
      <h2>{product.nombre}</h2>
      <p>{product.descripcion || 'Sin descripción disponible'}</p>
      <h3>${product.precio}</h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={handleAgregarAlCarrito}>
          Agregar al Carrito
        </button>
        <button onClick={() => navigate('/productos')}>
          Volver al catálogo
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;