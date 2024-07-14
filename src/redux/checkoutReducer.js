import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
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
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { 
  setSelectedCourier,
  setShippingInfo,
  setBillingInfo,
  setCurrentStep,
 } = checkoutSlice.actions;

export default checkoutSlice.reducer;