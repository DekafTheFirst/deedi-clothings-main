import React from 'react';
import './AuthFormComponent.scss';
import classNames from 'classnames';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../components/InputField/InputField';
import PasswordField from '../../../components/PasswordField/PasswordField'; // Import PasswordField
import { CircularProgress } from '@mui/material';
import CTAButton from '../../../components/CTAButton/CTAButton';

const AuthFormComponent = ({ onSubmit, buttonText, errors, footer, classNames: myClassNames, inputConfigs, validationSchema, submissionError }) => {
    // Define validation schema based on form type
    const initialValues = inputConfigs.reduce((values, input) => {
        values[input.name] = '';
        return values;
    }, {});

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                // Pass values from Formik to the onSubmit prop (which is handleRegister)
                onSubmit(values);
                setSubmitting(false);
            }}        >
            {({ isSubmitting, errors, touched, values, submitForm, handleChange, handleBlur, setFieldValue }) => {
                // console.log('values', values)
                return (
                    <Form className={classNames('form', myClassNames)}>

                        {inputConfigs.map((input) => (
                            <div key={input.name} className="form-group">
                                <InputField
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    label={input.label}
                                    as={input.as}
                                    value={values[input.name]}
                                    touched={touched[input.name]}
                                    error={errors[input.name]}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                        ))}
                        <div className="submit">
                            {submissionError && <span className='submission-error'>{submissionError}</span>}
                            <CTAButton isSubmitting={isSubmitting} buttonText={buttonText} onClick={submitForm} />
                        </div>

                        {footer && <div className="form-footer">{footer}</div>}
                    </Form>
                )
            }}
        </Formik>
    );
};

export default AuthFormComponent;
