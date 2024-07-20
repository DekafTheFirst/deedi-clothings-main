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
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const fetchCountryList = async () => {
        try {
            const countryData = await GetCountries();
            setCountryList(countryData);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    };

    const fetchStateList = async (countryId) => {
        try {
            const stateData = await GetState(countryId);
            setStateList(stateData);
        } catch (error) {
            console.error('Error fetching state data:', error);
        }
    };

    const fetchCityList = async (stateId) => {
        console.log(stateId)
        try {
            const cityData = await GetCity(stateId);
            setCityList(cityData);
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };


    const handleCountryChange = (e) => {
        const country = countryList[e.target.value];
        setFieldValue("country", country.iso2);
        setFieldValue("countryData", country);
        setFieldValue("state", '');
        setFieldValue("stateData", null);
        setFieldValue("city", '');
        setFieldValue("cityData", null);
    };

    const handleStateChange = (e) => {
        const state = stateList[e.target.value];
        setFieldValue('state', state.name);
        setFieldValue('stateData', state);
        setFieldValue('city', '');
        setFieldValue('cityData', null);
    };

    const handleCityChange = (e) => {
        const city = cityList[e.target.value];
        setFieldValue('city', city.name);
        setFieldValue('cityData', city);
    };

    useEffect(() => {
        fetchCountryList();
    }, []);

    useEffect(() => {
        if (values.countryData?.id) {
            fetchStateList(values.countryData.id);
        }
    }, [values.countryData]);

    useEffect(() => {
        if (values.stateData?.id) {
            fetchCityList(values.stateData.id);
        }
    }, [values.stateData]);




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
                        {/* <CountrySelect
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
                        /> */}
                        <select
                            onChange={handleCountryChange}
                            // autoComplete='off'
                            // aria-autocomplete='off'
                            // autocomplete='off'
                            className='inputField'
                        >
                            {countryList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case 'state-selector': {
                return (
                    // <StateSelect
                    //     countryid={values.countryData?.id}
                    //     onChange={(state) => {
                    //         setFieldValue('state', state.name);
                    //         setFieldValue('stateData', state);
                    //         setFieldValue('city', '');
                    //         setFieldValue('cityData', null);
                    //     }}
                    //     placeHolder={values.stateData ? values.stateData.name : 'Select State'}
                    // />
                    <select
                        onChange={handleStateChange}
                        className='inputField'
                    >
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
                    // <CitySelect
                    //     countryid={values.countryData?.id} // Ensure you have the selected country in state
                    //     stateid={values.stateData?.id} // Ensure you have the selected state in state
                    //     onChange={(city) => {
                    //         setFieldValue('city', city.name);
                    //         setFieldValue('cityData', city);
                    //     }}
                    //     placeHolder={values.cityData ? values.cityData.name : 'Select City'}
                    // />
                    <select
                        onChange={handleCityChange}
                        className='inputField'
                        value={values.cityData ? values.cityData.id : ''}
                    >
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