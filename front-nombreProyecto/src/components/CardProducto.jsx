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
          <button className="btn-agregar">Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
