import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { makeRequest } from '../makeRequest';
import { transformCartItems } from '../utils/transformCartItems';
import { mergeCartItems } from '../utils/mergeCartItems';

const initialState = {
  items: [],
  previousItems: [],
  subtotal: 0,
  vat: 0,
  totalAmount: 0,
  status: 'idle',
  error: null
}


const calculateTotals = (items) => {
  // const noOfProdcts = items.reduce
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const vat = (subtotal * 0.2).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(vat)).toFixed(2);

  return { subtotal, vat, totalAmount };
};

const updateTotals = (state) => {
  const totals = calculateTotals(state.items);
  state.subtotal = totals.subtotal;
  state.vat = totals.vat;
  state.totalAmount = totals.totalAmount;
};




export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId, { getState }) => {
  // const userId = getState().auth.user.id; // Assuming the user ID is stored in auth state
  // console.log(userId)
  const response = await makeRequest.get(`/carts`, {
    params: {
      populate: {
        items: {
          populate: {
            product: {
              populate: ['img'],
              fields: ['title', 'price', 'img']
            }
          }
        }
      },
      filters: {
        user: {
          id: userId
        }
      }
    }
  })

  const cartItems = response?.data?.data?.[0]?.attributes.items.data
  const transformedCartItems = transformCartItems(cartItems)

  const cartId = response?.data?.data?.[0]?.id
  return { cartId, items: transformedCartItems };
});

// Async thunk to synchronize the cart with the backend
export const syncCart = createAsyncThunk('cart/syncCart', async (_, { getState }) => {
  const { cart } = getState();
  const response = await makeRequest.put(`/carts/${cart.id}/update`, { items: cart.items });
  return response.data;
});


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  status: 'idle',
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId && item.size === action.payload.size);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      updateTotals(state);
    },

    updateCartItem: (state, action) => {
      const item = state.items.find(item => item.cartItemId === action.payload.cartItemId);
      item.quantity += 1;
      updateTotals(state);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
      updateTotals(state);

    },

    resetCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.vat = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = mergeCartItems(state.items, action.payload.items);
        state.error = null
        updateTotals(state);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(syncCart.pending, (state) => {
        state.previousItems = state.items
        state.status = 'syncing';
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.previousItems = []
        state.status = 'succeeded';
        state.error = null
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.items = state.previousItems;
        state.previousItems = [];
        updateTotals(state);
      });
  },
})

// Action creators are generated for each case reducer function
export const { mergeCartOnLogin, addToCart, removeItem, resetCart, updateCartItem } = cartSlice.actions

export default cartSlice.reducer

export const synchronizeCartPeriodically = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { items } = state.cart;

    // Synchronize cart every 5 minutes
    setInterval(() => {
      dispatch(syncCart(items));
    }, 300000); // 5 minutes in milliseconds
  } catch (error) {
    console.error('Failed to synchronize cart periodically:', error);
  }
};

export const syncCartOnPageRefresh = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { items } = state.cart;

    // Sync cart data on page load
    if (items.length > 0) {
      dispatch(syncCart(items));
    }
  } catch (error) {
    console.error('Failed to synchronize cart on page refresh:', error);
  }
};