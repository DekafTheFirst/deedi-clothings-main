// utils/cartSliceUtils.js

import { toast } from "react-toastify";

// Utility function for processing out-of-stock items
export const processOutOfStockItems = (outOfStockItems, itemsMap, errorsMap, processedItemIds) => {
    outOfStockItems.forEach(item => {
        const cartItem = itemsMap.get(item.localCartItemId);
        if (cartItem && !cartItem.outOfStock) {
            // Add or update out-of-stock error
            errorsMap.set(item.localCartItemId, {
                itemId: item.localCartItemId,
                error: `${item.productTitle} (${item.size.size}) is out of stock.`,
                type: 'out-of-stock',
            });

            toast.error(`${item.productTitle} (${item.size.size}) is out of stock.`);

            // Update item status
            itemsMap.set(item.localCartItemId, {
                ...cartItem,
                availableStock: 0,
                outOfStock: true,
                price: item.price,
                discountedPrice: item.discountedPrice,
                title: item.productTitle,
                img: item.img

            });
            processedItemIds.add(item.localCartItemId);
        }
    });
};

// Utility function for processing successful items
export const processSuccessfulItems = (successfulItems, itemsMap, errorsMap) => {
    successfulItems.forEach(item => {
        const cartItem = itemsMap.get(item.localCartItemId);
        if (cartItem) {
            itemsMap.set(item.localCartItemId, {
                ...cartItem,
                price: item.price,
                title: item.productTitle,
                reduced: false,
                reducedBy: null,
                outOfStock: false,
                availableStock: item.availableStock,
            });

            // Remove any related error from errorsMap
            errorsMap.delete(item.localCartItemId);

            // Notify user that product is back in stock
            if (cartItem.availableStock === 0 && item.availableStock > 0) {
                toast.success(`${item.productTitle} (${cartItem.size.size}) is back in stock 🎉.`);

                if (cartItem.quantity > item.availableStock) {
                    cartItem.quantity = item.availableStock;
                }
            }
        }
    });
};

// Utility function for processing reduced items
export const processReducedItems = (reducedItems, itemsMap, errorsMap, processedItemIds) => {
    reducedItems.forEach(item => {
        const cartItem = itemsMap.get(item.localCartItemId);
        if (cartItem) {
            let errorMessage;
            // Check if current quantity is higher than the amount of new available stock
            if (cartItem.availableStock === 0) {
                errorMessage = `${item.productTitle} (${item.size.size}) is now available. Your cart has been updated to match the current stock.`;
                toast.success(errorMessage);
            } else {
                errorMessage = `Quantity of ${item.productTitle} (${item.size.size}) was reduced to ${item.newQuantity} due to insufficient stock.`;
                toast.warning(errorMessage);
            }

            // Add or update reduced-stock error
            errorsMap.set(item.localCartItemId, {
                itemId: item.localCartItemId,
                error: errorMessage,
                type: 'reduced-stock',
            });

            // Update item quantity and stock
            itemsMap.set(item.localCartItemId, {
                ...cartItem,
                quantity: item.newQuantity,
                availableStock: item.availableStock,
                reduced: true,
                reducedBy: item.reducedBy,
                outOfStock: false,
            });
            processedItemIds.add(item.localCartItemId);
        }
    });
};
