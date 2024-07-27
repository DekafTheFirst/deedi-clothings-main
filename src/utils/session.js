export const storeShippingInfoInSession = (shippingInfo) => {
    sessionStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
};

// Retrieve shipping info from session storage
export const getShippingInfoFromSession = () => {
    const shippingInfo = sessionStorage.getItem('shippingInfo');
    // console.log('fetched session storage', shippingInfo)
    return shippingInfo ? JSON.parse(shippingInfo) : null;
};


// Store shipping info in session storage for temporary preservation
export const storeBillingInfoInSession = (billingInfo) => {
    sessionStorage.setItem('billingInfo', JSON.stringify(billingInfo));
};

// Retrieve shipping info from session storage
export const getBilingInfoFromSession = () => {
    const billingInfo = sessionStorage.getItem('billingInfo');
    return billingInfo ? JSON.parse(billingInfo) : null;
};

export const storeSelectedCourier = (selectedCourier) => {
    sessionStorage.setItem('selectedCourier', JSON.stringify(selectedCourier));
};

// Retrieve shipping info from session storage
export const getSelectedCourier = () => {
    const selectedCourier = sessionStorage.getItem('selectedCourier');
    return selectedCourier ? JSON.parse(selectedCourier) : null;
};



