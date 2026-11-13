import { createSlice } from '@reduxjs/toolkit';
import { checkoutOrder, loadAccountData, mutateServerCart } from './accountSlice';

const loadGuestCart = () => {
  try {
    const saved = localStorage.getItem('alma_cart_guest');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const persistGuestCart = (state) => {
  if (!state.currentUserEmail) {
    localStorage.setItem('alma_cart_guest', JSON.stringify(state.items));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentUserEmail: null,
    items: loadGuestCart(),
    syncError: null,
    syncPending: 0,
    revision: 0
  },
  reducers: {
    switchCartUser: (state, action) => {
      const email = action.payload || null;
      state.currentUserEmail = email;
      state.items = email ? [] : loadGuestCart();
      state.syncError = null;
    },
    addToCart: (state, action) => {
      const { product, quantity = 1, formato = '' } = action.payload;
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
      persistGuestCart(state);
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
      persistGuestCart(state);
    },
    removeFromCart: (state, action) => {
      const { id, formato } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.formato === formato)
      );
      persistGuestCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      if (!state.currentUserEmail) localStorage.removeItem('alma_cart_guest');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccountData.fulfilled, (state, action) => {
        if (state.revision === action.payload.cartRevision) {
          state.items = action.payload.cart;
        }
        state.syncError = null;
      })
      .addCase(mutateServerCart.pending, (state) => {
        state.revision += 1;
        state.syncPending += 1;
        state.syncError = null;
      })
      .addCase(mutateServerCart.fulfilled, (state, action) => {
        state.syncPending = Math.max(0, state.syncPending - 1);
        state.items = action.payload;
        state.syncError = null;
      })
      .addCase(mutateServerCart.rejected, (state, action) => {
        state.syncPending = Math.max(0, state.syncPending - 1);
        state.syncError = action.payload || action.error.message;
      })
      .addCase(checkoutOrder.fulfilled, (state) => {
        state.items = [];
        state.syncError = null;
      });
  }
});

export const {
  switchCartUser,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
