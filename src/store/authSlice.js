import { createSlice } from '@reduxjs/toolkit';

// Cargar estado inicial de autenticación desde localStorage
const loadAuthFromStorage = () => {
  try {
    const token = localStorage.getItem('alma_token');
    const email = localStorage.getItem('alma_user_email');
    if (token && email) {
      return {
        user: { email, nombre: email.split('@')[0], token },
        isAuthenticated: true
      };
    }
  } catch {
    // Ignorar error
  }
  return {
    user: null,
    isAuthenticated: false
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload?.token) {
        localStorage.setItem('alma_token', action.payload.token);
      }
      if (action.payload?.email) {
        localStorage.setItem('alma_user_email', action.payload.email);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('alma_token');
      localStorage.removeItem('alma_user_email');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
