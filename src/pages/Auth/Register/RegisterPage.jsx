import React from 'react';

import '../common/commonStyles.scss';
import './RegisterPage.scss';

import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate()

    return (
        <div className='register-page auth-page'>
            <div className="welcome">
            <img src='/img/deedi-logo.png' className='clickable-brand-name' onClick={() => navigate("/")}/>
            <h4 className='heading'>Welcome to DEEDI</h4>
                <p>Enter your e-mail to create an account.</p>
            </div>
            <div className="form-wrapper">
                <RegisterForm />
            </div>
        </div>
    )
};

export default RegisterPage;
