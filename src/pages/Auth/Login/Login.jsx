// LoginComponent.js
import React, { useState } from 'react';

import './Login.scss'

import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, updateUser } from '../../../redux/authReducer';
import { resetCart, setCart } from '../../../redux/cartReducer';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('')
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const handleLogin = async () => {
        const userData = await dispatch(loginUser({ email, password })).unwrap();
        console.log(userData.cart.items)
        dispatch(setCart(userData.cart.items))
    };

    const handleUpdate = () => {
        dispatch(updateUser({ id: user.id, username }));
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {user ? <div className="">
                <p>Welcome, {user.username}</p>
                <button onClick={() => dispatch(logoutUser())}>Logout</button>
                <br>
                </br>
                <br>
                </br>
                <p>Update Display Name</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={handleUpdate}>Update</button>
            </div> : (
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
