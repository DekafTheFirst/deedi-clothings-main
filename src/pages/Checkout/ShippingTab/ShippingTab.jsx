import React from 'react'
import './ShippingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { nextStep, setShippingInfo } from '../../../redux/checkoutReducer';

const ShippingTab = () => {

    const shippingInfo = useSelector(state => state.checkout.shippingInfo);
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
            const itemsWithDimensions = items.map(item => ({
                ...item,
                length: 40, // Replace with actual value from item
                width: 14, // Replace with actual value from item
                height: 1, // Replace with actual value from item
                weight: 1.5, // Replace with actual value from item
            }));
            const response = await axios.post('http://localhost:1337/api/orders/couriers', { address: filledShippingInfo, items: itemsWithDimensions });
            // const couriers = response.data.rates;
            dispatch(setShippingInfo(filledShippingInfo))
            dispatch(nextStep())
            console.log('Fetched couriers:', response.data);
        } catch (error) {
            console.error('Error fetching couriers', error);
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
                    countryData={shippingInfo.countryData && shippingInfo.countryData}
                    stateData={shippingInfo.stateData && shippingInfo.stateData}
                    cityData={shippingInfo.cityData && shippingInfo.cityData}
                    handleSubmit={handleShippingSubmit}
                >
                </FormComponent>


                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div>
    )
}

export default ShippingTab