import React from 'react';

import '../common/commonStyles.scss';
import './RegisterPage.scss';

import RegisterForm from './RegisterForm';

const RegisterPage = () => {
    return (
        <div className='register-page auth-page'>
            <div className="welcome">
                <img src='/img/deedi-logo.png' />
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
