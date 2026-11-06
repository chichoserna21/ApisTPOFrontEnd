import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CardProducto from './CardProducto';
import './ProductList.css';

const ProductList = ({ products = [], loading = false, onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parámetros de URL
  const querySearch = searchParams.get('search') || '';
  const selectedCategories = useMemo(
    () => searchParams.getAll('categoria'),
    [searchParams]
  );

  const [maxPrice, setMaxPrice] = useState(null);
  const [sortBy, setSortBy] = useState('relevancia');

  const allCategories = [...new Set(products.map((product) => product.categoria).filter(Boolean))];
  const maxAvailablePrice = products.reduce(
    (max, product) => Math.max(max, Number(product.precio) || 0),
    0
  );
  const priceLimit = maxPrice ?? maxAvailablePrice;

  const handleCategoryToggle = (cat) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((category) => category !== cat)
      : [...selectedCategories, cat];
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('categoria');
    updated.forEach((category) => nextSearchParams.append('categoria', category));
    setSearchParams(nextSearchParams);
  };

  const handleResetFilters = () => {
    setMaxPrice(null);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('search');
    nextSearchParams.delete('categoria');
    setSearchParams(nextSearchParams);
  };

  // Filtrado y ordenamiento en memoria
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Filtro por texto
      if (querySearch) {
        const textMatch =
          prod.nombre.toLowerCase().includes(querySearch.toLowerCase()) ||
          (prod.descripcion && prod.descripcion.toLowerCase().includes(querySearch.toLowerCase()));
        if (!textMatch) return false;
      }

      // Filtro por categoría seleccionada
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(prod.categoria)) return false;
      }

      // Filtro por precio
      if (maxPrice !== null && prod.precio > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.precio - b.precio;
      if (sortBy === 'precio-desc') return b.precio - a.precio;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // Relevancia
    });
  }, [products, querySearch, selectedCategories, maxPrice, sortBy]);

  const pageTitle = querySearch
    ? `Resultados para "${querySearch}"`
    : selectedCategories.length > 0
    ? selectedCategories.join(', ')
    : 'Todos los Productos';

  return (
    <div className="alma-catalog-page">
      {/* Breadcrumb */}
      <nav className="catalog-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>&gt;</span>
        <Link to="/productos">Catálogo</Link>
        {selectedCategories.length === 1 && (
          <>
            <span>&gt;</span>
            <span>{selectedCategories[0]}</span>
          </>
        )}
      </nav>

      {/* Encabezado y Ordenador */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">{pageTitle}</h1>
          <p className="catalog-count">{filteredProducts.length} productos disponibles para tu piel</p>
        </div>

        <div className="catalog-sort">
          <label htmlFor="sort-select">Ordenar por:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </div>
      </div>

      {/* Layout Principal: Sidebar Filtros + Grilla */}
      <div className="catalog-layout">
        {/* SIDEBAR DE FILTROS */}
        <aside className="catalog-sidebar">
          <div className="sidebar-header">
            <h3>Filtrar por</h3>
            {(selectedCategories.length > 0 || maxPrice !== null || querySearch) && (
              <button onClick={handleResetFilters} className="clear-filters-btn">
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Categoría */}
          <div className="filter-group">
            <h4 className="filter-group-title">Categoría</h4>
            <div className="filter-options-list">
              {allCategories.map((cat) => (
                <label key={cat} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rango de Precio */}
          <div className="filter-group">
            <h4 className="filter-group-title">Rango de precio</h4>
            <div className="price-slider-box">
              <input
                type="range"
                min="0"
                max={Math.max(maxAvailablePrice, 1)}
                step={Math.max(1, Math.ceil(maxAvailablePrice / 100))}
                value={priceLimit}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-input"
              />
              <div className="price-range-labels">
                <span>0 €</span>
                <span className="active-max-price">
                  Hasta {Number(priceLimit).toFixed(2).replace('.', ',')} €
                </span>
                <span>{Number(maxAvailablePrice).toFixed(2).replace('.', ',')} €</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Asesoramiento "¿Tu piel es única?" */}
          <div className="skin-advice-card">
            <h4>¿Tu piel es única?</h4>
            <p>¿Necesitas ayuda para elegir? Te acompañamos en tu rutina diaria.</p>
            <button className="advice-btn" onClick={() => alert('Nuestro equipo de dermocosmética está a tu disposición en hola@almabeauty.com')}>
              Habla con nosotras &rarr;
            </button>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL / GRILLA DE PRODUCTOS */}
        <main className="catalog-products-section">
          {loading ? (
            <div className="empty-catalog-box">
              <div className="catalog-spinner">⏳</div>
              <h3>Cargando catálogo...</h3>
              <p>Consultando la API de productos del TPO...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-catalog-box">
              <h3>No encontramos productos</h3>
              <p>Prueba ajustando los filtros o buscando con otros términos.</p>
              <button onClick={handleResetFilters} className="reset-all-btn">
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="catalog-grid">
              {filteredProducts.map((product) => (
                <CardProducto
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
