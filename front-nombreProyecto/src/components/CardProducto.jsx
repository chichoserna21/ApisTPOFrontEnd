import { Link } from 'react-router-dom';
import './CardProducto.css';

const CardProducto = ({ product }) => {
  return (
    <div className="card-producto">
      <div className="producto-info">
        <span className="producto-categoria">{product.categoria}</span>
        <h3 className="producto-nombre">{product.nombre}</h3>
        <p className="producto-descripcion">{product.descripcion}</p>
        
        <div className="producto-footer">
          <span className="producto-precio">${product.precio}</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/productos/${product.id}`} className="btn-agregar" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Ver detalle
            </Link>
            <button className="btn-agregar">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;