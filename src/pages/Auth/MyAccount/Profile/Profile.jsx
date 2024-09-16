import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../redux/auth/authReducer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CTAButton from '../../../../components/CTAButton/CTAButton';
import './Profile.scss';
import InputField from '../../../../components/InputField/InputField';



const Profile = memo(() => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // Yup Validation Schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string().email('Invalid email address')
      .min(3, 'Username must be at least 3 characters')

  });

  // Initial form values
  const [error, setError] = useState(null)

  const inputConfigs = [
    {
      name: 'someDifferentfirstName',
      label: 'First Name',
      type: 'text',
      placeholder: user?.firstName || '',
      as: 'text',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: user?.lastName || '',
      as: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: user?.email || '',
      as: 'text',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: user?.username || '',
      as: 'text',
    },

  ];

  const placeholders = inputConfigs.reduce((values, input) => {
    values[input.name] = input.placeholder;
    return values;
  }, {});
  // console.log('placeholders', placeholders)

  const initialValues = inputConfigs.reduce((values, input) => {
    values[input.name] = '';
    return values;
  }, {});
  // console.log('placeholders', placeholders)

  // Form submit handler
  const handleSubmit = (values, { setSubmitting, setErrors, setValues }) => {

    const updatedFields = {};
    const errors = {}; // Initialize an empty errors object

    console.log('values', values)
    // Loop through the values and compare them with initialValues
    for (const key in values) {
      if (values[key] !== placeholders[key]) {
        if (values[key] !== initialValues[key]) {
          updatedFields[key] = values[key];
        }
      }
      else {
        errors[key] = 'This value is the same as the current value and cannot be updated.';
      }

    }

    console.log('updatedFields', updatedFields)
    console.log('user', user)
    // Only dispatch if there are changes

    console.log('errors', errors)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setSubmitting(false);
    }
    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateUser({ userId: user.id, updatedFields }))
        .then(() => {
          // Reset the form values after successful update
          setValues(inputConfigs.reduce((acc, input) => {
            acc[input.name] = ''; // Reset each field to an empty string
            return acc;
          }, {}));
        })
        .finally(() => setSubmitting(false)); // End submitting state after dispatch
    } else {
      setSubmitting(false)
    }
  };




  return (
    <div className="profile-section">
      <h4>My Profile</h4>

      {/* Formik with Yup Validation */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, touched, handleSubmit, errors, setFieldValue, setSubmitting, dirty }) => {
          // Check if username has changed
          return (
            <Form className="profile-form" autoComplete='off'>
              {/* CTAButton with disabled state and styling */}
              <div className="items">
                {inputConfigs.map((input) => (
                  <div key={input.name} className="form-group">
                    <span className='label'>{input.label}</span>
                    <InputField
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      as={input.as}
                      value={values[input.name]}
                      touched={touched[input.name]}
                      error={errors[input.name]}
                      setFieldValue={setFieldValue}
                      autoComplete='deceive-autocorrect'
                    />
                  </div>
                ))}
              </div>

              <CTAButton
                buttonText="Update"
                disabled={!dirty || isSubmitting}
                onClick={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default Profile;
