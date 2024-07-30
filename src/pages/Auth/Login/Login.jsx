// LoginComponent.js
import React, { useState } from 'react';

import './Login.scss'

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/authReducer';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {user ? <p>Welcome, {user.displayName}</p> : (
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Login;
