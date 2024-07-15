import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  noOfProducts: [],
  subtotal: 0,
  vat: 0,
  totalAmount: 0,
}


const calculateTotals = (products) => {
  // const noOfProdcts = products.reduce
  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const vat = (subtotal * 0.2).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(vat)).toFixed(2);

  return { subtotal, vat, totalAmount };
};

const updateTotals = (state) => {
  const totals = calculateTotals(state.products);
  state.subtotal = totals.subtotal;
  state.vat = totals.vat;
  state.totalAmount = totals.totalAmount;
};


const calculateNoOfProducts = (products) => {
  return products.reduce((acc, item) => acc + item.quantity, 0);
};

const updateNoOfProducts = (state) => {
  state.noOfProducts = calculateNoOfProducts(state.products);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload)
      updateTotals(state);
      updateNoOfProducts(state);

    },
    updateCartItem: (state, action) => {
      const item = state.products.find(item=>item.cartItemId === action.payload.cartItemId);
      item.quantity += 1;
      updateTotals(state);
      updateNoOfProducts(state);


    },
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.cartItemId !== action.payload);
      updateTotals(state);
      updateNoOfProducts(state);

    },

    resetCart: (state) => {
      state.products = [];
      state.noOfProducts = 0;
      state.subtotal = 0;
      state.vat = 0;
      state.totalAmount = 0;

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, updateCartItem } = cartSlice.actions

export default cartSlice.reducer