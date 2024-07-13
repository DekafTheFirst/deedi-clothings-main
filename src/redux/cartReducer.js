import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  subtotal: 0,
  vat: 0,
  totalAmount: 0,
}


const calculateTotals = (products) => {
  const subtotal = products.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  const vat = (subtotal * 0.2).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(vat)).toFixed(2);
  
  return { subtotal, vat, totalAmount };
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id && item.size === action.payload.size);
      
      if(item) {
        item.quantity += 1;
      }
      else {
        state.products.push(action.payload)
      };

      const totals = calculateTotals(state.products);
      state.subtotal = totals.subtotal;
      state.vat = totals.vat;
      state.totalAmount = totals.totalAmount;
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.cartItemId !== action.payload);
      const totals = calculateTotals(state.products);
      state.subtotal = totals.subtotal;
      state.vat = totals.vat;
      state.totalAmount = totals.totalAmount;
    },

    resetCart: (state) => {
      state.products = [];
      state.subtotal = 0;
      state.vat = 0;
      state.totalAmount = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer