import React from 'react';
import './InputField.css';
import { ErrorMessage, Field } from 'formik';

const InputField = ({ name, label, type, placeholder, as, touched, error }) => {
    return (
        <div className={`input-item ${as == 'textarea' ? 'text-area' : '' }`}>
            <span className='label'>{label}:</span>
            <Field
                as={as ? as : 'input'}
                type={type}
                name={name}
                placeholder={placeholder}
                className={touched && error ? 'input-error' : ''}
            />
            <div className="error-message-container">
                <ErrorMessage name={name} component='span' className='error' />
            </div>
        </div>

    )
}

export default InputField