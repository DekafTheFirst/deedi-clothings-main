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

const BillingTab = ({ totalAmount }) => {
    const dispatch = useDispatch()
    const { shippingInfo, billingInfo, selectedCourierId, checkoutSessionExpiresAt } = useSelector(state => state.checkout);
    const stripe = useStripe();
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
            dispatch(setBillingInfo(null))
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
        console.log('Place order')

        if (inStockItems.length > 0) {
            if (!stripe) {
                // Stripe.js hasn't yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
            }
            try {
                setIsProcessing(true)

                const { error: submitError } = await elements.submit();
                if (submitError) {
                    handleError(submitError);
                    return;
                }

                const res = await makeRequest.post('/orders', {
                    items: inStockItems,
                    billingInfo,
                    totalAmount,
                    // customerEmail: billingInfo.email,
                })
                // .catch((error) => {
                //     // setErrorSubmittingForm(error)
                //     toast.error('Checkout session expired, please try again')
                //     navigate('/cart')
                //     console.log('Error creating payment intent', error)
                //     return
                // });
                console.log(res)


                console.log('res', res);

                if (res?.data?.payemtnAlreadySucceeded === true) {
                    toast.warning('Duplicate Payment Detected');
                    return
                }

                dispatch(setBillingInfo(billingInfo));

                // setClientSecret(res.data.clientSecret)
                // dispatch(payment)
                // const result = await stripe.redirectToCheckout({
                //     sessionId: res.data.sessionId,
                // });

                // console.log(result)
                const { error } = await stripe.confirmPayment({
                    clientSecret: res.data.clientSecret,
                    elements,
                    confirmParams: {
                        // Make sure to change this to your payment completion page
                        return_url: `${window.location.origin}/checkout-success`,
                    },
                });

                if (error.type === "card_error" || error.type === "validation_error") {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occured.");
                }
            } catch (err) {
                // setLoading(false)
                // setErrorSubmittingForm({ response: { status: 'no-items' } });

                console.error('Payment processing error:', err);
                // alert('An error occurred during the payment process. Please try again later or disable your ad blocker if it is enabled.');
            }
        }
        else {
            // setErrorSubmittingForm()
        }
        createPaymentIntent()

        setIsProcessing(false);
    };

    useState(() => {
        console.log('isProcessing', isProcessing)
    }, [isProcessing])







    return (
        <form className="billing-tab" onSubmit={createPaymentIntent}>

            <div className="top">
                {/* <h6 className="tab-title"> Billing Address</h6> */}
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}
                {<PaymentElement options={{
                    layout: {
                        type: 'accordion',
                        defaultCollapsed: false,
                        radios: true,
                        spacedAccordionItems: false
                    }
                }} />
                }

                {stripe && elements &&
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
                    </div>}
                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}

                {!sameAsShippingAddress && <AddressElement options={{ mode: 'billing' }} />}

                <button className="btn-1 submit-btn" type='submit' disabled={isProcessing}  >
                    {isProcessing ? <CircularProgress size={16} sx={{ color: 'white' }} /> : 'Place Order'}
                </button>
                {errorMessage && <div id="payment-message">{errorMessage}</div>}
            </div>

        </form>
    )
}

export default BillingTab