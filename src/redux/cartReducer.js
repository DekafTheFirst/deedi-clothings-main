import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { makeRequest } from '../makeRequest';
import { transformCartItems } from '../utils/transformCartItems';
import { mergeCartItems } from '../utils/mergeCartItems';
import { v4 as uuidv4 } from 'uuid';

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

    // Check if the item already exists in the cart
    const existingItem = items.find(
      (i) => i.productId === item.productId && i.size === item.size
    );
    // console.log(existingItem)



    // console.log(item)
    try {
      let response;
      let localCartItemId;
      let strapiCartItemId;

      if (auth.user) {
        if (existingItem) {
          // Update existing item in backend
          response = await makeRequest.put(`/carts/${cartId}/items/${existingItem.strapiCartItemId}`, {
            quantity: existingItem.quantity + item.quantity,
          });

          console.log(response.data)
        } else {
          // Add new item to backend
          localCartItemId = `cartItem_${uuidv4()}`;
          response = await makeRequest.post(`/carts/${cartId}/items`, {
            ...item,
            localCartItemId
            // cart: cartId, // Attach the cart ID to the item
          });
          strapiCartItemId = response?.data?.data?.id
          console.log(response.data);
        }
      }
      else {
        localCartItemId = `cartItem_${uuidv4()}`;
        strapiCartItemId = null
      }



      // Always return the updated items
      const updatedItems = existingItem
        ? items.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
        : [...items, { ...item, localCartItemId, strapiCartItemId }];


      return updatedItems;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
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
    const updatedItems = items.filter((i) => i.localCartItemId !== itemId);

    // If authenticated, remove the item from the backend
    // if (auth.user) {
    //   try {
    //     const updatedCart = await makeRequest.delete(`/carts/${cartId}/items/${itemId}`);
    //     console.log(updatedCart)
    //   } catch (error) {
    //     return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    //   }
    // }



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


export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState();
      const localItems = cart.items;

      // Fetch the cart from the backend
      const response = await makeRequest.get(`/carts`, {
        params: {
          // populate: {
          //   items: {
          //     populate: {
          //       product: {
          //         populate: ['img'],
          //         fields: ['title', 'price', 'img']
          //       }
          //     }
          //   }
          // },
          filters: {
            user: {
              id: userId
            }
          }
        }
      });

      console.log('response', response);
      let cartData = response?.data?.data?.[0];

    
      const cartId = cartData?.id;




      // Merge local items with the Strapi cart items and get the updated cart
      const updatedresponse = await makeRequest.put(`/carts/${cartId}`, { items: localItems });
      console.log('updatedresponse', updatedresponse)

      const updatedCartItems = updatedresponse.data.data.items;
      console.log('updatedCartItems', updatedCartItems);
      
      const transformedUpdatedCartItems = transformCartItems(updatedCartItems);
      console.log('transformedUpdatedCartItems', transformedUpdatedCartItems)
      return { cartId, items: transformedUpdatedCartItems };
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
    }
  }
);

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
    resetCart: (state) => {
      state.items = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartId = action.payload.cartId;
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
        state.items = state.items.filter(item => item.localCartItemId !== action.meta.arg);
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