import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { makeRequest } from '../makeRequest';


export const steps = [
  {
    title: 'Shipping',
    slug: 'shipping-info',
    id: 1,
    completed: true,
  },
  {
    title: 'Billing',
    slug: 'billing-info',
    id: 2,
    completed: true,
  },
  {
    title: 'Payment',
    slug: 'payment',
    id: 3,
    completed: true,
  },
];

// Courier Options



const initialState = {
  currentStep: steps[0],
  completedSteps: [],
  items: [],
  previewedStep: null,
  shippingInfo: null,
  billingInfo: null,
  rates: null,
  selectedCourierId: null,
};



export const endCheckoutSession = createAsyncThunk(
  'checkout/endCheckoutSession',
  async (_, { rejectWithValue }) => {
    // console.log('triggered')
    try {
      await makeRequest.post(`/orders/checkout/end`);
      return { message: 'Checkout session ended successfully' };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutItems: (state) => {

    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      // storeShippingInfoInSession(action.payload);
    },

    setBillingInfo: (state, action) => {
      state.billingInfo = action.payload;
      // storeBillingInfoInSession(action.payload);
    },

    setSelectedCourierId: (state, action) => {
      state.selectedCourierId = action.payload;
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



    resetCheckout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(endCheckoutSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(endCheckoutSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(endCheckoutSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

  }


});

export const {
  setSelectedCourierId,
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