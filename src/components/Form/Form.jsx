import React from 'react';
import './Form.scss';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import InputField from '../InputField/InputField';

const FormComponent = ({ items, onSubmit, validationSchema, submitBtnText, children }) => {
    return (
        <Formik
            initialValues={Object.fromEntries(items.map(item => [item.name, item.initialValue]))}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, handleSubmit, initialValues, values, touched }) => {
                return (
                    <Form >
                        <div className="items">
                            {items.map((item) => (
                                <InputField key={item.name} label={item.label} name={item.name} type={item.type} as={item.as} touched={touched[item.name]} error={errors[item.name]} />
                            ))}
                        </div>

                        {children}

                        <button type="submit" className="btn-1 submit-btn" disabled={isSubmitting}>
                            {submitBtnText ? submitBtnText : 'Submit'}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default FormComponent