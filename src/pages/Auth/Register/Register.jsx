import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authReducer';
import FormComponent from '../FormComponent/FormComponent';
import './Register.scss';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const handleRegister = async (e) => {
        e.preventDefault();
        await dispatch(registerUser({ email, password, username })).unwrap();
    };

    const fields = [
        { type: 'text', name: 'username', value: username, onChange: (e) => setUsername(e.target.value), placeholder: 'Username' },
        { type: 'email', name: 'email', value: email, onChange: (e) => setEmail(e.target.value), placeholder: 'Email' },
        { type: 'password', name: 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: 'Password' },
    ];

    const footer = (
        <div className="form-footer-links">
            <a href="/login">Already have an account? Login</a>
        </div>
    );

    return (
        <FormComponent
            onSubmit={handleRegister}
            fields={fields}
            buttonText="Sign Up"
            errors={error ? { email: error, password: error, username: error } : {}}
            footer={footer}
        />
    );
};

export default Register;
