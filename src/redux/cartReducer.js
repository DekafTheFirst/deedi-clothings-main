import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  subtotal: 0,
  vat: 0,
  totalAmount: 0,
}


const calculateTotals = (cartItems) => {
  // const noOfProdcts = cartItems.reduce
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const vat = (subtotal * 0.2).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(vat)).toFixed(2);

  return { subtotal, vat, totalAmount };
};

const updateTotals = (state) => {
  const totals = calculateTotals(state.cartItems);
  state.subtotal = totals.subtotal;
  state.vat = totals.vat;
  state.totalAmount = totals.totalAmount;
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    mergeCartOnLogin: (state, action) => {
      state.cartItems = [...state.cartItems, ...action.payload];
      updateTotals(state);
    },

    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      updateTotals(state);
    },

    updateCartItem: (state, action) => {
      const item = state.cartItems.find(item=>item.cartItemId === action.payload.cartItemId);
      item.quantity += 1;
      updateTotals(state);


    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
      updateTotals(state);

    },

    resetCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.vat = 0;
      state.totalAmount = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { mergeCartOnLogin, addToCart, removeItem, resetCart, updateCartItem } = cartSlice.actions

export default cartSlice.reducer