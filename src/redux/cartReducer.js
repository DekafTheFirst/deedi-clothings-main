import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // const item = state.products.find(item => item.id === action.payload.id && item.size === action.payload.size);
      state.products.push(action.payload)
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.cartItemId !== action.payload)
    },

    resetCart: (state) => {
      state.products = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer