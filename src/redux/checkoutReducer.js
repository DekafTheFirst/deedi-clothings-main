import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 3,
  shippingInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city:'',
    state: '',
    country: '',
    postalCode: '',
  },
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
    nextStep: (state) => {
      state.currentStep += 1;
    },
  },
});

export const { 
  setSelectedCourier,
  setShippingInfo,
  setBillingInfo,
  setCurrentStep,
  nextStep,
 } = checkoutSlice.actions;

export default checkoutSlice.reducer;