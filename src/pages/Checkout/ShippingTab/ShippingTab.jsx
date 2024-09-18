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
    console.log('reduxStoredShippingInfo', reduxStoredShippingInfo)
    const [email, setEmail] = useState('');
    // console.log('fetched session storage shipping info', sessionStoredShippingInfo)
    const elements = useElements()

    const [isStripeReady, setIsStripeReady] = useState(false);

    // console.log(reduxStoredShippingInfo)



    const formItems = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.firstName || '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.lastName || '',

        },

        {
            name: 'addressLine1',
            label: 'Address Line 1',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.addressLine1 || '',
        },


        {
            name: 'addressLine2',
            label: 'Address Line 2(Optional)',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.addressLine2 || '',
        },
        {
            name: 'country',
            label: 'Country',
            as: 'country-selector',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.country || '',
        },

        {
            name: 'state',
            label: 'State',
            as: 'state-selector',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.state || '',
        },
        {
            name: 'city',
            label: 'City',
            as: 'city-selector',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.city || '',
        },
        {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.postalCode || '',
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.phoneNumber || '',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            initialValue: reduxStoredShippingInfo?.email || '',
        },
    ];
    const [filledShippingInfo, setFilledShippingInfo] = useState({})
    useEffect(() => {
        'filledShippingInfo', filledShippingInfo
    }, [filledShippingInfo])

    const [isSubmitting, setIsSubmitting] = useState(false)
    // fetch from sessionStorage if available


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

    const handleShippingSubmit = async () => {
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
    const [errorWhileSubmittingForm, setErrorSubmittingForm] = useState(null);
    // console.log(errorWhileSubmittingForm)
    // useEffect(() => {
    //     console.log('Error fetching couriers', errorWhileSubmittingForm);
    // }, [errorWhileSubmittingForm])


    const handleReset = () => {
        console.log('clicked')
        const addressElement = elements.getElement(AddressElement)
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
                        <input type='text' value={email} defaultValue={user?.email || ''} name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                }

                <AddressElement options={{ mode: 'shipping', defaultValues: reduxStoredShippingInfo }} onChange={(event) => {
                    setFilledShippingInfo(event.value)
                }} onReady={() => setIsStripeReady(true)} />

                <div className="reset" onClick={handleReset}><Close fontSize='small' />Reset form</div>



                {isStripeReady && <CTAButton isSubmitting={isSubmitting} type='submit' disabled={isSubmitting} onClick={() => handleShippingSubmit()} buttonText='Continue' />}

                {/* <button onClick={handlePayment} className='cta-button'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div>
    )
}

export default ShippingTab