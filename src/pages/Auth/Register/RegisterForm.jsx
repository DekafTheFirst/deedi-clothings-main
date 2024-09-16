import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authReducer';
import AuthFormComponent from '../AuthFormComponent/AuthFormComponent';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(null)

    const handleRegister = async (values) => {
        // console.log('values', values)
        try {
            await dispatch(registerUser(values)).unwrap();
            setError(null)
            navigate('/')
        }
        catch (error) {
            setError(error)
            console.error('error', error)
        }
    };

    const registerValidationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),

        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Repeat Password is required'),
    });

    const registerInputConfigs = [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter your username',
            as: 'text',
        },
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name',
            as: 'text',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name',
            as: 'text',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            as: 'text',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            as: 'password',
        },
        {
            name: 'repeatPassword',
            label: 'Repeat Password',
            type: 'password',
            placeholder: 'Repeat your password',
            as: 'password',
        },
    ];
    const footer = (
        <div className="form-footer-links">
            <a href="/login">Already have an account? <span>Login</span></a>
        </div>
    );

    return (
        <AuthFormComponent
            onSubmit={handleRegister}
            inputConfigs={registerInputConfigs}
            validationSchema={registerValidationSchema}
            buttonText="Sign Up"
            errors={error ? { email: error, password: error, username: error } : {}}
            footer={footer}
            submissionError={error}
        />

    );
}

export default RegisterForm