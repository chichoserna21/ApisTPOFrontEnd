import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setQuantity } from '../../store/cartSlice';
import { getProductById, formatPrice } from '../../data/products';
import '../../components/productCard/productCard.css';
import './cartPage.css';

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const lines = items
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return null;
      return { ...item, product, subtotal: product.precio * item.quantity };
    })
    .filter(Boolean);

  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);

  if (lines.length === 0) {
    return (
      <section>
        <h2 className="page-title">Carrito</h2>
        <p className="page-empty">Tu carrito está vacío.</p>
        <Link to="/productos" className="detail-back">Ir al catálogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h2 className="page-title">Carrito</h2>
      <ul className="cart-list">
        {lines.map((line) => (
          <li key={line.id} className="cart-line">
            <div>
              <Link to={`/producto/${line.product.id}`} className="cart-line-name">
                {line.product.nombre}
              </Link>
              <p className="cart-line-meta">{formatPrice(line.product.precio)} c/u</p>
            </div>
            <div className="cart-line-controls">
              <label>
                Cantidad
                <input
                  type="number"
                  min="1"
                  value={line.quantity}
                  onChange={(e) =>
                    dispatch(
                      setQuantity({
                        id: line.id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                />
              </label>
              <span>{formatPrice(line.subtotal)}</span>
              <button
                type="button"
                className="product-card-fav"
                onClick={() => dispatch(removeFromCart(line.id))}
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {formatPrice(total)}</p>
    </section>
  );
}
