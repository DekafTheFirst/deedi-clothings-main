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

export const storeSelectedCourierInSession = (selectedCourier) => {
    sessionStorage.setItem('selectedCourier', JSON.stringify(selectedCourier));
};

// Retrieve shipping info from session storage
export const getSelectedCourierFromSession = () => {
    const selectedCourier = sessionStorage.getItem('selectedCourier');
    return selectedCourier ? JSON.parse(selectedCourier) : null;
};


export const storeCurrentStepInSession = (currentStep) => {
    sessionStorage.setItem('currentStep', JSON.stringify(currentStep));
};

// Retrieve shipping info from session storage
export const getCurrentStepFromSession = () => {
    const currentStep = sessionStorage.getItem('currentStep');
    return currentStep ? JSON.parse(currentStep) : null;
};


export const storeCompletedStepsInSession = (completedSteps) => {
    sessionStorage.setItem('completedSteps', JSON.stringify(completedSteps));
};

// Retrieve shipping info from session storage
export const getCompletedStepsFromSession = () => {
    const completedSteps = sessionStorage.getItem('completedSteps');
    return completedSteps ? JSON.parse(completedSteps) : null;
};



