import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
