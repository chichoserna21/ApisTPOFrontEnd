import { useEffect, useRef } from 'react';
import './PurchaseModal.css';

const formatPrice = (value) => `${Number(value || 0).toFixed(2).replace('.', ',')} €`;

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' });
};

/**
 * Modal con la estética de ALMA para el flujo de compra.
 * - variant="success": pedido confirmado, muestra el resumen que devuelve la API.
 * - variant="login": se intentó comprar sin sesión iniciada.
 */
const PurchaseModal = ({ variant, order, onClose, onPrimary, onSecondary }) => {
  const primaryButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    primaryButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const isSuccess = variant === 'success';
  const items = order?.items || [];
  const itemsSubtotal = items.reduce(
    (acc, item) => acc + Number(item.precioUnitario) * item.cantidad,
    0
  );
  const shipping = Math.max(0, Number(order?.total || 0) - itemsSubtotal);
  const units = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="purchase-modal-backdrop" onMouseDown={onClose}>
      <div
        className={`purchase-modal purchase-modal-${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-modal-title"
        aria-describedby="purchase-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="purchase-modal-close" type="button" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="purchase-modal-icon" aria-hidden="true">
          {isSuccess ? (
            <svg viewBox="0 0 52 52">
              <circle className="purchase-check-circle" cx="26" cy="26" r="24" />
              <path className="purchase-check-mark" d="M15 27 l7 7 l15 -16" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <rect x="5" y="10.5" width="14" height="10" rx="2" />
              <path d="M8 10.5 V7.5 a4 4 0 0 1 8 0 V10.5" />
            </svg>
          )}
        </div>

        {isSuccess ? (
          <>
            <p className="purchase-modal-eyebrow">Pedido #{order?.id} confirmado</p>
            <h2 id="purchase-modal-title">¡Gracias por tu compra!</h2>
            <p id="purchase-modal-description" className="purchase-modal-text">
              Ya estamos preparando tu ritual de cuidado. Vas a poder seguir el estado del pedido desde tu perfil.
            </p>

            <div className="purchase-order-card">
              <div className="purchase-order-meta">
                <span>{formatDate(order?.fecha)}</span>
                {order?.estado && <span className="purchase-order-status">{order.estado}</span>}
              </div>

              <ul className="purchase-order-items">
                {items.map((item, index) => (
                  <li key={`${item.nombre}-${index}`}>
                    <span className="purchase-item-name">
                      {item.nombre}
                      <small>× {item.cantidad}</small>
                    </span>
                    <span>{formatPrice(Number(item.precioUnitario) * item.cantidad)}</span>
                  </li>
                ))}
              </ul>

              <div className="purchase-order-row">
                <span>Subtotal ({units} {units === 1 ? 'unidad' : 'unidades'})</span>
                <span>{formatPrice(itemsSubtotal)}</span>
              </div>
              <div className="purchase-order-row">
                <span>Envío</span>
                <span>{shipping < 0.005 ? 'Gratis' : formatPrice(shipping)}</span>
              </div>
              <div className="purchase-order-row purchase-order-total">
                <span>Total</span>
                <span>{formatPrice(order?.total)}</span>
              </div>
            </div>

            <div className="purchase-modal-actions">
              <button ref={primaryButtonRef} type="button" className="purchase-btn-primary" onClick={onPrimary}>
                Ver mis pedidos
              </button>
              <button type="button" className="purchase-btn-secondary" onClick={onSecondary}>
                Seguir comprando
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="purchase-modal-eyebrow">Un paso más</p>
            <h2 id="purchase-modal-title">Iniciá sesión para finalizar tu compra</h2>
            <p id="purchase-modal-description" className="purchase-modal-text">
              Necesitás una cuenta para confirmar el pedido. Tus productos te esperan en el carrito.
            </p>

            <div className="purchase-modal-actions">
              <button ref={primaryButtonRef} type="button" className="purchase-btn-primary" onClick={onPrimary}>
                Iniciar sesión
              </button>
              <button type="button" className="purchase-btn-secondary" onClick={onSecondary}>
                Crear una cuenta
              </button>
            </div>
            <button type="button" className="purchase-btn-link" onClick={onClose}>
              Seguir mirando
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseModal;
