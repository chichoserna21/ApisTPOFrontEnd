import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recibimos el producto transferido desde ProductDetail si se agregó alguno
  const itemAgregado = location.state?.producto;
  const estaLogueado = true; // Simulación para el ejemplo

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tu Carrito de Compras</h2>

      {/* Operador && : Muestra un cartel solo si se transfirieron datos desde la ruta previa */}
      {itemAgregado && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem' }}>
          ¡Agregaste <strong>{itemAgregado.nombre}</strong> al carrito correctamente!
        </div>
      )}

      {/* Operador Ternario ? : Muestra un resumen o un mensaje de carrito vacío */}
      {itemAgregado ? (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>
          <h3>{itemAgregado.nombre}</h3>
          <p>Categoría: {itemAgregado.categoria}</p>
          <p>Precio: ${itemAgregado.precio}</p>
          <button 
            onClick={() => alert('¡Compra procesada!')} 
            style={{ marginTop: '1rem', background: '#27ae60', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
          >
            Finalizar Compra
          </button>
        </div>
      ) : (
        <p>El carrito está actualmente vacío.</p>
      )}

      <button onClick={() => navigate('/productos')} style={{ marginTop: '1.5rem', display: 'block' }}>
        Seguir comprando
      </button>
    </div>
  );
};

export default Cart;