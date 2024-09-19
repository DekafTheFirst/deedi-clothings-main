import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/authReducer';

import '../common/commonStyles.scss'
import './LoginPage.scss';

import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    return (
        <div className='login-page auth-page'>
            <div className="welcome">
                <img src='/img/deedi-logo.png' className='clickable-brand-name' onClick={() => navigate("/")}/>
                <h5 className='heading'>Welcome to DEEDI</h5>
                <p>Enter your e-mail to log into your account.</p>
            </div>
            <div className="form-wrapper">
                <LoginForm />
            </div>
        </div>
    )
};

export default LoginPage;
