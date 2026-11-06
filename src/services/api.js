const API_BASE_URL = '/api';

export const apiRequest = async (path, { token, method = 'GET', body } = {}) => {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });

  if (!response.ok) {
    let message = `Error ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData.message || errorData.error || message;
    } catch {
      message = `${message}: ${response.statusText}`;
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
};

/**
 * Normaliza los productos devueltos por la API para asegurar
 * compatibilidad total con la UI y mockups de ALMA.
 */
export const normalizeProduct = (p) => {
  const imagenes =
    p.imagenes && p.imagenes.length > 0
      ? p.imagenes
      : p.imagen
        ? [p.imagen]
        : [];

  const precio = Number(p.precio) || 0;

  return {
    id: p.id,
    nombre: p.nombre,
    subtitulo: p.subtitulo,
    descripcion: p.descripcion,
    precio,
    precioAnterior: p.precioAnterior == null ? null : Number(p.precioAnterior),
    descuento: p.descuento,
    badge: p.badge,
    categoria: p.categoriaNombre || p.categoria,
    rating: p.rating == null ? null : Number(p.rating),
    reviewsCount: p.reviewsCount == null ? null : Number(p.reviewsCount),
    imagen: imagenes[0],
    imagenes: imagenes,
    beneficios: p.beneficios,
    formatos: p.formatos,
    stock: p.stock == null ? null : Number(p.stock),
    comoUsarlo: p.comoUsarlo
  };
};

/**
 * Obtener todos los productos desde el backend
 */
export const fetchProductos = async () => {
  const data = await apiRequest('/productos');
  if (!Array.isArray(data)) {
    throw new Error('La API devolvió un formato inválido para el catálogo.');
  }
  return data.map(normalizeProduct);
};

/**
 * Obtener un producto por ID desde el backend
 */
export const fetchProductoPorId = async (id) => {
  const data = await apiRequest(`/productos/${id}`);
  return normalizeProduct(data);
};

/**
 * Obtener categorías desde el backend
 */
export const fetchCategorias = async () => {
  const data = await apiRequest('/categorias');
  if (!Array.isArray(data)) {
    throw new Error('La API devolvió un formato inválido para las categorías.');
  }
  return data;
};

export const fetchOfertas = async () => {
  const data = await apiRequest('/ofertas');
  if (!Array.isArray(data)) {
    throw new Error('La API devolvió un formato inválido para las ofertas.');
  }
  const now = Date.now();
  return data.filter((offer) =>
    offer.activa &&
    new Date(offer.fechaInicio).getTime() <= now &&
    new Date(offer.fechaFin).getTime() >= now
  );
};

/**
 * Iniciar sesión con la API (Spring Boot /api/auth/login)
 */
export const loginApi = async (email, password) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password }
  });
};

/**
 * Registrar nuevo usuario con la API (Spring Boot /api/auth/register)
 */
export const registerApi = async (userData) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: userData
  });
};
