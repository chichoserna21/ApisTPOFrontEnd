import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadAccountData } from './accountSlice';
import { getCurrentUserApi, loginApi, logoutApi } from '../services/api';

const normalizeUser = (data, fallbackEmail = '') => {
  const email = data?.email || fallbackEmail;
  if (!email) throw new Error('La API no devolvió un perfil de usuario válido.');
  return {
    id: data?.id,
    email,
    nombre: data?.nombre || email.split('@')[0],
    apellido: data?.apellido || '',
    rol: data?.rol
  };
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await loginApi(email, password);
      return normalizeUser(await getCurrentUserApi(), email);
    } catch (error) {
      return rejectWithValue(error.message || 'No se pudo iniciar sesión. Inténtalo nuevamente.');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('alma_token');
        window.localStorage.removeItem('alma_user_email');
        window.localStorage.removeItem('alma_user_role');
      }
    } catch (error) {
      console.error('No se pudo eliminar la sesión JWT antigua del almacenamiento local:', error);
    }

    try {
      return normalizeUser(await getCurrentUserApi());
    } catch (error) {
      if (error.status === 401) return null;
      return rejectWithValue(error.message || 'No se pudo verificar la sesión.');
    }
  },
  {
    condition: (_, { getState }) => {
      const { sessionInitialized, sessionLoading } = getState().auth;
      return !sessionInitialized && !sessionLoading;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (error) {
      if (error.status === 401) return;
      return rejectWithValue(error.message || 'No se pudo cerrar la sesión.');
    }
  }
);

const setAuthenticatedUser = (state, user) => {
  state.user = user;
  state.isAuthenticated = Boolean(user);
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    sessionInitialized: false,
    sessionLoading: false,
    sessionError: null,
    loginLoading: false,
    loginError: null,
    logoutError: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      setAuthenticatedUser(state, action.payload);
      state.sessionInitialized = true;
      state.sessionLoading = false;
      state.sessionError = null;
      state.loginLoading = false;
      state.loginError = null;
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
        setAuthenticatedUser(state, action.payload);
        state.sessionInitialized = true;
        state.sessionLoading = false;
        state.sessionError = null;
        state.loginLoading = false;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || action.error.message;
      })
      .addCase(restoreSession.pending, (state) => {
        state.sessionLoading = true;
        state.sessionError = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.sessionLoading = false;
        state.sessionInitialized = true;
        setAuthenticatedUser(state, action.payload);
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.sessionLoading = false;
        state.sessionInitialized = true;
        state.sessionError = action.payload || action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.sessionInitialized = true;
        state.sessionLoading = false;
        state.loginLoading = false;
        state.loginError = null;
        state.logoutError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutError = action.payload || action.error.message;
      })
      .addCase(loadAccountData.fulfilled, (state, action) => {
        if (state.user) {
          state.user = normalizeUser({ ...state.user, ...action.payload.profile });
        }
      });
  }
});

export const { loginSuccess, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
