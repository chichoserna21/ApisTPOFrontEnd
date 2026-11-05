import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CardProducto from './CardProducto';
import './ProductList.css';

const ProductList = ({ products = [], loading = false, onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parámetros de URL
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('categoria') || '';

  // Filtros locales
  const [selectedCategories, setSelectedCategories] = useState(
    queryCategory ? [queryCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(50);
  const [sortBy, setSortBy] = useState('relevancia');

  // Categorías fijas
  const allCategories = ['Cuidado Facial', 'Maquillaje', 'Cuerpo y Baño', 'Fragancias'];

  const handleCategoryToggle = (cat) => {
    let updated;
    if (selectedCategories.includes(cat)) {
      updated = selectedCategories.filter((c) => c !== cat);
    } else {
      updated = [...selectedCategories, cat];
    }
    setSelectedCategories(updated);
    if (updated.length === 1) {
      searchParams.set('categoria', updated[0]);
    } else {
      searchParams.delete('categoria');
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(50);
    searchParams.delete('search');
    searchParams.delete('categoria');
    setSearchParams(searchParams);
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
      if (prod.precio > maxPrice) {
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
    : queryCategory
    ? queryCategory
    : 'Todos los Productos';

  return (
    <div className="alma-catalog-page">
      {/* Breadcrumb */}
      <nav className="catalog-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>&gt;</span>
        <Link to="/productos">Catálogo</Link>
        {queryCategory && (
          <>
            <span>&gt;</span>
            <span>{queryCategory}</span>
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
            {(selectedCategories.length > 0 || maxPrice < 50 || querySearch) && (
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
                min="10"
                max="50"
                step="2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-input"
              />
              <div className="price-range-labels">
                <span>10 €</span>
                <span className="active-max-price">Hasta {maxPrice} €</span>
                <span>50 €</span>
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
