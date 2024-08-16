import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { makeRequest } from '../makeRequest';
import { transformCartItems, transformCartItemsOnLogin } from '../utils/transformCartItems';
import { toast } from 'react-toastify';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  SYNCING: 'syncing'
};

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

// Thunk for adding or updating a single cart item
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (newCartItem, { getState, rejectWithValue }) => {
    const { auth, cart } = getState();
    const { cartId } = cart;

    // Check if the newCartItem already exists in the cart

    // console.log(newCartItem)
    let strapiCartItemId;
    let responseData;
    try {
      let response;
      // Add new newCartItem to backend
      response = await makeRequest.post(`/carts/addItem`, {
        ...newCartItem,
        userId: auth.user?.id,
        existingLocalCartItemQty: newCartItem?.alreadyExistingQuantity || 0
        // cart: cartId, // Attach the cart ID to the newCartItem
      });
      strapiCartItemId = response?.data?.data?.id
      // console.log(response.data);
      responseData = response?.data;

    } catch (error) {
      console.error(error)
      if (error?.response?.status === 400) {
        const errorData = error?.response?.data;


        // toast.error(`Unable to add item to cart: ${errorData.message}`)

      }
      return rejectWithValue(error.response?.data || 'Failed to update cart');
    }





    // Always return the updated items



    return {
      strapiCartItemId: strapiCartItemId,
      responseData: responseData,
    };

  }
);


export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ currentQuantity, requestedQuantity, localCartItemId, stockId, strapiCartItemId }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    // Check if the newCartItem already exists in the cart

    // console.log(newCartItem)
    let responseData;
    try {
      let response;
      // Add new newCartItem to backend
      response = await makeRequest.post(`/carts/updateCartItem/${strapiCartItemId}`, {
        userId: auth.user?.id,
        localCartItemId,
        stockId,
        currentQuantity,
        requestedQuantity,
        // cart: cartId, // Attach the cart ID to the newCartItem
      });
      // console.log(response.data);
      responseData = response?.data;

    } catch (error) {
      console.error(error)
      if (error?.response?.status === 400) {
        const errorData = error?.response?.data;


        // toast.error(`Unable to add item to cart: ${errorData.message}`)

      }
      return rejectWithValue(error.response?.data || 'Failed to update cart');
    }





    // Always return the updated items



    return {
      responseData: responseData,
    };

  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ strapiCartItemId, localCartItemId }, { getState, rejectWithValue }) => {

    console.log(localCartItemId)

    const { auth, cart } = getState();
    const { cartId } = cart;


    // If authenticated, remove the item from the backend
    if (auth.user) {
      try {
        const updatedCart = await makeRequest.delete(`/carts/${cartId}/items/${strapiCartItemId}`);
        console.log(updatedCart)
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
      }
    }
  }
);


export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState();
      const localItems = cart.items;

      // console.log(localItems)

      // Merge local items with the Strapi cart items and get the updated cart
      const updatedresponse = await makeRequest.put(`/carts/fetchAndMergeCart/${userId}`,
        { items: localItems },
        {
          params: {
            populate: {
              items: {
                populate: {
                  product: {
                    populate: ['img'],
                    fields: ['title', 'price', 'img'],
                  },
                },
              },
            },
          },
        }
      );

      console.log('updatedresponse', updatedresponse)


      const cartId = updatedresponse?.data?.cartId;

      const mergedCart = transformCartItemsOnLogin(updatedresponse.data.mergedCart);
      const failures = updatedresponse?.data?.failures;
      const partialFailures = updatedresponse?.data?.partials;
      const reducedItems = updatedresponse?.data?.reduced;
      const outOfStockItems = updatedresponse?.data?.outOfStock;



      console.log('failures', failures);

      failures?.forEach((fail) => {
        toast.error(`Failed to add ${fail.productTitle}(${fail.size.size}): ${fail.reason}`);
      });

      partialFailures?.forEach((partial) => {
        toast.warning(`Only ${partial.added} of ${partial.productTitle} (${partial.size.size}) ${partial.added > 1 ? 'were' : 'was'} added: ${partial.reason}`);
      });

      reducedItems?.forEach((reduced) => {
        toast.warning(`${reduced.removed} of ${reduced.productTitle} (${reduced.size.size}) ${reduced.added > 1 ? 'were' : 'was'} removed: ${reduced.reason}`);
      });

      outOfStockItems?.forEach((result) => {
        toast.warning(`${result.productTitle} (${result.size.size}) is out of stock.`);
      });

      console.log('mergedCart', mergedCart);
      return { cartId, items: mergedCart, failures, partialFailures };
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


export const syncCartOnPageRefresh = createAsyncThunk(
  'cart/syncCartOnPageRefresh',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { cartId } = state.cart;

    if (cartId) {
      // Dispatch the syncCart action if items exist
      await dispatch(fetchCartItems(cartId));
    }
  }
);

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
        state.status = 'syncing';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
        state.error = null
        updateTotals(state);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state, action) => {
        const newCartItem = action.meta.arg;
        console.log('newCartItem', newCartItem)
        const items = state.items;
        const existingItem = items.find(
          (i) => i.productId === newCartItem.productId && i.size.size === newCartItem.size.size
        );
        // UpdateItems

        const updatedItems = existingItem
          ? items.map((i) => {
            return (i.localCartItemId === existingItem.localCartItemId
              ? { ...i, quantity: i.quantity + newCartItem.quantity }
              : i)
          }
          )
          : [...items, newCartItem];

        state.previousItems = state.items;
        state.items = updatedItems;
        state.status = 'pending';
        updateTotals(state);
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // state.items = action.payload;
        // Calculate totals after successful addition
        const localCartItemId = action.meta.arg.localCartItemId;
        // console.log('localCartItemId', localCartItemId)
        const strapiCartItemId = action.payload.strapiCartItemId;
        // console.log('strapiCartItemId', strapiCartItemId)
        const responseData = action.payload.responseData
        console.log('responseData', responseData);
        const status = responseData?.status;

        const addedItem = state.items.find(
          (i) => i.localCartItemId === localCartItemId
        );

        // console.log('addedItem', addedItem)

        if (status === 'partial') {
          addedItem.quantity = responseData.data.quantity;
          toast.warning(`Only added ${responseData?.added} of ${addedItem.title} (${addedItem.size.size}): ${responseData.message}`)
        }

        if (status === 'reduced') {
          addedItem.quantity = responseData.newQuantity;
          toast.warning(`Reduced the quantity of ${addedItem.title} (${addedItem.size.size}) to ${responseData?.newQuantity}: ${responseData.message}`)
        }

        if (status === 'success') {
          toast.success('Added to cart')
        }





        if (addedItem && !addedItem?.strapiCartItemId) {
          addedItem.strapiCartItemId = strapiCartItemId
        }



        state.error = null;
        state.previousItems = [];
        state.status = 'succeeded';
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.items = state.previousItems;
        state.previousItems = [];

        const error = action.payload;

        if (error?.status === 'out-of-stock') {
          const localCartItemId = action.meta.arg.localCartItemId;
          // console.log('localCartItemId', localCartItemId)

          const existingItem = state.items.find(
            (i) => i.localCartItemId === localCartItemId
          );

          if (existingItem) existingItem.outOfStock = true;
        }

        updateTotals(state);
        state.error = error;
        // console.log('rejected', action.payload)
        state.status = 'failed';
      })
      .addCase(removeItemFromCart.pending, (state, action) => {
        state.status = 'pending';
        state.previousItems = [...state.items];
        // state.items = action.payload
        state.items = state.items.filter(item => item.localCartItemId !== action.meta.arg.localCartItemId);
        updateTotals(state);
      })
      .addCase(removeItemFromCart.fulfilled, (state) => {
        // Calculate totals after successful removal
        state.status = 'succeeded';
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.items = [...state.previousItems]; // Rollback to previous state
        state.previousItems = []
        state.error = action.payload;
        updateTotals(state);
      })
      .addCase(syncCartOnPageRefresh.pending, (state) => {
        state.status = 'syncing';
      })
      .addCase(syncCartOnPageRefresh.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(syncCartOnPageRefresh.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
})

// Action creators are generated for each case reducer function
export const { resetCart } = cartSlice.actions

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

