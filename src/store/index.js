import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

const STORAGE_KEY = 'alma-session-state';

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return {
      cart: parsed.cart ?? { items: [] },
      favorites: parsed.favorites ?? { ids: [] },
    };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  const { cart, favorites } = store.getState();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, favorites }));
  } catch {
    // sessionStorage puede no estar disponible
  }
});
