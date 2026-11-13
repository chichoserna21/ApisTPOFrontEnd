import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApiRequest } from '../services/api';
import './AdminDashboard.css';

const SECTIONS = [
  { id: 'productos', label: 'Productos' },
  { id: 'ofertas', label: 'Ofertas' },
  { id: 'categorias', label: 'Categorías' }
];

const emptyForm = (section) => {
  if (section === 'productos') {
    return {
      nombre: '',
      descripcion: '',
      marca: '',
      precio: '',
      stock: '',
      categoriaId: '',
      imagenes: ''
    };
  }
  if (section === 'ofertas') {
    return {
      titulo: '',
      descripcion: '',
      porcentajeDescuento: '',
      fechaInicio: '',
      fechaFin: '',
      activa: true,
      productoId: ''
    };
  }
  return { nombre: '' };
};

const localDateTimeValue = (value) => (value ? value.slice(0, 16) : '');

const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('es-AR');
};

const loadAdminData = () => Promise.all([
  adminApiRequest('/productos'),
  adminApiRequest('/categorias'),
  adminApiRequest('/ofertas')
]);

const AdminDashboard = ({ onProductsChanged }) => {
  const [activeSection, setActiveSection] = useState('productos');
  const [data, setData] = useState({ productos: [], ofertas: [], categorias: [] });
  const [form, setForm] = useState(emptyForm('productos'));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    loadAdminData()
      .then(([productos, categorias, ofertas]) => {
        if (!active) return;
        setData({ productos, categorias, ofertas });
        setError('');
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

  const resetForm = (section = activeSection) => {
    setForm(emptyForm(section));
    setEditingId(null);
  };

  const changeSection = (section) => {
    setActiveSection(section);
    resetForm(section);
    setError('');
    setNotice('');
  };

  const refreshData = async (refreshProducts = false) => {
    const [productos, categorias, ofertas] = await loadAdminData();
    setData({ productos, categorias, ofertas });
    if (refreshProducts) await onProductsChanged();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setError('');
    setNotice('');

    if (activeSection === 'productos') {
      setForm({
        nombre: item.nombre || '',
        descripcion: item.descripcion || '',
        marca: item.marca || '',
        precio: item.precio ?? '',
        stock: item.stock ?? '',
        categoriaId: item.categoriaId ?? '',
        imagenes: (item.imagenes || []).join('\n')
      });
    } else if (activeSection === 'ofertas') {
      setForm({
        titulo: item.titulo || '',
        descripcion: item.descripcion || '',
        porcentajeDescuento: item.porcentajeDescuento ?? '',
        fechaInicio: localDateTimeValue(item.fechaInicio),
        fechaFin: localDateTimeValue(item.fechaFin),
        activa: Boolean(item.activa),
        productoId: item.productoId ?? ''
      });
    } else {
      setForm({ nombre: item.nombre || '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');

    let body;
    if (activeSection === 'productos') {
      body = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        marca: form.marca.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        categoriaId: Number(form.categoriaId),
        imagenes: form.imagenes.split('\n').map((url) => url.trim()).filter(Boolean)
      };
    } else if (activeSection === 'ofertas') {
      body = {
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        porcentajeDescuento: Number(form.porcentajeDescuento),
        fechaInicio: form.fechaInicio.length === 16 ? `${form.fechaInicio}:00` : form.fechaInicio,
        fechaFin: form.fechaFin.length === 16 ? `${form.fechaFin}:00` : form.fechaFin,
        activa: form.activa,
        productoId: Number(form.productoId)
      };
    } else {
      body = { nombre: form.nombre.trim() };
    }

    try {
      const path = `/${activeSection}${editingId ? `/${editingId}` : ''}`;
      await adminApiRequest(path, {
        method: editingId ? 'PUT' : 'POST',
        body
      });
      await refreshData(activeSection === 'productos');
      setNotice(`${SECTIONS.find((section) => section.id === activeSection).label} ${editingId ? 'actualizado' : 'creado'} correctamente.`);
      resetForm();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const label = item.nombre || item.titulo || `#${item.id}`;
    if (!window.confirm(`¿Querés eliminar "${label}"?`)) return;

    setSaving(true);
    setError('');
    setNotice('');
    try {
      await adminApiRequest(`/${activeSection}/${item.id}`, {
        method: 'DELETE'
      });
      await refreshData(activeSection === 'productos');
      if (editingId === item.id) resetForm();
      setNotice('Eliminado correctamente.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const currentItems = data[activeSection];
  const sectionName = SECTIONS.find((section) => section.id === activeSection).label;
  const formHeading = editingId
    ? `Editar ${sectionName.toLowerCase()}`
    : activeSection === 'categorias'
      ? 'Nueva categoría'
      : `Nueva ${activeSection === 'ofertas' ? 'oferta' : 'producto'}`;
  const emptyState = activeSection === 'categorias'
    ? 'Todavía no hay categorías cargadas.'
    : activeSection === 'ofertas'
      ? 'Todavía no hay ofertas cargadas.'
      : 'Todavía no hay productos cargados.';

  return (
    <section className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Administración</p>
          <h1>Panel de gestión</h1>
          <p>Administrá el catálogo, las promociones y las categorías de ALMA.</p>
        </div>
        <Link className="admin-back-link" to="/">Volver a la tienda</Link>
      </header>

      <div className="admin-summary" aria-label="Resumen del catálogo">
        <div><strong>{data.productos.length}</strong><span>Productos</span></div>
        <div><strong>{data.ofertas.length}</strong><span>Ofertas</span></div>
        <div><strong>{data.categorias.length}</strong><span>Categorías</span></div>
      </div>

      {error && <p role="alert" className="admin-message admin-message-error">{error}</p>}
      {notice && <p role="status" className="admin-message admin-message-success">{notice}</p>}

      <div className="admin-workspace">
        <nav className="admin-tabs" role="tablist" aria-label="Secciones de administración">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              id={`admin-tab-${section.id}`}
              type="button"
              role="tab"
              aria-selected={activeSection === section.id}
              aria-controls="admin-panel"
              className={activeSection === section.id ? 'active' : ''}
              onClick={() => changeSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div
          id="admin-panel"
          className="admin-panel"
          role="tabpanel"
          aria-labelledby={`admin-tab-${activeSection}`}
        >
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-heading">
              <div>
                <h2>{formHeading}</h2>
                <p>Los cambios se guardan en el backend.</p>
              </div>
              {editingId && (
                <button className="admin-cancel-button" type="button" onClick={() => resetForm()}>
                  Cancelar edición
                </button>
              )}
            </div>

            {activeSection === 'productos' && (
              <div className="admin-form-grid">
                <label>
                  Nombre
                  <input name="nombre" value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} required maxLength="100" />
                </label>
                <label>
                  Marca
                  <input name="marca" value={form.marca} onChange={(event) => setForm({ ...form, marca: event.target.value })} required />
                </label>
                <label>
                  Categoría
                  <select name="categoriaId" value={form.categoriaId} onChange={(event) => setForm({ ...form, categoriaId: event.target.value })} required>
                    <option value="">Seleccioná una categoría</option>
                    {data.categorias.map((category) => <option key={category.id} value={category.id}>{category.nombre}</option>)}
                  </select>
                </label>
                <label>
                  Precio (€)
                  <input name="precio" type="number" min="0.01" step="0.01" value={form.precio} onChange={(event) => setForm({ ...form, precio: event.target.value })} required />
                </label>
                <label>
                  Stock
                  <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} required />
                </label>
                <label className="admin-field-wide">
                  Descripción
                  <textarea name="descripcion" rows="3" value={form.descripcion} onChange={(event) => setForm({ ...form, descripcion: event.target.value })} required />
                </label>
                <label className="admin-field-wide">
                  URLs de imágenes (una por línea)
                  <textarea name="imagenes" rows="2" value={form.imagenes} onChange={(event) => setForm({ ...form, imagenes: event.target.value })} />
                </label>
              </div>
            )}

            {activeSection === 'ofertas' && (
              <div className="admin-form-grid">
                <label>
                  Título
                  <input name="titulo" value={form.titulo} onChange={(event) => setForm({ ...form, titulo: event.target.value })} required />
                </label>
                <label>
                  Producto
                  <select name="productoId" value={form.productoId} onChange={(event) => setForm({ ...form, productoId: event.target.value })} required>
                    <option value="">Seleccioná un producto</option>
                    {data.productos.map((product) => <option key={product.id} value={product.id}>{product.nombre}</option>)}
                  </select>
                </label>
                <label>
                  Descuento (%)
                  <input name="porcentajeDescuento" type="number" min="0.01" max="100" step="0.01" value={form.porcentajeDescuento} onChange={(event) => setForm({ ...form, porcentajeDescuento: event.target.value })} required />
                </label>
                <label>
                  Fecha de inicio
                  <input name="fechaInicio" type="datetime-local" value={form.fechaInicio} onChange={(event) => setForm({ ...form, fechaInicio: event.target.value })} required />
                </label>
                <label>
                  Fecha de fin
                  <input name="fechaFin" type="datetime-local" value={form.fechaFin} onChange={(event) => setForm({ ...form, fechaFin: event.target.value })} required />
                </label>
                <label className="admin-checkbox-field">
                  <input name="activa" type="checkbox" checked={form.activa} onChange={(event) => setForm({ ...form, activa: event.target.checked })} />
                  Oferta activa
                </label>
                <label className="admin-field-wide">
                  Descripción
                  <textarea name="descripcion" rows="3" value={form.descripcion} onChange={(event) => setForm({ ...form, descripcion: event.target.value })} required />
                </label>
              </div>
            )}

            {activeSection === 'categorias' && (
              <div className="admin-form-grid">
                <label className="admin-field-wide">
                  Nombre de la categoría
                  <input name="nombre" value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} required />
                </label>
              </div>
            )}

            <div className="admin-form-actions">
              <button className="admin-primary-button" type="submit" disabled={saving || loading}>
                {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear'}
              </button>
            </div>
          </form>

          <div className="admin-list-heading">
            <div>
              <h2>{sectionName}</h2>
              <p>{currentItems.length} elemento{currentItems.length === 1 ? '' : 's'}</p>
            </div>
          </div>

          {loading ? (
            <p className="admin-empty-state">Cargando datos...</p>
          ) : currentItems.length === 0 ? (
            <p className="admin-empty-state">{emptyState}</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  {activeSection === 'productos' && (
                    <tr><th>Producto</th><th>Marca</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
                  )}
                  {activeSection === 'ofertas' && (
                    <tr><th>Oferta</th><th>Producto</th><th>Descuento</th><th>Vigencia</th><th>Estado</th><th>Acciones</th></tr>
                  )}
                  {activeSection === 'categorias' && (
                    <tr><th>Categoría</th><th>Acciones</th></tr>
                  )}
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id}>
                      {activeSection === 'productos' && (
                        <>
                          <td data-label="Producto">{item.nombre}</td>
                          <td data-label="Marca">{item.marca}</td>
                          <td data-label="Categoría">{item.categoriaNombre}</td>
                          <td data-label="Precio">{Number(item.precio).toFixed(2).replace('.', ',')} €</td>
                          <td data-label="Stock">{item.stock}</td>
                        </>
                      )}
                      {activeSection === 'ofertas' && (
                        <>
                          <td data-label="Oferta">{item.titulo}</td>
                          <td data-label="Producto">{item.productoNombre || `#${item.productoId}`}</td>
                          <td data-label="Descuento">{item.porcentajeDescuento}%</td>
                          <td data-label="Vigencia">{formatDateTime(item.fechaInicio)} – {formatDateTime(item.fechaFin)}</td>
                          <td data-label="Estado">{item.activa ? 'Activa' : 'Inactiva'}</td>
                        </>
                      )}
                      {activeSection === 'categorias' && <td data-label="Categoría">{item.nombre}</td>}
                      <td data-label="Acciones" className="admin-row-actions">
                        <button type="button" onClick={() => handleEdit(item)} disabled={saving}>Editar</button>
                        <button type="button" className="danger" onClick={() => handleDelete(item)} disabled={saving}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
