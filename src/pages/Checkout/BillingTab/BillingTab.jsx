import React, { useEffect, useMemo, useState } from 'react'
import './BillingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { nextStep, setBillingInfo, setRates } from '../../../redux/checkout/checkoutReducer';
import { makeRequest } from '../../../makeRequest';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { selectItemsByStock } from '../../../redux/cart/cartReducer';

const BillingTab = ({ totalAmount }) => {

    const dispatch = useDispatch()
    const { shippingInfo, billingInfo, selectedCourierId, checkoutSessionExpiresAt } = useSelector(state => state.checkout);




    const { inStockItems } = useSelector(selectItemsByStock);
    // const items = useSelector(state => state.cart.items);





    const [sameAsShippingAddress, setSameAsShippingAddress] = useState(true);
    const [errorWhileSubmittingForm, setErrorSubmittingForm] = useState(null);
    const [orderingWithShippingInfo, setOrderingWithShippingInfo] = useState(false);


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



    // const handleToggleSameShippingAddress = () => {
    //     console.log('changed')
    // };


    const [loading, setLoading] = useState(false)



    const handlePlaceOrder = async (billingInfo) => {
        const stripePromise = loadStripe('pk_test_51OzQqiP8nMwtf7KwjeDBvSrJh0QU2AMmJncITWpVrXW9Cm8XesZc1MqofLogMUrphlOB0exTEsHSQ91mJoA5V94u00JrVmVkWL');

        if (inStockItems.length > 0) {
            try {
                setLoading(true)
                const stripe = await stripePromise;

                const res = await makeRequest.post('/orders', {
                    items: inStockItems,
                    shippingInfo,
                    billingInfo,
                    selectedCourierId,
                    totalAmount,
                    customerEmail: billingInfo.email,
                    checkoutSessionExpiresAt
                }).catch((error) => {
                    setErrorSubmittingForm(error)
                });

                console.log('res', res)
                dispatch(setBillingInfo(billingInfo))
                // dispatch(payment)
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.sessionId,
                });

                console.log(result)
                setLoading(false)

            } catch (err) {
                setLoading(false)
                setErrorSubmittingForm({ response: { status: 'no-items' } });

                console.error('Payment processing error:', err);
                alert('An error occurred during the payment process. Please try again later or disable your ad blocker if it is enabled.');
            }
        }
        else {
            setErrorSubmittingForm()
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