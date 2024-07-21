import { createSlice, current } from '@reduxjs/toolkit';


export const steps = [
  {
    title: 'Shipping Info',
    slug: 'shipping-info',
    id: 1,
    completed: false,
  },
  {
    title: 'Billing Info',
    slug: 'billing-info',
    id: 2,
    completed: false,
  },
  {
    title: 'Complete',
    slug: 'complete',
    id: 3,
    completed: false,
  }
]


const initialState = {
  currentStep: steps[0],
  completedSteps: [],
  previewedStep: null,
  shippingInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
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
      state.currentStep = steps.find(step => step.id === action.payload);
    },

    setPreviewedStep: (state, action) => {
      state.previewedStep = steps.find(step => step.id === action.payload);
    },

    clearPreviewedStep: (state) => {
      state.previewedStep = null;
    },

    nextStep: (state) => {
      if (state.previewedStep) {
        state.currentStep = steps.find(step => step.id === state.previewedStep.id + 1);
        state.previewedStep = null
      }
      else {
        state.completedSteps = [...state.completedSteps, state.currentStep];
        state.currentStep = steps.find(step => step.id === state.currentStep.id + 1);
      }
    },
  },
});

export const {
  setSelectedCourier,
  setShippingInfo,
  setBillingInfo,
  setCurrentStep,
  setPreviewedStep,
  nextStep,
  clearPreviewedStep
} = checkoutSlice.actions;

export default checkoutSlice.reducer;