import { createSlice, current } from '@reduxjs/toolkit';
import { rates } from '../utils/rates';
import { storeBillingInfoInSession, storeCompletedStepsInSession, storeCurrentStepInSession, storeShippingInfoInSession } from '../utils/session';


export const steps = [
  {
    title: 'Shipping Info',
    slug: 'shipping-info',
    id: 1,
    completed: true,
  },
  {
    title: 'Billing Info',
    slug: 'billing-info',
    id: 2,
    completed: true,
  },
  {
    title: 'Complete',
    slug: 'complete',
    id: 3,
    completed: true,
  },
];

// Courier Options
const courierOptions = rates.data.rates



const initialState = {
  currentStep: steps[0],
  completedSteps: [],
  previewedStep: null,
  shippingInfo: null,
  billingInfo: null,
  rates: null,
  selectedCourier: courierOptions[0],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      // storeShippingInfoInSession(action.payload);
    },

    setBillingInfo: (state, action) => {
      state.billingInfo = action.payload;
      // storeBillingInfoInSession(action.payload);
    },

    setSelectedCourier: (state, action) => {
      state.selectedCourier = action.payload;
    },

    setCurrentStep: (state, action) => {
      state.currentStep = steps.find(step => step.id === action.payload);
      // storeCurrentStepInSession(action.payload);
    },

    setPreviewedStep: (state, action) => {
      const step = steps.find(step => step.id === action.payload);
      if (step) {
        state.previewedStep = step
      }
    },

    clearPreviewedStep: (state) => {
      state.previewedStep = null;
    },

    nextStep: (state) => {
      let step;
      if (state.previewedStep) {
        step = steps.find(step => step.id === state.previewedStep.id + 1);
        if (step) {
          state.currentStep = step
        }
        state.previewedStep = null
      }
      else {
        step = steps.find(step => step.id === state.currentStep.id + 1);

        if (step) {
          state.completedSteps = [...state.completedSteps, state.currentStep];
          state.currentStep = step
        }

      }

      // storeCurrentStepInSession(step);
      // storeCompletedStepsInSession(state.completedSteps)


    },


    setRates: (state, action) => {
      state.rates = action.payload
    },

    setSelectedCourier: (state, action) => {
      state.selectedCourier = courierOptions.find(courier => courier.courier_id === action.payload);
    }
  },

  resetCheckout: (state) => {
    return [];
  },
});

export const {
  setSelectedCourier,
  setShippingInfo,
  setBillingInfo,
  setCurrentStep,
  setPreviewedStep,
  nextStep,
  clearPreviewedStep,
  setRates,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;