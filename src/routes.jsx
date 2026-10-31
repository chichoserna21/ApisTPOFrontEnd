import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts';
import HomePage from './views/home/home.jsx';
import CatalogPage from './views/catalog/catalogPage.jsx';
import ProductDetail from './views/productDetail/productDetail.jsx';
import CartPage from './views/cart/cartPage.jsx';
import FavoritesPage from './views/favorites/favoritesPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/productos',
        element: <CatalogPage />,
      },
      {
        path: '/producto/:id',
        element: <ProductDetail />,
      },
      {
        path: '/carrito',
        element: <CartPage />,
      },
      {
        path: '/favoritos',
        element: <FavoritesPage />,
      },
    ],
  },
]);
