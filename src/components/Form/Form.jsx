import React, { useEffect, useMemo, useState } from 'react';
import './Form.scss';
import { ErrorMessage, Form, Formik, useFormikContext } from 'formik';
import InputField from '../InputField/InputField';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios'; // Import axios for making HTTP requests
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { nextStep, setCurrentStep, setShippingInfo } from '../../redux/checkout/checkoutReducer';
import CircularProgress from '@mui/material/CircularProgress';
import { GetCity, GetCountries, GetState } from 'react-country-state-city/dist/cjs';
import { Close } from '@mui/icons-material';
import CTAButton from '../CTAButton/CTAButton';

const FormComponent = ({ formItems, countryData, stateData, cityData, handleSubmit, handleReset, errorWhileSubmittingForm, retry, submitBtnText }) => {
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



    const initialValuesFromFormItems = { ...Object.fromEntries(formItems.map(item => [item.name, item.initialValue])), countryData, stateData, cityData }
    // console.log('initialValuesFromFormItems', initialValuesFromFormItems)

    const [initialValues, setInitialValues] = useState(initialValuesFromFormItems)

    // useEffect(()=> {
    //     setInitialValues(initialValuesFromFormItems)
    // }, [initialValuesFromFormItems]);

    // console.log(initialValuesFromFormItems)
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

    const [countryList, setCountryList] = useState(null);
    const [stateList, setStateList] = useState(null);
    const [cityList, setCityList] = useState(null);

    const memoizedCountryList = useMemo(() => countryList, [countryList]);
    const memoizedStateList = useMemo(() => stateList, [stateList]);
    const memoizedCityList = useMemo(() => cityList, [cityList]);

    const fetchCountryList = async () => {
        try {
            const countryData = await GetCountries();
            setCountryList(countryData);
            // console.log('fetchingCountryList again')

        } catch (error) {
            console.error('Error fetching country data:', error);
        };
    };

    useEffect(() => {
        fetchCountryList();
    }, []);


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, setSubmitting,  errors, initialValues, values, touched, setFieldValue, handleBlur, handleSubmit, resetForm }) => {

                // useEffect(() => {
                //     console.log('initialValues known inside form', initialValues)
                // }, [initialValues]);

                useEffect(() => {
                    console.log('values:', values);
                    // console.log('errors:', errors);
                }, [values])



                const fetchStateList = async (countryId) => {
                    try {
                        const stateData = await GetState(countryId);
                        setStateList(stateData);

                    } catch (error) {
                        console.error('Error fetching state data:', error);
                    }
                };

                const fetchCityList = async (countryId, stateId) => {
                    // console.log('countryId:', countryId, '\n\nstateId:', stateId);
                    try {
                        const cityList = await GetCity(countryId, stateId);
                        setCityList(cityList);
                    } catch (error) {
                        console.error('Error fetching city data:', error);
                    }
                };

                useEffect(() => {
                    if (values.countryData?.id) {
                        fetchStateList(values.countryData.id);
                    }
                }, [values.countryData]);

                useEffect(() => {
                    if (values.countryData?.id && values.stateData?.id) {
                        fetchCityList(values.countryData?.id, values.stateData?.id);
                    }
                }, [values.stateData]);


                const renderError = (status) => {

                    switch (status) {
                        case 422:
                            return 'Please double-check your shipping info and'
                        case 'no-items': 
                            return 'Please add items to your cart before trying to checkout'
                        default:
                            return 'Something went wrong. Please check your connection and'
                    }
                }

                return (
                    <>{
                        isSubmitting
                            ?
                            <div className="loading-indicator"><CircularProgress /></div>
                            :
                            (
                                <>
                                    <Form className='form-component'>

                                        {errorWhileSubmittingForm && <div className="form-error">{renderError(errorWhileSubmittingForm?.response?.status)} <a className="try-again" onClick={handleSubmit}>try again.</a></div>
                                        }
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
                                                    setFieldValue={setFieldValue}
                                                    value={values[item.name]}
                                                    handleBlur={handleBlur}
                                                    countryList={item.as === 'country-selector' && memoizedCountryList}
                                                    stateList={item.as === 'state-selector' && memoizedStateList}
                                                    cityList={item.as === 'city-selector' && memoizedCityList}
                                                />
                                            ))}
                                        </div>

                                        <div className="reset" onClick={() => handleReset(resetForm)}><Close fontSize='small' />Reset form</div>
                                        
                                        <CTAButton isSubmitting={isSubmitting} onClick={handleSubmit} buttonText={submitBtnText || 'Save & Continue' }/>

                                    </Form>
                                </>
                            )
                    }</>

                )
            }}
        </Formik>
    );
}

export default FormComponent;
