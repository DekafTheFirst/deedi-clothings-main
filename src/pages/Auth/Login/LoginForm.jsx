import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/authReducer';
import AuthFormComponent from '../AuthFormComponent/AuthFormComponent';



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(loginUser({ email, password })).unwrap();
    };

    const fields = [
        { type: 'email', name: 'email', value: email, onChange: (e) => setEmail(e.target.value), placeholder: 'Email' },
        { type: 'password', name: 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: 'Password' },
    ];

    const footer = (
        <div className="form-footer-links">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register">Sign Up</a>
        </div>
    );

    return (
            <AuthFormComponent
                onSubmit={handleLogin}
                fields={fields}
                buttonText="Login"
                errors={error ? { email: error, password: error } : {}}
                footer={footer}
            />
    );
}

export default LoginForm