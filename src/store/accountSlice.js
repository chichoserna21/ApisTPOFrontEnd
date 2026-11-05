import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../services/api';

let cartSyncQueue = Promise.resolve();
let favoritesSyncQueue = Promise.resolve();

const getToken = (state) => state.auth.user?.token;

const normalizeCartItem = (item) => ({
  id: item.id ?? item.productoId,
  nombre: item.nombre,
  categoria: item.categoria || '',
  precio: Number(item.precio) || 0,
  cantidad: Number(item.cantidad) || 1,
  formato: item.formato || '50 ml',
  imagen: item.imagen || ''
});

export const loadAccountData = createAsyncThunk(
  'account/load',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      if (!token) throw new Error('Iniciá sesión para cargar los datos de tu cuenta.');
      const [profile, cart, favorites, orders] = await Promise.all([
        apiRequest('/auth/me', { token }),
        apiRequest('/carrito', { token }),
        apiRequest('/favoritos', { token }),
        apiRequest('/pedidos', { token })
      ]);
      if (getToken(getState()) !== token) {
        throw new Error('La sesión cambió mientras se cargaban los datos.');
      }
      return {
        token,
        profile,
        cart: cart.map(normalizeCartItem),
        favorites,
        orders
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const mutateServerCart = createAsyncThunk(
  'account/mutateCart',
  async (operation, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      if (!token) throw new Error('Iniciá sesión para guardar tu carrito.');
      const request = async () => {
        const items = getState().cart.items.map((item) => ({ ...item }));
        let nextItems = items;
        if (operation.type === 'add') {
          const existing = nextItems.find(
            (item) => item.id === operation.product.id && item.formato === operation.formato
          );
          if (existing) {
            existing.cantidad += operation.quantity;
          } else {
            nextItems.push(normalizeCartItem({
              ...operation.product,
              cantidad: operation.quantity,
              formato: operation.formato
            }));
          }
        } else if (operation.type === 'quantity') {
          nextItems = nextItems
            .map((item) => item.id === operation.id && item.formato === operation.formato
              ? { ...item, cantidad: operation.cantidad }
              : item)
            .filter((item) => item.cantidad > 0);
        } else if (operation.type === 'remove') {
          nextItems = nextItems.filter(
            (item) => !(item.id === operation.id && item.formato === operation.formato)
          );
        } else if (operation.type === 'clear') {
          nextItems = [];
        }

        const response = await apiRequest('/carrito', {
          token,
          method: 'PUT',
          body: {
            items: nextItems.map(({ id, cantidad, formato }) => ({
              productoId: id,
              cantidad,
              formato
            }))
          }
        });
        if (getToken(getState()) !== token) {
          throw new Error('La sesión cambió mientras se guardaba el carrito.');
        }
        return response.map(normalizeCartItem);
      };
      const result = cartSyncQueue.then(request, request);
      cartSyncQueue = result.catch(() => undefined);
      return await result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavoriteOnServer = createAsyncThunk(
  'account/toggleFavorite',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      if (!token) throw new Error('Iniciá sesión para guardar tus favoritos.');
      const request = async () => {
        const currentIds = getState().account.favorites;
        const nextIds = currentIds.includes(productId)
          ? currentIds.filter((id) => id !== productId)
          : [...currentIds, productId];
        const updatedIds = await apiRequest('/favoritos', {
          token,
          method: 'PUT',
          body: { productoIds: nextIds }
        });
        if (getToken(getState()) !== token) {
          throw new Error('La sesión cambió mientras se guardaban los favoritos.');
        }
        return updatedIds;
      };
      const result = favoritesSyncQueue.then(request, request);
      favoritesSyncQueue = result.catch(() => undefined);
      return await result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkoutOrder = createAsyncThunk(
  'account/checkout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      if (!token) throw new Error('Iniciá sesión para confirmar el pedido.');
      const order = await apiRequest('/pedidos', { token, method: 'POST' });
      if (getToken(getState()) !== token) {
        throw new Error('La sesión cambió mientras se confirmaba el pedido.');
      }
      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    profile: null,
    favorites: [],
    orders: [],
    loading: false,
    error: null,
    checkoutLoading: false,
    checkoutError: null
  },
  reducers: {
    clearAccount: (state) => {
      state.profile = null;
      state.favorites = [];
      state.orders = [];
      state.loading = false;
      state.error = null;
      state.checkoutLoading = false;
      state.checkoutError = null;
    },
    clearAccountError: (state) => {
      state.error = null;
      state.checkoutError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccountData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAccountData.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.favorites = action.payload.favorites;
        state.orders = action.payload.orders;
      })
      .addCase(loadAccountData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(toggleFavoriteOnServer.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(toggleFavoriteOnServer.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(checkoutOrder.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutError = null;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.checkoutLoading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutError = action.payload || action.error.message;
      });
  }
});

export const { clearAccount, clearAccountError } = accountSlice.actions;
export default accountSlice.reducer;
