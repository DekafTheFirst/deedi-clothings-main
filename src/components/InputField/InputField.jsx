import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import './InputField.scss';
import { ErrorMessage, Field } from 'formik';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { compose } from 'redux';

const InputField = memo(({ name, label, type, placeholder, as, touched, error, customInputName, values, handleBlur, setFieldValue }) => {
    // const CountrySelector = ({
    //     field, // { name, value, onChange, onBlur }
    //     form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    //     ...props
    // }) => {
    //     const countries = useMemo(() => countryList().getData(), []);

    //     return (

    //     );
    // };

    const [countryId, setCountryId] = useState(null);
    const [stateId, setStateId] = useState(null);

    useEffect(() => {
        console.log(countryId)
    }, [countryId])


    const renderInput = () => {
        switch (as) {
            case 'country-selector':
                return (
                    <CountrySelect
                        onChange={(e) => {
                            // console.log(e)
                            setCountryId(e.id)
                            setFieldValue(name, e.iso2)
                        }}
                        placeHolder="Select Country"
                    />
                );

            case 'state-selector': {
                console.log('countryId from state-selector', countryId);
                return (
                    <StateSelect
                        countryid={values.country}
                        onChange={(e) => {
                            setStateId(e.id);
                            setFieldValue(() => name, e.iso2);
                        }}
                        placeHolder="Select State"
                    />
                );
            }
            case 'city-selector':
                return (
                    <CitySelect
                        country={values.country} // Ensure you have the selected country in state
                        state={values.state} // Ensure you have the selected state in state
                        onChange={(e) => setFieldValue(name, e.id)}
                        placeHolder="Select City"
                        inputClassname={name}
                        name={name}
                    />
                );
            case 'textarea':
                return (
                    <Field
                        as='textarea'
                        name={name}
                        placeholder={placeholder}
                        className={`inputField ${touched && error ? 'input-error' : ''}`}
                    />
                );
            case 'custom':
                return (
                    <div className={`custom-input ${customInputName}`}>
                        {/* Render your custom input here */}
                        <Field
                            as='input'
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            className={`inputField ${touched && error ? 'input-error' : ''}`}
                        />
                    </div>
                );
            default:
                return (
                    <Field
                        as='input'
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className={`inputField ${touched && error ? 'input-error' : ''}`}
                    />
                );
        }
    };


    return (
        <div className={`input-item ${as == 'textarea' ? 'textarea' : ''} ${as == 'custom' ? customInputName : ''}`}>
            <span className='label'>{label}:</span>

            {renderInput()}

            <div className="error-message-container">
                <ErrorMessage name={name} component='span' className='error' />
            </div>
        </div>

    )
})

export default InputField