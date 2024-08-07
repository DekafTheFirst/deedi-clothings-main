export const transformCartItems = (items) => {
    return items.map(item => {
        return {
            productId: item.product.id,
            localCartItemId: item.localCartItemId,
            strapiCartItemId: item.id, // or any other unique identifier
            title: item.product.title,
            desc: "description", // Update this with actual description if available
            quantity: item.quantity,
            img: item.product.img[0].url,
            size: item.size,
            price: item.price,
            discountedPrice: item.discountedPrice
        }
    });
};