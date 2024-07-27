import React, { useEffect, useMemo, useState } from 'react'
import './BillingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { nextStep, setBillingInfo, setRates } from '../../../redux/checkoutReducer';
import { makeRequest } from '../../../makeRequest';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { getBilingInfoFromSession, getShippingInfoFromSession } from '../../../utils/session';
import { CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const BillingTab = ({ totalAmount }) => {

    const dispatch = useDispatch()
    const reduxStoredShippingInfo = useSelector(state => state.checkout.shippingInfo);
    const sessionStoredShippingInfo = getShippingInfoFromSession();
    const shippingInfo = reduxStoredShippingInfo || sessionStoredShippingInfo;


    const reduxStoredBillingInfo = useSelector(state => state.checkout.billingInfo);
    const sessionStoredBillingInfo = getBilingInfoFromSession();


    const products = useSelector(state => state.cart.cartItems);
    // const items = useSelector(state => state.cart.cartItems);

    const currentStep = useSelector(state => state.cart.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);


    // console.log('fetched session storage shipping info', sessionStoredBillingInfo)

    const [sameAsShippingAddress, setSameAsShippingAddress] = useState(true);
    const [errorWhileSubmittingForm, setErrorSubmittingForm] = useState(null);
    const [orderingWithShippingInfo, setOrderingWithShippingInfo] = useState(false);


    // console.log(reduxStoredBillingInfo)



    const formItems = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.firstName || sessionStoredBillingInfo?.firstName || '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.lastName || sessionStoredBillingInfo?.lastName || '',

        },

        {
            name: 'addressLine1',
            label: 'Address Line 1',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.addressLine1 || sessionStoredBillingInfo?.addressLine1 || '',
        },


        {
            name: 'addressLine2',
            label: 'Address Line 2(Optional)',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.addressLine2 || sessionStoredBillingInfo?.addressLine2 || '',
        },
        {
            name: 'country',
            label: 'Country',
            as: 'country-selector',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.country || sessionStoredBillingInfo?.country || '',
        },

        {
            name: 'state',
            label: 'State',
            as: 'state-selector',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.state || sessionStoredBillingInfo?.state || '',
        },
        {
            name: 'city',
            label: 'City',
            as: 'city-selector',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.city || sessionStoredBillingInfo?.city || '',
        },
        {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.postalCode || sessionStoredBillingInfo?.postalCode || '',
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.phoneNumber || sessionStoredBillingInfo?.phoneNumber || '',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            initialValue: reduxStoredBillingInfo?.email || sessionStoredBillingInfo?.email || '',
        },
    ];

    const countryData = reduxStoredBillingInfo?.countryData || sessionStoredBillingInfo?.countryData || null;
    const stateData = reduxStoredBillingInfo?.stateData || sessionStoredBillingInfo?.stateData || null;
    const cityData = reduxStoredBillingInfo?.cityData || sessionStoredBillingInfo?.cityData || null;

    console.log()
    const arraysEqual = (arr1, arr2) => _.isEqual(arr1, arr2);
    // console.log(items)








    // const handleOrderWithShippingInfo = async (filledBillingInfo) => {
    //     if (previewedStep) {
    //         // console.log('currently previewing')
    //         const infoIsChanged = !arraysEqual(filledBillingInfo, reduxStoredBillingInfo);
    //         // console.log('is info changed?', infoIsChanged)
    //         // console.log('filledBillingInfo', filledBillingInfo)
    //         // console.log('initialValues ', reduxStoredBillingInfo)

    //         // if (infoIsChanged) {
    //         setOrderingWithShippingInfo(true)
    //         setOrderingWithShippingInfo(false)
    //         // }
    //         // else {
    //         //     // dispatch(nextStep())
    //         // }
    //     }
    //     else {
    //         await requestRates(filledBillingInfo, setSubmitting)
    //         setSubmitting(false)
    //     }

    // };

    // const handleOrderWithBillingInfo = async (filledBillingInfo, { setSubmitting }) => {
    //     if (previewedStep) {
    //         // console.log('currently previewing')
    //         const infoIsChanged = !arraysEqual(filledBillingInfo, reduxStoredBillingInfo);
    //         // console.log('is info changed?', infoIsChanged)
    //         // console.log('filledBillingInfo', filledBillingInfo)
    //         // console.log('initialValues ', reduxStoredBillingInfo)

    //         if (infoIsChanged) {
    //             await requestRates(filledBillingInfo)
    //         }
    //         else {
    //             dispatch(nextStep())
    //             setSubmitting(false);
    //         }
    //     }
    //     else {
    //         await requestRates(filledBillingInfo)
    //         setSubmitting(false)
    //     }

    // };

    const handleReset = (resetForm) => {
        if (reduxStoredBillingInfo, sessionStoredBillingInfo) {
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



    // const handleToggleSameShippingAddress = () => {
    //     console.log('changed')
    // };

    const stripePromise = loadStripe('pk_test_51OzQqiP8nMwtf7KwjeDBvSrJh0QU2AMmJncITWpVrXW9Cm8XesZc1MqofLogMUrphlOB0exTEsHSQ91mJoA5V94u00JrVmVkWL');

    const [loading, setLoading] = useState(false)



    const handlePlaceOrder = async (billingInfo) => {
        try {
            setLoading(true)
            const stripe = await stripePromise;

            const res = await makeRequest.post('/orders', {
                items: products,
                shippingInfo,
                billingInfo,
            }).catch((error) => {
                setErrorSubmittingForm(error)
            });

            dispatch(setBillingInfo(billingInfo))

            if (res.data && res.data.stripeSession) {
                const session = await stripe.redirectToCheckout({
                    sessionId: res.data.stripeSession.id,
                });


                if (error) {
                    console.error('Stripe redirect error:', error.message);
                    alert('Payment processing error. Please try disabling your ad blocker and try again.');
                    setErrorSubmittingForm(error)
                }
            }
            else {
                setErrorSubmittingForm(error)
                throw new Error('Failed to create Stripe session');
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setErrorSubmittingForm(error)

            console.error('Payment processing error:', err);
            alert('An error occurred during the payment process. Please try again later or disable your ad blocker if it is enabled.');
        }
    };




    return (
        <div className="billing-tab">

            <div className="top">
                <h6 className="tab-title"> Billing Address</h6>
                <p>Enter your billing details to complete your purchase.</p>
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}
                <div className="options">
                    <div
                        className={`option-item ${sameAsShippingAddress ? 'selected' : ''}`}
                        onClick={() => setSameAsShippingAddress(true)}
                    >
                        <div className="start">
                            <div className='radio'>{sameAsShippingAddress ? <RadioButtonCheckedIcon fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />}</div>
                        </div>

                        <p className="text">Same as shipping address</p>


                    </div>
                    <div
                        className={`option-item ${!sameAsShippingAddress ? 'selected' : ''}`}
                        onClick={() => setSameAsShippingAddress(false)}
                    >
                        <div className="start">
                            <div className='radio'>{!sameAsShippingAddress ? <RadioButtonCheckedIcon fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />}</div>
                        </div>

                        <p className="text">Use a different billing address</p>
                    </div>
                </div>

                {
                    sameAsShippingAddress ?
                        (
                            <button className="btn-1 submit-btn" disabled={false} onClick={() => handlePlaceOrder(shippingInfo)} >
                                {loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : 'Place Order'}
                            </button>
                        )
                        :
                        (
                            <FormComponent
                                formItems={formItems}
                                countryData={countryData}
                                stateData={stateData}
                                cityData={cityData}
                                handleSubmit={handlePlaceOrder}
                                errorWhileSubmittingForm={errorWhileSubmittingForm}
                                submitBtnText={'Place Order'}
                                handleReset={handleReset}
                            >
                            </FormComponent>
                        )
                }




                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div>
    )
}

export default BillingTab