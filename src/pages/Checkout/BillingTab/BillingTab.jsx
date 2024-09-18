import React, { useEffect, useMemo, useState } from 'react'
import './BillingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { nextStep, setBillingInfo, setClientSecret, setRates } from '../../../redux/checkout/checkoutReducer';
import { makeRequest } from '../../../makeRequest';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Checkbox, CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { selectItemsByStock } from '../../../redux/cart/cartReducer';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CTAButton from '../../../components/CTAButton/CTAButton';

const BillingTab = ({ totalAmount }) => {
    const dispatch = useDispatch()
    const { shippingInfo, billingInfo, selectedCourierId, checkoutSessionExpiresAt } = useSelector(state => state.checkout);
    const stripe = useStripe();
    const [isStripeReady, setIsStripeReady] = useState(false);

    const elements = useElements();
    const navigate = useNavigate()



    const { inStockItems } = useSelector(selectItemsByStock);
    // const items = useSelector(state => state.cart.items);





    const [sameAsShippingAddress, setSameAsShippingAddress] = useState(true);


    // console.log(billingInfo)



    const formItems = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: '',
            initialValue: billingInfo?.firstName || '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: '',
            initialValue: billingInfo?.lastName || '',

        },

        {
            name: 'addressLine1',
            label: 'Address Line 1',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: billingInfo?.addressLine1 || '',
        },


        {
            name: 'addressLine2',
            label: 'Address Line 2(Optional)',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: billingInfo?.addressLine2 || '',
        },
        {
            name: 'country',
            label: 'Country',
            as: 'country-selector',
            type: 'text',
            placeholder: '',
            initialValue: billingInfo?.country || '',
        },

        {
            name: 'state',
            label: 'State',
            as: 'state-selector',
            type: 'text',
            placeholder: '',
            initialValue: billingInfo?.state || '',
        },
        {
            name: 'city',
            label: 'City',
            as: 'city-selector',
            type: 'text',
            placeholder: '',
            initialValue: billingInfo?.city || '',
        },
        {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: '',
            initialValue: billingInfo?.postalCode || '',
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: '',
            initialValue: billingInfo?.phoneNumber || '',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            initialValue: billingInfo?.email || '',
        },
    ];

    const countryData = billingInfo?.countryData;
    const stateData = billingInfo?.stateData;
    const cityData = billingInfo?.cityData;



    console.log()
    const arraysEqual = (arr1, arr2) => _.isEqual(arr1, arr2);
    // console.log(items)


    const handleReset = (resetForm) => {
        if (billingInfo) {
            dispatch(setBillingInfo({}))
        }

        resetForm({
            values: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                cityData: null,
                state: '',
                stateData: null,
                country: '',
                countryData: null,
                postalCode: '',
            }
        })
    }

    // Error Handling

    // useEffect(() => {
    //     console.log('Error fetching couriers', errorWhileSubmittingForm);
    // }, [errorWhileSubmittingForm])



    const handleToggleSameShippingAddress = () => {
        setSameAsShippingAddress(prev => !prev)
    }


    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState();



    const handleError = (error) => {
        setIsProcessing(false);
        setErrorMessage(error.message);
    }


    const createPaymentIntent = async (e) => {
        e.preventDefault();

        // Step 0: Pre-checks
        if (inStockItems.length === 0) {
            toast.error('No items in stock.');
            return;
        }

        if (!stripe || !elements) {
            toast.error('Stripe.js or Elements not loaded.');
            return;
        }

        setIsProcessing(true);

        // Step 1: Submit form fields through Stripe Elements
        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                console.error('Form validation error:', submitError);
                toast.error(`Form error: ${submitError.message}`);
                setIsProcessing(false);
                return;
            }
        } catch (err) {
            console.error('Form submission error:', err);
            toast.error('Error submitting form. Please try again.');
            setIsProcessing(false);
            return;
        }

        const paymentElement = elements.getElement('payment');
        // const billingDetails = paymentElement.getValue(); // Extract the data from the element
        console.log('Billing Details:', paymentElement);

        if (!paymentElement) {
            toast.error('Payment element not found.');
            setIsProcessing(false);
            return;
        }


        // Step 2: Request PaymentIntent from the server (backend)
        let clientSecret;
        try {
            const { data } = await makeRequest.post('/orders', {
                items: inStockItems,
                totalAmount,
                shippingInfo,
            });

            if (data?.paymentAlreadySucceeded) {
                toast.warning('Duplicate Payment Detected. Payment already succeeded.');
                navigate('/my-account/orders')
                setIsProcessing(false);
                return;
            }

            clientSecret = data.clientSecret; // Save for further use
            if (!clientSecret) {
                throw new Error('No clientSecret received from backend.');
            }
        } catch (err) {
            if (err.response?.status === 410 && err.response?.data?.error?.name === 'GoneError') {
                toast.error('Checkout session has expired. Redirecting to cart...');
                navigate('/cart');
            } else {
                console.error('Error creating payment intent:', err);
                toast.error('Error creating payment. Please try again.');
            }
            setIsProcessing(false);
            return;
        }

        // Step 3: Confirm Payment using the clientSecret
        try {
            const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
                clientSecret,
                elements,
                confirmParams: {
                    payment_method_data: {

                    },
                    return_url: `${window.location.origin}/checkout-success`,
                },
            });

            if (paymentError) {
                console.error('Payment confirmation error:', paymentError);
                setErrorMessage(paymentError.message)
                // Handle additional authentication (3D Secure, etc.)
                if (paymentError.payment_intent?.status === 'requires_action') {
                    try {
                        const { error: handleError } = await stripe.handleCardAction(paymentError.payment_intent.client_secret);

                        if (handleError) {
                            console.error('Error handling 3D Secure:', handleError);
                            toast.error(`3D Secure authentication failed: ${handleError.message}`);
                            return;
                        }

                        // Re-check payment intent status after 3D Secure
                        const { paymentIntent: updatedPaymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
                        if (updatedPaymentIntent.status === 'succeeded') {
                            toast.success('Payment succeeded after 3D Secure!');
                        } else {
                            console.error('Payment failed after 3D Secure:', updatedPaymentIntent.status);
                            toast.error(`Payment failed: ${updatedPaymentIntent.status}`);
                        }
                    } catch (err) {
                        console.error('Error handling card action:', err);
                        toast.error('Error during additional authentication. Please try again.');
                    }
                } else {
                    toast.error(`Payment failed: ${paymentError.message}`);
                }
            } else if (paymentIntent.status === 'succeeded') {
                toast.success('Payment succeeded!');
                // Redirect to success page or update UI
            } else {
                console.error('Unexpected payment status:', paymentIntent.status);
                toast.error(`Unexpected payment status: ${paymentIntent.status}`);
            }
        } catch (err) {
            console.error('Error confirming payment:', err);
            toast.error('Payment confirmation error. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };



    useState(() => {
        console.log('isProcessing', isProcessing)
    }, [isProcessing])







    return (
        <form className="billing-tab">

            <div className="top">
                {/* <h6 className="tab-title"> Billing Address</h6> */}
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}
                {<PaymentElement
                    onReady={()=>setIsStripeReady(true)}
                options={{
                    layout: {
                        type: 'accordion',
                        defaultCollapsed: false,
                        radios: true,
                        spacedAccordionItems: false
                    },

                    fields: {
                        billingDetails: 'auto'
                    },
                }} />
                }

                {/* {stripe && elements &&
                    <div
                        className={`option-item`}
                    >
                        <input
                            type="checkbox"
                            checked={sameAsShippingAddress}
                            onChange={handleToggleSameShippingAddress}
                            className='checkbox'
                        />

                        <p className="text" onClick={handleToggleSameShippingAddress}>
                            Same as shipping address
                        </p>
                    </div>} */}
                {/* <button onClick={handlePayment} className='cta-button'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
                {/* 
                {!sameAsShippingAddress && <AddressElement options={{ mode: 'billing' }} />} */}


                {isStripeReady ? <CTAButton onClick={createPaymentIntent} isSubmitting={isProcessing} disabled={isProcessing} buttonText={errorMessage ? 'Try Again' : 'Place Order'} /> : <CircularProgress size={24} className='loading-indicator'/>}
                {errorMessage && <div id="error-message">{errorMessage}</div>}
            </div>

        </form>
    )
}

export default BillingTab