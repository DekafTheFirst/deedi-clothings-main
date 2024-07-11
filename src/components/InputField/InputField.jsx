import React from 'react';
import './InputField.scss';
import { ErrorMessage, Field } from 'formik';

const InputField = ({ name, label, type, placeholder, as, touched, error, customInputName }) => {

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

    return (
        <div className={`input-item ${as == 'textarea' ? 'textarea' : ''} ${as == 'custom' ? customInputName : ''}`}>
            <span className='label'>{label}:</span>

            <Field
                as={as == 'textarea' ? 'textarea' : 'input'}
                type={type}
                name={name}
                placeholder={placeholder}
                className={`inputField ${touched && error ? 'input-error' : ''}`}
            />

            <div className="error-message-container">
                <ErrorMessage name={name} component='span' className='error' />
            </div>
        </div>

    )
}

export default InputField