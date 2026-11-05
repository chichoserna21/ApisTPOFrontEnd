import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Cart.css';

const Cart = ({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart, onCheckout }) => {
  const navigate = useNavigate();
  const [checkoutSuccess, setCheckoutSuccess] = useState('');
  const [checkoutFailure, setCheckoutFailure] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { checkoutLoading, checkoutError } = useSelector((state) => state.account);
  const cartError = useSelector((state) => state.cart.syncError);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );
  const envioGratis = subtotal >= 50;
  const costoEnvio = subtotal === 0 ? 0 : envioGratis ? 0 : 4.99;
  const total = subtotal + costoEnvio;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckoutFailure('');

    // VALIDACIÓN OBLIGATORIA DEL TEMARIO:
    // Para finalizar la compra se requiere usuario autenticado con JWT
    if (!isAuthenticated) {
      alert('🔒 Para finalizar tu compra debes iniciar sesión o tener una cuenta activa.');
      navigate('/login', { state: { from: { pathname: '/carrito' } } });
      return;
    }

    try {
      const order = await onCheckout();
      setCheckoutSuccess(`Pedido #${order.id} confirmado correctamente.`);
    } catch (error) {
      setCheckoutSuccess('');
      setCheckoutFailure(error.message || 'No se pudo confirmar el pedido.');
    }
  };

  return (
    <div className="alma-cart-page">
      <h1 className="cart-page-title">Tu Carrito de Compras</h1>
      {checkoutSuccess && <p role="status">{checkoutSuccess}</p>}
      {checkoutFailure && <p role="alert" className="auth-error-banner">{checkoutFailure}</p>}
      {(cartError || checkoutError) && (
        <p role="alert" className="auth-error-banner">{cartError || checkoutError}</p>
      )}

      {cartItems.length === 0 ? (
        <div className="empty-cart-card">
          <span className="empty-cart-icon">🛍️</span>
          <h2>Tu carrito está vacío</h2>
          <p>Aún no has añadido productos a tu ritual de cuidado.</p>
          <Link to="/productos" className="explore-catalog-btn">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="cart-content-grid">
          {/* LISTA DE ITEMS */}
          <div className="cart-items-column">
            {envioGratis ? (
              <div className="free-shipping-alert success">
                🎉 ¡Felicidades! Tienes <strong>Envío Gratis</strong> para tu pedido.
              </div>
            ) : (
              <div className="free-shipping-alert warning">
                Agrega <strong>{(50 - subtotal).toFixed(2).replace('.', ',')} €</strong> más para conseguir <strong>Envío Gratis</strong>.
              </div>
            )}

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.formato || 'std'}`} className="cart-item-row">
                  <div className="cart-item-img-box">
                    <img src={item.imagen} alt={item.nombre} />
                  </div>

                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.categoria}</span>
                    <h3 className="cart-item-name">{item.nombre}</h3>
                    {item.formato && <span className="cart-item-format">Formato: {item.formato}</span>}
                    <span className="cart-item-unit-price">
                      {Number(item.precio).toFixed(2).replace('.', ',')} € / unidad
                    </span>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-qty-picker">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.formato, (item.cantidad || 1) - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.cantidad || 1}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.formato, (item.cantidad || 1) + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-total-price">
                      {(item.precio * (item.cantidad || 1)).toFixed(2).replace('.', ',')} €
                    </span>

                    <button
                      className="cart-remove-btn"
                      onClick={() => onRemoveItem(item.id, item.formato)}
                      title="Eliminar producto"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions-footer">
              <Link to="/productos" className="keep-shopping-link">
                &larr; Seguir comprando
              </Link>
              <button onClick={onClearCart} className="clear-cart-link">
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* RESUMEN DE PEDIDO */}
          <div className="cart-summary-column">
            <div className="order-summary-box">
              <h3>Resumen de la orden</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>

              <div className="summary-row">
                <span>Envío</span>
                <span>{envioGratis ? 'Gratis' : `${costoEnvio.toFixed(2).replace('.', ',')} €`}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total estimado</span>
                <span>{total.toFixed(2).replace('.', ',')} €</span>
              </div>

              <button
                className={`checkout-cta-btn ${!isAuthenticated ? 'requires-auth' : ''}`}
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Confirmando pedido...' : isAuthenticated ? 'Tramitar pedido' : 'Iniciar sesión para comprar'}
              </button>

              {!isAuthenticated && (
                <p className="auth-checkout-hint">
                  🔒 Debes tener una sesión iniciada para finalizar tu pedido.
                </p>
              )}

              <div className="summary-guarantees">
                <span>🔒 Compra 100% segura y garantizada</span>
                <span>📦 Embalaje ecológico y reciclable</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
