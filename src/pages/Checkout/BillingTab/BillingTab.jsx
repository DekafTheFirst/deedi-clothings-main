import React, { useEffect, useState } from 'react'
import './BillingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { nextStep, setRates, setShippingInfo } from '../../../redux/checkoutReducer';
import { makeRequest } from '../../../makeRequest';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const BillingTab = () => {

    const shippingInfo = useSelector(state => state.checkout.shippingInfo);
    const [retryAttempt, setRetryAttempt] = useState(0);


    // console.log('shipping info', shippingInfo)
    const formItems = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: '',
            initialValue: shippingInfo.firstName || '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: '',
            initialValue: shippingInfo.lastName || '',

        },

        {
            name: 'addressLine1',
            label: 'Address Line 1',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: shippingInfo.addressLine1 || '',
        },


        {
            name: 'addressLine2',
            label: 'Address Line 2(Optional)',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: shippingInfo.addressLine2 || '',
        },
        {
            name: 'country',
            label: 'Country',
            as: 'country-selector',
            type: 'text',
            placeholder: '',
            initialValue: shippingInfo.country || '',
        },

        {
            name: 'state',
            label: 'State',
            as: 'state-selector',
            type: 'text',
            placeholder: '',
            initialValue: shippingInfo.state || '',
        },
        {
            name: 'city',
            label: 'City',
            as: 'city-selector',
            type: 'text',
            placeholder: '',
            initialValue: shippingInfo.city || '',
        },
        {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: '',
            initialValue: shippingInfo.postalCode || '',
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: '',
            initialValue: shippingInfo.phoneNumber || '',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            initialValue: shippingInfo.email || '',
        },
    ];


    const arraysEqual = (arr1, arr2) => _.isEqual(arr1, arr2);
    const items = useSelector(state => state.cart.cartItems);
    // console.log(items)
    const currentStep = useSelector(state => state.cart.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);

    const dispatch = useDispatch()


    const requestRates = async (filledShippingInfo, setSubmitting) => {

        try {
            window.scrollTo(0, 0);

            const itemsWithDimensions = items.map(item => ({
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
            dispatch(setShippingInfo(filledShippingInfo))
            dispatch(setRates(response.data))
            dispatch(nextStep())
            console.log('Fetched couriers:', response.data);
        } catch (error) {
            setErrorSubmittingForm(error)
        } finally {
            setSubmitting(false);
        }
    }

    const handleShippingSubmit = async (filledShippingInfo, { setSubmitting }) => {
        if (previewedStep) {
            console.log('currently previewing')
            const infoIsChanged = !arraysEqual(filledShippingInfo, shippingInfo);
            console.log('is info changed?', infoIsChanged)
            console.log('filledShippingInfo', filledShippingInfo)
            console.log('initialValues ', shippingInfo)

            if (infoIsChanged) {
                await requestRates(filledShippingInfo, setSubmitting)
            }
            else {
                dispatch(nextStep())
                setSubmitting(false);
            }
        }
        else {
            await requestRates(filledShippingInfo, setSubmitting)
        }

    };


    // Error Handling
    const [errorWhileSubmittingForm, setErrorSubmittingForm] = useState(null);

    useEffect(() => {
        console.log('Error fetching couriers', errorWhileSubmittingForm);
    }, [errorWhileSubmittingForm])



    const [sameAsShippingAddress, setSameAsShippingAddress] = useState(true);
    // const handleToggleSameShippingAddress = () => {
    //     console.log('changed')
    // };


    return (
        <div className="billing-tab">

            <div className="top">
                <h6 className="tab-title"> Billing Address</h6>
                <p>Enter your billing details to complete your purchase.</p>
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}
                <div class="options">
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
                    !sameAsShippingAddress && <FormComponent
                        formItems={formItems}
                        countryData={shippingInfo.countryData && shippingInfo.countryData}
                        stateData={shippingInfo.stateData && shippingInfo.stateData}
                        cityData={shippingInfo.cityData && shippingInfo.cityData}
                        handleSubmit={handleShippingSubmit}
                        errorWhileSubmittingForm={errorWhileSubmittingForm}
                    >
                    </FormComponent>
                }


                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div>
    )
}

export default BillingTab