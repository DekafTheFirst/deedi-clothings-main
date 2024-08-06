export const mergeCartItems = (localItems, fetchedItems) => {
    const mergedItems = [...localItems];
    console.log('Local items:', localItems);
    console.log('fetchedItems', fetchedItems)
    console.log('Before merge:', mergedItems);
  
  
    fetchedItems.forEach(fetchedItem => {
      const existingItem = localItems.find(item => item.productId === fetchedItem.productId && item.size === fetchedItem.size);
      if (existingItem) {
        existingItem.quantity += fetchedItem.quantity;
      } else {
        mergedItems.push(fetchedItem);
      }
    });
  
    console.log('After merge:', mergedItems);
  
    return mergedItems;
  };
  