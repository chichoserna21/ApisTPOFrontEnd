import { createSlice } from '@reduxjs/toolkit';

// Obtener email activo al iniciar la app
const initialEmail = typeof window !== 'undefined' ? localStorage.getItem('alma_user_email') : null;

// Clave en localStorage según el usuario (cada cuenta tiene su propio carrito)
const getStorageKey = (email) => (email ? `alma_cart_${email}` : 'alma_cart_guest');

// Cargar estado inicial desde localStorage para persistencia
const loadCartFromStorage = (email) => {
  try {
    const key = getStorageKey(email);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentUserEmail: initialEmail,
    items: loadCartFromStorage(initialEmail)
  },
  reducers: {
    // Cambiar de usuario y cargar su carrito correspondiente
    switchCartUser: (state, action) => {
      const email = action.payload || null;
      state.currentUserEmail = email;
      if (email) {
        const userSaved = localStorage.getItem(`alma_cart_${email}`);
        if (userSaved) {
          state.items = JSON.parse(userSaved);
        } else if (state.items.length > 0) {
          // Preserva los productos elegidos como invitado y los asocia a su nueva sesión
          localStorage.setItem(`alma_cart_${email}`, JSON.stringify(state.items));
          localStorage.removeItem('alma_cart_guest');
        } else {
          state.items = [];
        }
      } else {
        const guestSaved = localStorage.getItem('alma_cart_guest');
        state.items = guestSaved ? JSON.parse(guestSaved) : [];
      }
    },
    addToCart: (state, action) => {
      const { product, quantity = 1, formato = '50 ml' } = action.payload;
      const existing = state.items.find(
        (item) => item.id === product.id && item.formato === formato
      );

      if (existing) {
        existing.cantidad += quantity;
      } else {
        state.items.push({
          id: product.id,
          nombre: product.nombre,
          categoria: product.categoria,
          precio: Number(product.precio) || 0,
          cantidad: quantity,
          formato: formato,
          imagen: product.imagen
        });
      }
      localStorage.setItem(getStorageKey(state.currentUserEmail), JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, formato, cantidad } = action.payload;
      if (cantidad <= 0) {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.formato === formato)
        );
      } else {
        const item = state.items.find(
          (i) => i.id === id && i.formato === formato
        );
        if (item) item.cantidad = cantidad;
      }
      localStorage.setItem(getStorageKey(state.currentUserEmail), JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const { id, formato } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.formato === formato)
      );
      localStorage.setItem(getStorageKey(state.currentUserEmail), JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(getStorageKey(state.currentUserEmail));
    }
  }
});

export const { switchCartUser, addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
