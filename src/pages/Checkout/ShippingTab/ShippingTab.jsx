import React, {  useState } from 'react'
import './ShippingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { nextStep, setRates, setShippingInfo } from '../../../redux/checkout/checkoutReducer';
import { makeRequest } from '../../../makeRequest';

const ShippingTab = () => {
    const dispatch = useDispatch()
    const reduxStoredShippingInfo = useSelector(state => state.checkout.shippingInfo);


    // console.log('fetched session storage shipping info', sessionStoredShippingInfo)



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

    const countryData = reduxStoredShippingInfo?.countryData || null;
    const stateData = reduxStoredShippingInfo?.stateData || null;
    const cityData = reduxStoredShippingInfo?.cityData || null;


    // fetch from sessionStorage if available


    const [retryAttempt, setRetryAttempt] = useState(0);


    // console.log('shipping info', reduxStoredShippingInfo)



    const arraysEqual = (arr1, arr2) => _.isEqual(arr1, arr2);
    const items = useSelector(state => state.cart.items);
    // console.log(items)
    const currentStep = useSelector(state => state.cart.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);



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
            dispatch(setRates(response.data.data.rates))
            dispatch(nextStep())
            console.log('Fetched couriers:', response.data);
        } catch (error) {
            setErrorSubmittingForm(error)
        } finally {
            setSubmitting(false);
        }
    }

    const handleShippingSubmit = async (filledShippingInfo, { setSubmitting }) => {
        if (items.length > 0) {
            if (previewedStep) {
                console.log('currently previewing')
                const infoIsChanged = !arraysEqual(filledShippingInfo, reduxStoredShippingInfo);
                console.log('is info changed?', infoIsChanged)
                console.log('filledShippingInfo', filledShippingInfo)
                console.log('initialValues ', reduxStoredShippingInfo)

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
        }
        else {
            setErrorSubmittingForm({ response: { status: 'no-items' } });
        }

    };

    // Handle Reset
    const handleReset = (resetForm) => {
        if (reduxStoredShippingInfo) {
            dispatch(setShippingInfo(null))
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
    const [errorWhileSubmittingForm, setErrorSubmittingForm] = useState(null);
    // console.log(errorWhileSubmittingForm)
    // useEffect(() => {
    //     console.log('Error fetching couriers', errorWhileSubmittingForm);
    // }, [errorWhileSubmittingForm])





    return (
        <div className="shipping-tab">
            <div className="top">
                <h6 className="tab-title"> Shipping Address</h6>
                <p>Enter your shipping details for delivery.</p>
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}

                <FormComponent
                    formItems={formItems}
                    countryData={countryData}
                    stateData={stateData}
                    cityData={cityData}
                    handleSubmit={handleShippingSubmit}
                    errorWhileSubmittingForm={errorWhileSubmittingForm}
                    handleReset={handleReset}
                >
                </FormComponent>


                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div>
    )
}

export default ShippingTab