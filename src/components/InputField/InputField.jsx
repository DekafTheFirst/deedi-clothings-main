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

    const [country, setCountry] = useState(null);
    const [stateId, setStateId] = useState(null);

    // useEffect(() => {
    // }, [country])

    const countryRef = useRef(null);
    const stateRef = useRef(null);

    const [countryList, setCountryList] = useState([]);

    useEffect(()=> {
        const fetchCountryList = async () => {
            try {
                const countryData = await GetCountries();
                setCountryList(countryData); // Store fetched country data in state
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        // Fetch the country list only if it's not already fetched
        if (countryList.length === 0) {
            fetchCountryList();
        }
    }, [])

    useEffect(() => {
        


        const handleCountryChange = async () => {
            if (countryRef.current) {
                const selectedCountry = countryRef.current.querySelector('input').value;

                if (selectedCountry && selectedCountry !== values['name']) {
                    // console.log(countryList[1]);
                    const selectedCountryData = countryList.find(country => country.name === selectedCountry);
                    console.log(selectedCountryData)

                    setFieldValue('country', selectedCountry);
                    setFieldValue('countryData', selectedCountryData);
                    // setFieldValue('state', '');
                    // setFieldValue('stateData', null);
                    // setFieldValue('city', '');
                    // setFieldValue('cityData', null);

                }
                else {
                    console.log('matches already')
                }
            }
        };

        if (countryRef.current) {
            countryRef.current.addEventListener('change', handleCountryChange);
        }

        return () => {
            if (countryRef.current) {
                countryRef.current.removeEventListener('change', handleCountryChange);
            }
        };
    }, [countryRef, name, setFieldValue, values]);


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
                        <CountrySelect
                            onChange={(e) => {
                                console.log('country changed:', e)
                                // setCountry(e)
                                setFieldValue('country', e.iso2);
                                setFieldValue('countryData', e);
                                setFieldValue('state', '');
                                setFieldValue('stateData', null);
                                setFieldValue('city', '');
                                setFieldValue('cityData', null);
                            }}
                            placeHolder={values.countryData ? values.countryData.name : 'Select Country'}
                            showFlag={false}
                        />
                    </div>
                );

            case 'state-selector': {
                return (
                    <StateSelect
                        countryid={values.countryData?.id}
                        onChange={(state) => {
                            setFieldValue('state', state.name);
                            setFieldValue('stateData', state);
                            setFieldValue('city', '');
                            setFieldValue('cityData', null);
                        }}
                        placeHolder={values.stateData ? values.stateData.name : 'Select State'}
                    />
                );
            }
            case 'city-selector':
                return (
                    <CitySelect
                        countryid={values.countryData?.id} // Ensure you have the selected country in state
                        stateid={values.stateData?.id} // Ensure you have the selected state in state
                        onChange={(city) => {
                            setFieldValue('city', city.name);
                            setFieldValue('cityData', city);
                        }}
                        placeHolder={values.cityData ? values.cityData.name : 'Select City'}
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