// Servicio de conexión con la API de Spring Boot
const API_BASE_URL = '/api';

/**
 * Normaliza los productos devueltos por la API para asegurar
 * compatibilidad total con la UI y mockups de ALMA.
 */
export const normalizeProduct = (p) => {
  const defaultImg =
    'https://images.unsplash.com/photo-1608248597359-2696660be01e?auto=format&fit=crop&w=600&q=80';
  
  const imagenes =
    p.imagenes && p.imagenes.length > 0
      ? p.imagenes
      : [p.imagen || defaultImg];

  const precio = Number(p.precio) || 0;
  const precioAnterior = p.precioAnterior
    ? Number(p.precioAnterior)
    : Number((precio * 1.4).toFixed(2));

  return {
    id: p.id,
    nombre: p.nombre || 'Producto ALMA',
    subtitulo: p.subtitulo || p.categoriaNombre || p.categoria || 'Cuidado Facial',
    descripcion: p.descripcion || 'Fórmula enriquecida para el cuidado y confort de tu piel.',
    precio: precio,
    precioAnterior: precioAnterior,
    descuento: p.descuento || '30%',
    badge: p.badge || (p.descuento ? `-${p.descuento}` : '-30%'),
    categoria: p.categoriaNombre || p.categoria || 'Cuidado Facial',
    rating: p.rating || 4.8,
    reviewsCount: p.reviewsCount || 110,
    imagen: imagenes[0],
    imagenes: imagenes,
    beneficios: p.beneficios || ['Hidrata 24 h', 'Todo tipo de piel', 'Fórmula vegana'],
    formatos: p.formatos || ['50 ml', '100 ml'],
    stock: p.stock !== undefined ? p.stock > 0 : true,
    comoUsarlo:
      p.comoUsarlo ||
      'Aplica mañana y noche sobre la piel limpia con un suave masaje circular hasta su completa absorción.'
  };
};

/**
 * Obtener todos los productos desde el backend
 */
export const fetchProductos = async () => {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener los productos del backend`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
};

/**
 * Obtener un producto por ID desde el backend
 */
export const fetchProductoPorId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Producto no encontrado`);
  }
  const data = await response.json();
  return normalizeProduct(data);
};

/**
 * Obtener categorías desde el backend
 */
export const fetchCategorias = async () => {
  const response = await fetch(`${API_BASE_URL}/categorias`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener las categorías`);
  }
  return await response.json();
};

/**
 * Iniciar sesión con la API (Spring Boot /api/auth/login)
 */
export const loginApi = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Credenciales incorrectas');
  }

  return await response.json();
};

/**
 * Registrar nuevo usuario con la API (Spring Boot /api/auth/register)
 */
export const registerApi = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al registrar el usuario');
  }

  return await response.json();
};
