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
      name: 'firstName',
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

  const initialValues = inputConfigs.reduce((values, input) => {
    values[input.name] = '';
    return values;
  }, {});

  // Form submit handler
  const handleSubmit = ({values, setSubmitting}) => {
      const updatedFields = {};
      console.log('values', values)
      // Loop through the values and compare them with initialValues
      for (const key in values) {
        if (values[key] !== initialValues[key]) {
          updatedFields[key] = values[key];
        }
      }

      console.log('updatedFields', updatedFields)
      console.log('user', user)
      // Only dispatch if there are changes
      if (Object.keys(updatedFields).length > 0) {
        dispatch(updateUser({ userId: user.id, updatedFields }))
          .finally(() => setSubmitting(false)); // End submitting state after dispatch
      } else {
        
      }
  };




  return (
    <div className="profile-section">
      <h2>Profile</h2>

      {/* Formik with Yup Validation */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => handleSubmit({values, setSubmitting})}
      >
        {({ isSubmitting, values, touched, handleSubmit, errors, setFieldValue, setSubmitting, dirty }) => {
          // Check if username has changed
          // console.log('touched', touched)
          return (
            <Form className="profile-form">
              {/* CTAButton with disabled state and styling */}
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
