// utils/itemUtils.js
export const splitItemsByStock = (items) => {
    const inStockItems = [];
    const outOfStockItems = [];
    const reducedItems = [];

    items.forEach(item => {
        if (item.outOfStock) {
            outOfStockItems.push(item);
        }
        else if (item.reduced) {
            reducedItems.push(item);
        }
        else {
            inStockItems.push(item);
        }
    });



    return { inStockItems: [...reducedItems, ...inStockItems], outOfStockItems, reducedItems };
};
