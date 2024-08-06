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

// Thunk for adding or updating a single cart item
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item, { getState, rejectWithValue }) => {
    const { auth, cart } = getState();
    const { items, cartId } = cart;

    // console.log(item)
    // Check if the item already exists in the cart
    const existingItem = items.find(
      (i) => i.productId === item.productId && i.size === item.size
    );

    let updatedItems;

    if (existingItem) {
      // Update the existing item
      updatedItems = items.map((i) =>
        i.productId === item.productId && i.size === item.size
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      // Add the new item
      updatedItems = [...items, item];
    }




    // If authenticated, update the backend
    // if (auth.user) {
    //   try {
    //     if (existingItem) {
    //       // Update existing item in backend
    //       await makeRequest.put(`/carts/${cartId}/items/${existingItem.cartItemId}`, {
    //         ...existingItem,
    //         quantity: existingItem.quantity + item.quantity,
    //       });
    //     } else {
    //       // Add new item to backend
    //       await makeRequest.post(`/carts/${cartId}/items`, item);
    //     }
    //   } catch (error) {
    //     return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    //   }
    // }

    // Return the updated items (to calculate totals on the frontend)
    console.log(updatedItems)
    return updatedItems;
  }
);


export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId, { getState, rejectWithValue }) => {

    console.log(itemId)
    
    const { auth, cart } = getState();
    const { items, cartId } = cart;

    console.log(items)
   

    
    // Update the items list after removing the item
    const updatedItems = items.filter((i) => i.cartItemId !== itemId);

    // If authenticated, remove the item from the backend
    if (auth.user) {
      try {
        await makeRequest.delete(`/carts/${cartId}/items/${itemId}`);
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
      }
    }

    // Return the updated items list
    console.log(updatedItems)
    return updatedItems;
  }
);



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
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'syncing';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload;
        // Calculate totals after successful addition
        updateTotals(state);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state, action) => {
        state.status = 'syncing';
        state.previousItems = [...state.items];
        state.items = state.items.filter(item => item.cartItemId !== action.meta.arg);
        updateTotals(state);
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload; // Ensure this reflects the updated cart items
        updateTotals(state);
        // Calculate totals after successful removal
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.items = [...state.previousItems]; // Rollback to previous state
        state.previousItems = []
        state.error = action.payload;
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