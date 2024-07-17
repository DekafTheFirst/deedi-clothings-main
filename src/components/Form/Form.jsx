import React, { useEffect, useState } from 'react';
import './Form.scss';
import { ErrorMessage, Form, Formik } from 'formik';
import InputField from '../InputField/InputField';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios'; // Import axios for making HTTP requests
import { useSelector } from 'react-redux';
import * as yup from "yup";

const FormComponent = ({ }) => {
    const countries = countryList().getData();

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

    ]

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last Name is required'),
        email: yup.string().email().required('Email is required'),
        phoneNumber: yup.string().matches(
            /^(\+\d{1,3})?(\d{10,14})$/, // Regex for phone number with or without country code
            'Invalid phone number'
        ).required('Phone Number is required'),
        addressLine1: yup.string().required('Street address is required'),
        addressLine2: yup.string(),
        city: yup.string().required('City is required'),
        postalCode: yup.string().required('Postal code is required'),
        state: yup.string().required('State is required'),
        country: yup.string().required('Country is required'),

    })

    const items = useSelector(state => state.cart.cartItems);
    console.log(items)

    const initialValues = Object.fromEntries(formItems.map(item => [item.name, item.initialValue]))

    // const handleShippingSubmit = async (values) => {
    //     try { console.log('Submitting form with values:', values); }
    //     catch (error) { console.log(error) }
    //     // try {
    //     //     // Replace this URL with your actual API endpoint for fetching couriers
    //     //     const response = await axios.post('/api/couriers', { address: values }); // Adjust 'address' to match your API's expected payload
    //     //     const couriers = response.data.rates; // Assuming response.data contains couriers data
    //     //     console.log('Fetched couriers:', couriers);

    //     //     // Handle further actions with fetched couriers (e.g., updating state)
    //     // } catch (error) {
    //     //     console.error('Error fetching couriers', error);
    //     //     // Handle error state or display error message to user
    //     // } finally {
    //     //     setSubmitting(false); // Ensure form submission state is properly managed
    //     // }
    // };


    const handleShippingSubmit = async (address, { setSubmitting }) => {
        console.log(address)
        try {
            const itemsWithDimensions = items.map(item => ({
                ...item,
                length: 40, // Replace with actual value from item
                width: 14, // Replace with actual value from item
                height: 1, // Replace with actual value from item
                weight: 1.5, // Replace with actual value from item
            }));
            const response = await axios.post('http://localhost:1337/api/orders/couriers', { address, items: itemsWithDimensions });
            // const couriers = response.data.rates;
            console.log('Fetched couriers:', response.data);
        } catch (error) {
            console.error('Error fetching couriers', error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Formik
            initialValues={{ ...initialValues }}
            onSubmit={handleShippingSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, setSubmitting, errors, values, touched, setFieldValue, handleBlur }) => {
                return (
                    <Form className='form-component'>
                        <div className="items">
                            {formItems.map((item) => (
                                <InputField
                                    key={item.name}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    as={item.as}
                                    touched={touched[item.name]}
                                    error={errors[item.name]}
                                    customInputName={item.customInputName}
                                />
                            ))}

                            <div className="input-item">
                                <span className='label'>Country:</span>
                                <Select
                                    name="country"
                                    options={countries}
                                    value={countries.find(option => option.value === values.country)}
                                    onChange={option => setFieldValue('country', option.value)}
                                    onBlur={handleBlur}
                                />
                                <div className="error-message-container">
                                    <ErrorMessage name="country" component='span' className='error' />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-1 submit-btn" disabled={isSubmitting} >
                            Save & Continue
                        </button>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default FormComponent;
