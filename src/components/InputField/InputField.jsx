import React, { useEffect, useRef } from 'react';
import './InputField.scss';
import { ErrorMessage, Field } from 'formik';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const InputField = ({ name, label, type, placeholder, as, touched, error, customInputName, values, handleBlur, setFieldValue }) => {
    const countries = countryList().getData();

    // This deals with "as" prop and not "type", okay???
    const inputVariations = [
        "input", 'textarea', 'custom'
    ]

    const inputVariationExists = (as) => {
        const exists = inputVariations.includes(as);

        return exists
    }

    // let customInputField;

    // switch (customInputName) {
    //     case 'address':
    //         customInputField = (
    //             <div className='specialAddressInputField'>
    //                 <div className="row">
    //                     <Field
    //                         as={'input'}
    //                         type={type}
    //                         name={name}
    //                         placeholder={placeholder}
    //                         className="col-6"
    //                     />
    //                 </div>
    //             </div>
    //         );
    //         break;
    // }


    const selectInputRef = useRef(null);

    useEffect(() => {
        const handleAutofill = (event) => {
            const target = event.target;
            if (target.name === name) {
                setFieldValue(name, target.value);
            }
        };

        const inputElement = selectInputRef.current;
        inputElement.addEventListener('input', handleAutofill);

        return () => {
            inputElement.removeEventListener('input', handleAutofill);
        };
    }, [name, setFieldValue]);


    return (
        <div className={`input-item ${as == 'textarea' ? 'textarea' : ''} ${as == 'custom' ? customInputName : ''}`}>
            <span className='label'>{label}:</span>

            {type === 'country-selector' ?
                (<Select
                    name="country"
                    options={countries}
                    value={countries.find(option => option.value === values.country)}
                    onChange={option => setFieldValue('country', option.value)}
                    onBlur={handleBlur}
                    ref={selectInputRef}
                />)
                :
                (<Field
                    as={as == 'textarea' ? 'textarea' : 'input'}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={`inputField ${touched && error ? 'input-error' : ''}`}
                />)}

            <div className="error-message-container">
                <ErrorMessage name={name} component='span' className='error' />
            </div>
        </div>

    )
}

export default InputField