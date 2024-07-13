import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingInfo: {},
  billingInfo: {},
  selectedCourier: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setBillingInfo: (state, action) => {
      state.billingInfo = action.payload;
    },
    setSelectedCourier: (state, action) => {
      state.selectedCourier = action.payload;
    },
  },
});

export const { setShippingInfo, setBillingInfo, setSelectedCourier } = checkoutSlice.actions;

export default checkoutSlice.reducer;