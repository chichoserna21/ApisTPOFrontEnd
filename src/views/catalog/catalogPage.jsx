import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/productCard/productCard.jsx';
import { products } from '../../data/products';
import '../../components/productCard/productCard.css';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory = categoria ? product.categoria === categoria : true;
    const matchesQuery = query ? product.nombre.toLowerCase().includes(query) : true;
    return matchesCategory && matchesQuery;
  });

  const subtitleParts = [];
  if (categoria) subtitleParts.push(categoria);
  if (query) subtitleParts.push(`Búsqueda: ${query}`);

  return (
    <section>
      <h2 className="page-title">Catálogo</h2>
      {subtitleParts.length > 0 && (
        <p className="page-subtitle">{subtitleParts.join(' · ')}</p>
      )}
      {filtered.length === 0 ? (
        <p className="page-empty">No hay productos para mostrar.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
