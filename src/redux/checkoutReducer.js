import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


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


// export const initializeCheckout = createAsyncThunk(
//   'checkout/initialize',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       // console.log('reached here')
//       const { cart } = getState();
//       const items = cart.items;
//       const cartId = cart.cartId;


//       // Merge local items with the Strapi cart items and get the updated cart
//       const validatedResponse = await makeRequest.patch(`/carts/validate-stock`,
//         { items, cartId },
//         {
//           params: {
//             populate: {
//               items: {
//                 populate: {
//                   product: {
//                     populate: ['img'],
//                     fields: ['title', 'price', 'img'],
//                   },
//                 },
//               },
//             },
//           },
//         }
//       );

//       // console.log('validatedResponse', validatedResponse);



//       const reducedItems = validatedResponse?.data?.reduced;
//       const outOfStockItems = validatedResponse?.data?.outOfStock;
//       const successfulItems = validatedResponse?.data?.success;


//       // console.log('mergedCart', mergedCart);
//       return { cartId, reducedItems: reducedItems, outOfStockItems: outOfStockItems, successfulItems: successfulItems };
//     } catch (error) {
//       console.error(error)
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
//     }
//   }
// )



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
      // .addCase(initializeCheckout.pending, (state) => {
      //   // const cartItems = state.items;
      //   // console.log('cartItems', cartItems)

      //   state.status = 'validating';
      //   updateTotals(state);
      // })

      // .addCase(initializeCheckout.fulfilled, (state, action) => {
      //   const { outOfStockItems, reducedItems, successfulItems } = action.payload;
      //   console.log('response', action.payload)
      //   // Convert items and errors array to Map for efficient access and updates
      //   const itemsMap = new Map(state.items.map(item => [item.localCartItemId, item]));
      //   const errorsMap = new Map(state.stockValidationErrors.map(error => [error.itemId, error]));
      //   const processedItemIds = new Set();


      //   // Function to upsert error in the Map
      //   const upsertError = (item, errorMessage, errorType) => {
      //     errorsMap.set(item.localCartItemId, {
      //       itemId: item.localCartItemId,
      //       error: errorMessage,
      //       type: errorType,
      //     });
      //   };

      //   // Process out-of-stock items
      //   outOfStockItems.forEach(item => {
      //     const cartItem = itemsMap.get(item.localCartItemId);
      //     if (cartItem && !cartItem.outOfStock) {
      //       // Add or update out-of-stock error
      //       upsertError(
      //         item,
      //         `${item.productTitle} (${item.size.size}) is out of stock.`,
      //         'out-of-stock'
      //       );

      //       toast.error(`${item.productTitle} (${item.size.size}) is out of stock.`);

      //       // Update item status
      //       itemsMap.set(item.localCartItemId, {
      //         ...cartItem,
      //         availableStock: 0,
      //         outOfStock: true,
      //       });
      //       processedItemIds.add(item.localCartItemId);
      //     }
      //   });

      //   // Process successful items
      //   successfulItems.forEach(item => {
      //     const cartItem = itemsMap.get(item.localCartItemId);
      //     if (cartItem) {
      //       itemsMap.set(item.localCartItemId, {
      //         ...cartItem,
      //         availableStock: item.availableStock,
      //         outOfStock: false,
      //       });

      //       // Remove any related error from errorsMap
      //       errorsMap.delete(item.localCartItemId);

      //       // Notify user that product is back in stock
      //       if (cartItem.availableStock === 0 && item.availableStock > 0) {
      //         toast.success(`${item.productTitle} (${cartItem.size.size}) is back in stock 🎉.`);

      //         if (cartItem.quantity < item.availableStock) {
      //           cartItem.quantity = item.availableStock;
      //         }
      //       }
      //     }
      //   });

      //   // Process reduced items
      //   // console.log('trigged')
      //   reducedItems.forEach(item => {
      //     const cartItem = itemsMap.get(item.localCartItemId);
      //     if (cartItem) {
      //       // Add or update reduced-stock error

      //       let errorMessage;
      //       // Check if current quantity is higher than the amount of new available stock
      //       if (cartItem.availableStock === 0) {
      //         errorMessage = `${item.productTitle} (${item.size.size}) is now available. Your cart has been updated to match the current stock.`
      //         toast.success(errorMessage);
      //       }
      //       else {
      //         errorMessage = `Quantity of ${item.productTitle} (${item.size.size}) was reduced due ${item.newQuantity} to insufficient stock.`
      //         toast.warning(errorMessage);
      //       }

      //       upsertError(
      //         item,
      //         errorMessage,
      //         'reduced-stock'
      //       );


      //       // Update item quantity and stock
      //       itemsMap.set(item.localCartItemId, {
      //         ...cartItem,
      //         quantity: item.newQuantity,
      //         availableStock: item.availableStock,
      //         outOfStock: false,
      //       });
      //       processedItemIds.add(item.localCartItemId);
      //     }
      //   });

      //   // Convert the Map back to arrays
      //   state.items = Array.from(itemsMap.values());
      //   state.stockValidationErrors = Array.from(errorsMap.values());

      //   state.status = 'idle';
      // })

      // .addCase(initializeCheckout.rejected, (state, action) => {



      //   updateTotals(state);
      //   state.status = 'failed';
      // })
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