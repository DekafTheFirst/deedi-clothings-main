// utils/itemUtils.js
export const splitItemsByStock = (items) => {
    const inStockItems = [];
    const outOfStockItems = [];
  
    items.forEach(item => {
      if (item.outOfStock) {
        outOfStockItems.push(item);
      } else {
        inStockItems.push(item);
      }
    });
  
    return { inStockItems, outOfStockItems };
  };
  