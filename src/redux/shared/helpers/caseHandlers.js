
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
    const { validationResults } = action.payload;
    // console.log('actionType', actionType);

    // console.log('validationResults', validationResults)
    // Convert state items and errors to Maps for efficient access

    const itemsMap = new Map(state.items?.map(item => [item.localCartItemId, item]));
    const errorsMap = new Map(state.stockValidationErrors?.map(error => [error.itemId, error]));
    const processedItemIds = new Set();

    // Process each type of item
    const reducedItems = validationResults?.reduced;
    const outOfStockItems = validationResults?.outOfStock;
    const successfulItems = validationResults?.success;

    processOutOfStockItems(outOfStockItems, itemsMap, errorsMap, processedItemIds);
    processSuccessfulItems(successfulItems, itemsMap, errorsMap);
    processReducedItems(reducedItems, itemsMap, errorsMap, processedItemIds);

    // Convert the Map back to arrays
    state.items = Array.from(itemsMap.values());
    state.stockValidationErrors = Array.from(errorsMap.values());

    
    // Update the state status based on the action type
    state.status = actionType === 'validateCartItems' ? 'validated' : 'checkoutInitialized';
};



export const handleRejected = (state, action) => {
    console.log(action.payload)
    toast.error(action.payload || action.error.message)

    state.status = 'failed';
};