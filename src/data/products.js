import siteData from './data.json';

export const products = siteData.products;

export function getProductById(id) {
  return products.find((product) => String(product.id) === String(id));
}

export function formatPrice(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio);
}
