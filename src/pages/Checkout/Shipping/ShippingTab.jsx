import React from 'react'
import './ShippingTab.scss'
import FormComponent from '../../../components/Form/Form'
import * as yup from "yup";
import { useSelector } from 'react-redux';

const ShippingTab = () => {
    const shippingInfo = useSelector(state => state.checkout.shippingInfo);
    
    const formItems = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: '',
            initialValue: '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'addressLine1',
            label: 'Address Line 1',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: ''
        },
        
        {
            name: 'addressLine2',
            label: 'Address Line 2(Optional)',
            type: 'text',
            as: 'custom',
            customInputName: 'addressLine',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'city',
            label: 'City',
            type: 'text',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'state',
            label: 'State',
            type: 'text',
            placeholder: '',
            initialValue: ''
        },
        {
            name: 'country',
            label: 'Country',
            type: 'text',
            placeholder: '',
            initialValue: ''
        },

    ]

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last Name is required'),
        email: yup.string().email().required('Email is required'),
        phoneNumber: yup.string().matches(
            /^(\+\d{1,3})?(\d{10,14})$/, // Regex for phone number with or without country code
            'Invalid phone number'
        ).required('Phone Number is required'),
        details: yup.string().required('Please fill in the details'),
        addressLine1: yup.string().required('Street address is required'),
        addressLine2: yup.string(),

    })

    return (
        <div className="shipping-tab">

            <div className="top">
                <h6 className="tab-title"> Shipping Address</h6>
                <p>Enter your shipping details for delivery.</p>
            </div>

            <div className="checkout">
                {/* <CourierOptions /> */}

                <FormComponent
                    items={formItems}
                    validationSchema={validationSchema}
                    submitBtnText="Save & Continue"

                >
                </FormComponent>


                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
            </div>

        </div>
    )
}

export default ShippingTab