import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadAccountData } from './accountSlice';
import { loginApi } from '../services/api';

// Cargar estado inicial de autenticación desde localStorage
const loadAuthFromStorage = () => {
  try {
    const token = localStorage.getItem('alma_token');
    const email = localStorage.getItem('alma_user_email');
    const rol = localStorage.getItem('alma_user_role');
    if (token && email) {
      return {
        user: { email, nombre: email.split('@')[0], token, rol },
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

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginApi(email, password);
      if (!data.token) {
        throw new Error('La API no devolvió un token de sesión válido.');
      }

      const userEmail = data.email || email;
      return {
        email: userEmail,
        nombre: data.nombre || userEmail.split('@')[0],
        apellido: data.apellido || '',
        token: data.token,
        rol: data.rol
      };
    } catch (error) {
      return rejectWithValue(error.message || 'No se pudo iniciar sesión. Inténtalo nuevamente.');
    }
  }
);

const saveAuthenticatedUser = (state, user) => {
  state.user = user;
  state.isAuthenticated = true;
  if (user?.token) {
    localStorage.setItem('alma_token', user.token);
  }
  if (user?.email) {
    localStorage.setItem('alma_user_email', user.email);
  }
  if (user?.rol) {
    localStorage.setItem('alma_user_role', user.rol);
  } else {
    localStorage.removeItem('alma_user_role');
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...loadAuthFromStorage(),
    loginLoading: false,
    loginError: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      saveAuthenticatedUser(state, action.payload);
      state.loginLoading = false;
      state.loginError = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginLoading = false;
      state.loginError = null;
      localStorage.removeItem('alma_token');
      localStorage.removeItem('alma_user_email');
      localStorage.removeItem('alma_user_role');
    },
    clearLoginError: (state) => {
      state.loginError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        saveAuthenticatedUser(state, action.payload);
        state.loginLoading = false;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || action.error.message;
      })
      .addCase(loadAccountData.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.profile };
      });
  }
});

export const { loginSuccess, logout, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
