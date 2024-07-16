import React from 'react';
import './Form.scss';
import { ErrorMessage, Form, Formik } from 'formik';
import InputField from '../InputField/InputField';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios'; // Import axios for making HTTP requests

const FormComponent = ({ items, validationSchema, submitBtnText, children, initialValues }) => {
    const countries = countryList().getData();

    const handleShippingSubmit = async (values, { setSubmitting }) => {
        console.log('Submitting form with values:', values);

        try {
            // Replace this URL with your actual API endpoint for fetching couriers
            const response = await axios.post('/api/couriers', { address: values }); // Adjust 'address' to match your API's expected payload
            const couriers = response.data.rates; // Assuming response.data contains couriers data
            console.log('Fetched couriers:', couriers);

            // Handle further actions with fetched couriers (e.g., updating state)
        } catch (error) {
            console.error('Error fetching couriers', error);
            // Handle error state or display error message to user
        } finally {
            setSubmitting(false); // Ensure form submission state is properly managed
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleShippingSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, setFieldValue, handleBlur, values }) => (
                <Form className='form-component'>
                    {children}
                    <div className="items">
                        {items.map((item) => (
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

                    <button type="submit" className="btn-1 submit-btn" >
                        {submitBtnText ? submitBtnText : 'Submit'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default FormComponent;
