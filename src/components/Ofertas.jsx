import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOfertas } from '../services/api';
import './ProductList.css';

const Ofertas = ({ products = [] }) => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetchOfertas()
      .then((data) => {
        if (active) setOfertas(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const ofertasConProducto = ofertas.map((oferta) => ({
    oferta,
    producto: products.find((item) => item.id === oferta.productoId)
  })).filter((item) => item.producto);

  return (
    <div className="alma-catalog-page">
      <nav className="catalog-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>&gt;</span>
        <span>Ofertas Especiales</span>
      </nav>

      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Ofertas Especiales</h1>
          <p className="catalog-count">Promociones activas cargadas desde el backend.</p>
        </div>
      </div>

      {error ? (
        <p role="alert" className="auth-error-banner">{error}</p>
      ) : loading ? (
        <p>Cargando ofertas...</p>
      ) : ofertasConProducto.length === 0 ? (
        <p>No hay ofertas activas en la base de datos.</p>
      ) : (
        <div className="catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {ofertasConProducto.map(({ oferta, producto }) => (
            <article className="alma-product-card" key={oferta.id}>
              <span className="card-badge">{oferta.porcentajeDescuento}%</span>
              <div className="card-details">
                <h2 className="card-title">{oferta.titulo}</h2>
                <p className="card-subtitle">{oferta.descripcion}</p>
                <p>{producto.nombre}</p>
                <p>{Number(producto.precio).toFixed(2).replace('.', ',')} €</p>
                <Link to={`/productos/${producto.id}`}>Ver producto</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ofertas;
