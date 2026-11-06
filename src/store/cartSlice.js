import { createSlice } from '@reduxjs/toolkit';

const initialEmail = typeof window !== 'undefined' ? localStorage.getItem('alma_user_email') : null;

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
    currentUserEmail: initialEmail,
    items: initialEmail ? [] : loadGuestCart(),
    syncError: null,
    revision: 0
  },
  reducers: {
    replaceCartItems: (state, action) => {
      state.items = action.payload;
      state.syncError = null;
    },
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
      .addCase('account/load/fulfilled', (state, action) => {
        if (state.revision === action.payload.cartRevision) {
          state.items = action.payload.cart;
        }
        state.syncError = null;
      })
      .addCase('account/mutateCart.pending', (state) => {
        state.revision += 1;
        state.syncError = null;
      })
      .addCase('account/mutateCart.fulfilled', (state, action) => {
        state.items = action.payload;
        state.syncError = null;
      })
      .addCase('account/mutateCart.rejected', (state, action) => {
        state.syncError = action.payload || action.error.message;
      })
      .addCase('account/checkout.fulfilled', (state) => {
        state.items = [];
        state.syncError = null;
      });
  }
});

export const {
  replaceCartItems,
  switchCartUser,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
