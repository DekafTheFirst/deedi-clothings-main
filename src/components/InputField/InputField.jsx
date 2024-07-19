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

    const [country, setCountry] = useState(null);
    const [stateId, setStateId] = useState(null);

    // useEffect(() => {
    // }, [country])

    const countryRef = useRef(null);
    const stateRef = useRef(null);


    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [languageList, setLanguageList] = useState([]);
  
    useEffect(() => {
      GetCountries().then((result) => {
        setCountries(result);
      });
  
      GetLanguages().then((result) => {
        setLanguageList(result);
      });
    }, []);

    useEffect(() => {
        // const handleCountryChange = () => {
        //     if (countryRef.current) {
        //         const selectedCountry = countryRef.current.querySelector('input').value;
        //         if (selectedCountry && selectedCountry !== values[name]) {
        //             setFieldValue(name, selectedCountry);
        //         }
        //     }
        // };

        // if (countryRef.current) {
        //     countryRef.current.addEventListener('change', handleCountryChange);
        // }

        // return () => {
        //     if (countryRef.current) {
        //         countryRef.current.removeEventListener('change', handleCountryChange);
        //     }
        // };
        if (countryRef.current) {
            const input = countryRef.current.querySelector('input');
            console.log(input)
            if (input) {
                input.setAttribute('autocomplete', 'off');
            }
        }
    }, [countryRef, name, setFieldValue, values]);


    useEffect(() => {
        const handleStateChange = () => {
            if (stateRef.current) {
                const selectedState = stateRef.current.querySelector('input').value;
                if (selectedState && selectedState !== values[name]) {
                    setFieldValue(name, selectedState);
                }
            }
        };

        if (stateRef.current) {
            stateRef.current.addEventListener('change', handleStateChange);
        }

        return () => {
            if (stateRef.current) {
                stateRef.current.removeEventListener('change', handleStateChange);
            }
        };
    }, [stateRef, name, setFieldValue, values]);

    const renderInput = () => {
        switch (as) {
            case 'country-selector':
                return (
                    <div ref={countryRef}>

                        <CountrySelect
                            onChange={(e) => {
                                // console.log('country changed:', e)
                                // setCountry(e)
                                setFieldValue('country', e.iso2)
                                setFieldValue('countryData', e)
                            }}
                            placeHolder={values.countryData ? values.countryData.name : 'Select Country'}
                        />
                    </div>
                );

            case 'state-selector': {
                return (
                    <div ref={stateRef}>
                        <StateSelect
                            countryid={values.countryData?.id}
                            onChange={(state) => {
                                setFieldValue('state', state.name);
                                setFieldValue('stateData', state);
                            }}
                            placeHolder={values.stateData ? values.stateData.name : 'Select State'}
                        />
                    </div>
                );
            }
            case 'city-selector':
                return (
                    <CitySelect

                        countryid={values.countryData?.id} // Ensure you have the selected country in state
                        stateid={values.stateData?.id} // Ensure you have the selected state in state
                        onChange={(city) => {
                            setFieldValue('city', city.name);
                            setFieldValue('cityData', city)
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