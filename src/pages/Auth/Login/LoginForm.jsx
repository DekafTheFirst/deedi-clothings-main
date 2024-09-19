import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/authReducer';
import AuthFormComponent from '../AuthFormComponent/AuthFormComponent';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const loginInputConfigs = [
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
        }
    ];

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = async (values) => {
        try {
            await dispatch(loginUser(values)).unwrap();
            setError(null)
            navigate('/')
        } catch (error) {
            // console.error('error', error)
            setError(error);
        }
    };

    const footer = (
        <div className="form-footer-links">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register"><span>Sign Up</span></a>
        </div>
    );

    return (
        <AuthFormComponent
            onSubmit={handleLogin}
            buttonText="Login"
            inputConfigs={loginInputConfigs}
            validationSchema={loginValidationSchema}
            submissionError={error}
            footer={footer}
        />
    );
};

export default LoginForm;
