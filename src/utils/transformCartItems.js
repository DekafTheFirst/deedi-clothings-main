export const transformCartItems = (items) => {
    return items.map(item => {
        return {
            productId: item.product.id,
            localCartItemId: item.localCartItemId,
            strapiCartItemId: item.id, // or any other unique identifier
            title: item.product.title,
            quantity: item.quantity,
            img: item.product.img[0].url,
            size: item.size,
            price: item.product.price,
            discountedPrice: item.discountedPrice
        }
    });
};


export const transformCartItemsOnLogin = (items) => {
    return items.map(item => {
        return {
            productId: item.product.id,
            localCartItemId: item.localCartItemId,
            strapiCartItemId: item.id, // or any other unique identifier
            title: item.product.title,
            quantity: item.quantity,
            img: item.product.img[0].url,
            size: item.size,
            price: item.product.price,
            discountedPrice: item.discountedPrice,
            outOfStock: item.outOfStock,
        }
    });
};




