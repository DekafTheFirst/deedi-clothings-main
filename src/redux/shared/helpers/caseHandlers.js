
import { toast } from "react-toastify";
import { processOutOfStockItems, processReducedItems, processSuccessfulItems } from "./cartItemProcessors";

export const ActionTypes = {
    INITIALIZE_CHECKOUT: 'checkout/initialize',
    VALIDATE_CART_ITEMS: 'cart/validateCartItems',
}

export const handlePending = (state) => {
    state.status = 'validating';
};


export const handleFulfilled = (state, action, actionType) => {
    const { validationResults, checkoutSessionAlreadyExists, checkoutSessionExpiresAt } = action.payload;
    // console.log('checkoutSessionExpiresAt', checkoutSessionExpiresAt);

    // console.log('validationResults', validationResults)
    // Convert state items and errors to Maps for efficient access
    if (validationResults) {
        const itemsMap = new Map(state.items?.map(item => [item.localCartItemId, item]));
        const errorsMap = new Map(state.stockValidationErrors?.map(error => [error.itemId, error]));
        const processedItemIds = new Set();

        // Process each type of item
        const reducedItems = validationResults?.reduced;
        const outOfStockItems = validationResults?.outOfStock;
        const successfulItems = validationResults?.success;

        outOfStockItems && processOutOfStockItems(outOfStockItems, itemsMap, errorsMap, processedItemIds);
        successfulItems && processSuccessfulItems(successfulItems, itemsMap, errorsMap);
        reducedItems && processReducedItems(reducedItems, itemsMap, errorsMap, processedItemIds);

        // Convert the Map back to arrays
        state.items = Array.from(itemsMap.values());
        state.stockValidationErrors = Array.from(errorsMap.values());
    }

    if (actionType === ActionTypes.INITIALIZE_CHECKOUT) {
        if (checkoutSessionExpiresAt) {
            state.checkoutSessionExpiresAt = checkoutSessionExpiresAt
        }
        console.log('checkoutSessionExpiryDate', checkoutSessionExpiresAt)
    }
    // Update the state status based on the action type
    state.status = actionType === 'validateCartItems' ? 'validated' : 'checkoutInitialized';
};



export const handleRejected = (state, action) => {
    console.log(action.payload)
    toast.error(action.payload || action.error.message)

    state.status = 'failed';
};