import React, { useEffect, useState } from 'react'
import './ShippingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { nextStep, setRates, setShippingInfo } from '../../../redux/checkout/checkoutReducer';
import { makeRequest } from '../../../makeRequest';
import { selectItemsByStock } from '../../../redux/cart/cartReducer';
import { AddressElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Close } from '@mui/icons-material';
import CTAButton from '../../../components/CTAButton/CTAButton';

const ShippingTab = () => {
    const dispatch = useDispatch()
    const reduxStoredShippingInfo = useSelector(state => state.checkout.shippingInfo);
    const user = useSelector(state => state.auth.user)
    // console.log('reduxStoredShippingInfo', reduxStoredShippingInfo)
    const [email, setEmail] = useState(reduxStoredShippingInfo?.email || user?.email);
    const [emailError, setEmailError] = useState('');
    const elements = useElements();
    const stripe = useStripe();

    const addressElement = elements?.getElement(AddressElement)

    const [isAddressComplete, setIsAddressComplete] = useState(false);

    const [isStripeReady, setIsStripeReady] = useState(false);

    // console.log(reduxStoredShippingInfo)

    const [filledShippingInfo, setFilledShippingInfo] = useState({})
    useEffect(() => {
        'filledShippingInfo', filledShippingInfo
    }, [filledShippingInfo])

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorWhileSubmittingForm, setErrorSubmittingForm] = useState(null);


    const [retryAttempt, setRetryAttempt] = useState(0);


    // console.log('shipping info', reduxStoredShippingInfo)



    const arraysEqual = (arr1, arr2) => _.isEqual(arr1, arr2);
    const { inStockItems } = useSelector(selectItemsByStock);
    // console.log(inStockItems)
    const currentStep = useSelector(state => state.cart.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);



    const requestRates = async () => {

        try {
            window.scrollTo(0, 0);

            const itemsWithDimensions = inStockItems.map(item => ({
                ...item,
                length: 40, // Replace with actual value from item
                width: 14, // Replace with actual value from item
                height: 1, // Replace with actual value from item
                weight: 1.5, // Replace with actual value from item
            }));
            const response = await makeRequest.post(`/orders/couriers`, {
                address: filledShippingInfo,
                items: itemsWithDimensions
            });
            // const couriers = response.data.rates;
            dispatch(setShippingInfo({ email, ...filledShippingInfo }))
            dispatch(setRates(response.data.data.rates))
            dispatch(nextStep())
            console.log('Fetched couriers:', response.data);
        } catch (error) {
            setErrorSubmittingForm(error)
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleShippingSubmit = async (e) => {
        e.preventDefault();

        if (!isAddressComplete) {
            setErrorSubmittingForm("Please complete your address details before submitting.");
            return;
        }

        if (emailError || !validateEmail(email)) {
            setErrorSubmittingForm("Please provide a valid email address.");
            return;
        }

        if (!stripe || !elements) {
            return;
        }


        setIsSubmitting(true)

        if (inStockItems.length > 0) {
            if (previewedStep) {
                console.log('currently previewing')
                const infoIsChanged = !arraysEqual(filledShippingInfo, reduxStoredShippingInfo);
                console.log('is info changed?', infoIsChanged)
                console.log('filledShippingInfo', filledShippingInfo)
                console.log('initialValues ', reduxStoredShippingInfo)

                if (infoIsChanged) {
                    await requestRates(filledShippingInfo)
                }

                else {
                    dispatch(nextStep())
                    setIsSubmitting(false);
                }
            }
            else {
                await requestRates(filledShippingInfo)
            }

        }
        else {
            setErrorSubmittingForm({ response: { status: 'no-items' } });
        }
        setIsSubmitting(false)
    };

    // Handle Reset


    // Error Handling
    // console.log(errorWhileSubmittingForm)
    // useEffect(() => {
    //     console.log('Error fetching couriers', errorWhileSubmittingForm);
    // }, [errorWhileSubmittingForm])


    const handleReset = () => {
        console.log('clicked')
        if (reduxStoredShippingInfo) {
            dispatch(setShippingInfo({}))
        }
        addressElement.clear()
        setEmail('')
        setFilledShippingInfo({})
    }


    return (
        <div className="shipping-tab">
            <div className="top">
                <h6 className="tab-title"> Shipping Address</h6>
                <p>Enter your shipping details for delivery.</p>
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}

                {/* <FormComponent
                    formItems={formItems}
                    countryData={countryData}
                    stateData={stateData}
                    cityData={cityData}
                    handleSubmit={handleShippingSubmit}
                    errorWhileSubmittingForm={errorWhileSubmittingForm}
                    handleReset={handleReset}
                >
                </FormComponent> */}
                {isStripeReady &&
                    <div className="stripe-input-lookalike">
                        <label htmlFor="email">Email</label>
                        <input type='text' value={email} name="email" placeholder="Email" onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            if (!validateEmail(value)) {
                                setEmailError('Please enter a valid email address.');
                            } else {
                                setEmailError('');
                            }
                        }} />
                        {emailError && <span className='error'>{emailError}</span>}
                    </div>
                }

                <AddressElement options={{ mode: 'shipping', defaultValues: reduxStoredShippingInfo }} onChange={(event) => {
                    setFilledShippingInfo(event.value)
                    setIsAddressComplete(event.complete)
                }} onReady={() => setIsStripeReady(true)} />

                {isStripeReady && < div className="reset" onClick={handleReset}><Close fontSize='small' />Reset form</div>}
                {errorWhileSubmittingForm && <span className="error">{errorWhileSubmittingForm}</span> }
                {isStripeReady && <CTAButton isSubmitting={isSubmitting} type='submit' disabled={isSubmitting} onClick={handleShippingSubmit} buttonText='Continue' />}

                {/* <button onClick={handlePayment} className='cta-button'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div >
    )
}

export default ShippingTab