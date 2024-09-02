import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { makeRequest } from '../../makeRequest';
import { selectItemsByStock } from '../cart/cartReducer';
import { ActionTypes, handleFulfilled, handlePending, handleRejected } from '../shared/helpers/caseHandlers';


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
  timeoutIds: null,
  sessionExpired: false,
  timeoutIds: {}
};

export const initializeCheckout = createAsyncThunk(
  ActionTypes.INITIALIZE_CHECKOUT,
  async (_, { getState, rejectWithValue }) => {
    try {
      // console.log('reached here')
      const state = getState();
      const { cart } = state
      const items = cart.items;

      const { inStockItems } = selectItemsByStock(state);
      console.log('inStockItems', inStockItems)
      const cartId = cart.cartId;


      // Merge local items with the Strapi cart items and get the updated cart
      const validatedResponse = await makeRequest.patch(`/checkout/initialize`,
        { items: inStockItems, cartId, customerEmail: 'dekeji1@gmail.com' },

      );

      console.log('checkout response', validatedResponse);
      const validationResults = validatedResponse?.data?.validationResults;
      const checkoutSessionDuration = validatedResponse?.data?.checkoutSessionDuration


      // console.log('mergedCart', mergedCart);
      return { cartId, validationResults, checkoutSessionDuration };
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to initialize checkout');
    }
  }
)

export const endCheckoutSession = createAsyncThunk(
  'checkout/endCheckoutSession',
  async (_, { rejectWithValue }) => {
    // console.log('triggered')
    try {
      await makeRequest.post(`/checkout/end`);
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
    setTimeoutIds(state, action) {
      state.timeoutIds = action.payload;
    },
    sessionExpired: (state) => {
      state.sessionExpired = true;
    },
    clearTimeouts(state) {
      state.timeoutIds && clearTimeout(state.timeoutIds.sessionTimeoutId);
      state.timeoutIds && clearTimeout(state.timeoutIds.warningTimeoutId);
      state.timeoutIds = null;
    },
    cancelCheckout: (state) => {
      // Handle checkout cancellation
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
      .addCase(initializeCheckout.pending, handlePending)
      .addCase(initializeCheckout.fulfilled, (state, action) => handleFulfilled(state, action, ActionTypes.INITIALIZE_CHECKOUT))
      .addCase(initializeCheckout.rejected, handleRejected);

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
  sessionExpired,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;