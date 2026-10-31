import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (!existing) return;
      if (quantity < 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existing.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
