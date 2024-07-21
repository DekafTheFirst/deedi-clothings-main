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

const InputField = memo(({ name, label, type, placeholder, as, touched, error, customInputName, values, handleBlur, setFieldValue, countryList, stateList, cityList }) => {
    const countryRef = useRef(null);
    const stateRef = useRef(null);


    const handleCountryChange = (e) => {
        if (e.target.value == 'placeholder') {
            setFieldValue('country', '');
            setFieldValue('countryData', null);
        }
        else {
            const country = countryList[e.target.value]
            const countryIndex = countryList?.findIndex(item => item?.id === country.id);

            // console.log('e.target.value', e.target.value);
            console.log('country', country);
            console.log('countryIndex', countryIndex)

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







    // useEffect(() => {
    //     const fetchStateList = async () => {
    //         try {
    //             const stateData = await GetStates();
    //             setStateList(countryData); // Store fetched country data in state
    //         } catch (error) {
    //             console.error('Error fetching country data:', error);
    //         }
    //     };

    //     // Fetch the country list only if it's not already fetched
    //     if (countryList.length === 0) {
    //         fetchStateList();
    //     }
    // }, [])

    // useEffect(() => {

    //     const handleCountryChange = async () => {
    //         if (countryRef.current) {
    //             const selectedCountry = countryRef.current.querySelector('input').value;

    //             if (selectedCountry && selectedCountry !== values['name']) {
    //                 // console.log(countryList[1]);
    //                 const selectedCountryData = countryList.find(country => country.name === selectedCountry);
    //                 console.log(selectedCountryData)

    //                 setFieldValue('country', selectedCountry);
    //                 setFieldValue('countryData', selectedCountryData);
    //                 // setFieldValue('state', '');
    //                 // setFieldValue('stateData', null);
    //                 // setFieldValue('city', '');
    //                 // setFieldValue('cityData', null);

    //             }
    //             else {
    //                 console.log('matches already')
    //             }
    //         }
    //     };

    //     if (countryRef.current) {
    //         countryRef.current.addEventListener('change', handleCountryChange);
    //     }

    //     return () => {
    //         if (countryRef.current) {
    //             countryRef.current.removeEventListener('change', handleCountryChange);
    //         }
    //     };
    // }, [countryRef, name, setFieldValue, values]);


    // useEffect(() => {
    //     const handleStateChange = () => {
    //         if (stateRef.current) {
    //             const selectedState = stateRef.current.querySelector('input').value;
    //             if (selectedState && selectedState !== values[name]) {
    //                 setFieldValue('state', '');
    //             }
    //         }
    //     };

    //     if (stateRef.current) {
    //         stateRef.current.addEventListener('change', handleStateChange);
    //     }

    //     return () => {
    //         if (stateRef.current) {
    //             stateRef.current.removeEventListener('change', handleStateChange);
    //         }
    //     };
    // }, [stateRef, name, setFieldValue, values]);

    const renderInput = () => {
        switch (as) {
            case 'country-selector':
                return (
                    <div ref={countryRef}>
                        <select
                            onChange={handleCountryChange}
                            className='inputField'
                            // value={'placeholder'}
                            value={!values.countryData?.countryIndex && values.countryData?.countryIndex !== 0 ? 'placeholder' : values.countryData.countryIndex}
                        >
                            <option
                                value="placeholder"
                                className='placeholder'
                            >Select your country</option>

                            {countryList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div >
                );

            case 'state-selector': {
                return (
                    <select
                        onChange={handleStateChange}
                        className='inputField'
                        value={!values.stateData?.stateIndex && values.stateData?.stateIndex !== 0 ? 'placeholder' : values.stateData.stateIndex}
                    >
                        <option
                            value="placeholder"
                            className='placeholder'
                        >Select your state</option>

                        {stateList.map((item, index) => (
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
                        value={!values.cityData?.cityIndex && values.cityData?.cityIndex !== 0 ? 'placeholder' : values.cityData.cityIndex}
                    >
                        <option 
                        value="placeholder"
                        className='placeholder'
                        >Select your city</option>

                        {cityList.map((item, index) => (
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
            <span className='label'>{label}:</span>

            {renderInput()}

            <div className="error-message-container">
                <ErrorMessage name={name} component='span' className='error' />
            </div>
        </div>

    )
})

export default InputField