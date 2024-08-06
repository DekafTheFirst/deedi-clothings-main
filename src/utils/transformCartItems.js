export const transformCartItems = (items) => {
    return items.map(item => ({
        productId: item.attributes.product.data.id,
        localCartItemId: item.attributes.localCartItemId,
        strapiCartItemId: item.id, // or any other unique identifier
        title: item.attributes.product.data.attributes.title,
        desc: "description", // Update this with actual description if available
        quantity: item.attributes.quantity,
        img: item.attributes.product.data.attributes.img.data[0].attributes.url,
        size: item.attributes.size,
        price: item.attributes.product.data.attributes.price
    }));
};