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
    GetCountries,
    GetCity,
    GetState,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { compose } from 'redux';
import PasswordField from '../PasswordField/PasswordField';

const InputField = ({ name, label, type, placeholder, as, touched, error, customInputName, value, handleBlur, setFieldValue, countryList, stateList, cityList }) => {

    // console.log('cityList', cityList)

    const handleCountryChange = (e) => {
        if (e.target.value == 'placeholder') {
            setFieldValue('country', '');
            setFieldValue('countryData', null);
        }
        else {
            const country = countryList[e.target.value]
            const countryIndex = countryList?.findIndex(item => item?.id === country.id);

            // console.log('e.target.value', e.target.value);
            // console.log('country', country);
            // console.log('countryIndex', countryIndex)

            setFieldValue("country", country.iso2);
            setFieldValue("countryData", { ...country, countryIndex });
            setFieldValue('state', '');
            setFieldValue('stateData', null);
            setFieldValue('city', '');
            setFieldValue('cityData', null)

        }
    };



    const handleStateChange = (e) => {
        if (e.target.value == 'placeholder') {
            setFieldValue('state', '');
            setFieldValue('stateData', null);
            setFieldValue('city', '');
            setFieldValue('cityData', null)
        }
        else {
            const state = stateList[e.target.value];
            const stateIndex = stateList?.findIndex(item => item?.id === state.id);
            setFieldValue('state', state.name);
            setFieldValue('stateData', { ...state, stateIndex });
            setFieldValue('city', '');
            setFieldValue('cityData', null)
        }
    };

    const handleCityChange = (e) => {
        if (e.target.value == 'placeholder') {
            setFieldValue('city', '');
            setFieldValue('cityData', null);
        }
        else {
            const city = cityList[e.target.value];
            const cityIndex = cityList?.findIndex(item => item?.id === city.id);

            setFieldValue('city', city.name);
            setFieldValue('cityData', { ...city, cityIndex });
        }
    };




    if (as === 'country-selector') {
        console.log(value)
    }

    const renderInput = () => {
        switch (as) {
            case 'country-selector':
                return (
                    <select
                        onChange={handleCountryChange}
                        className='inputField'
                        // value={'placeholder'}
                        value={!value?.countryIndex && value?.countryIndex !== 0 ? 'placeholder' : value.countryIndex}
                    >
                        <option
                            value="placeholder"
                            className='placeholder'
                        >Select your country</option>

                        {countryList && countryList.map((item, index) => (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                );

            case 'state-selector': {
                return (
                    <select
                        onChange={handleStateChange}
                        className='inputField'
                        value={!value?.stateIndex && value?.stateIndex !== 0 ? 'placeholder' : value.stateIndex}
                    >
                        <option
                            value="placeholder"
                            className='placeholder'
                        >Select your state</option>

                        {stateList && stateList.map((item, index) => (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                );
            }
            case 'city-selector':
                return (
                    <select
                        onChange={handleCityChange}
                        className='inputField'
                        value={!value?.cityIndex && value?.cityIndex !== 0 ? 'placeholder' : value.cityIndex}
                    >
                        <option
                            value="placeholder"
                            className='placeholder'
                        >Select your city</option>

                        {cityList && cityList.map((item, index) => (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        ))}
                    </select>
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
            case 'password':
                return (
                    <PasswordField
                        name={name}
                        label={label}
                        onChange={(e) => {
                            setFieldValue(name, e.target.value)
                        }}
                        onBlur={handleBlur}
                        error={error}
                        touched={touched}
                    />
                )
            case 'custom':
                return (
                    <div className={`custom-input ${customInputName}`}>
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
            <span className='label'>{label}</span>

            {renderInput()}

            <div className="error-message-container">
                <ErrorMessage name={name} component='span' className='error' />
            </div>
        </div>

    )
}

export default InputField