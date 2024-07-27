import { useEffect } from 'react';

import './CheckoutSuccess.scss'

import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { resetCart } from '../../../redux/cartReducer';
import { resetCheckout } from '../../../redux/checkoutReducer';


const CheckoutSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');

        if (token) {
            // Verify token with backend
            axios.post('/api/verify-checkout', { token })
                .then(response => {
                    if (response.data.valid) {
                        // Clear cart and checkout data
                        dispatch(resetCart());
                        dispatch(resetCheckout());
                        // Clear session storage if needed
                        sessionStorage.removeItem('checkout');
                    } else {
                        console.error('Invalid token');
                    }
                })
                .catch(error => {
                    console.error('Error verifying token:', error);
                });
        }
    }, [location, dispatch]);

    return (
        <div>
            <h1>Thank you for your purchase!</h1>
            <p>Your payment was successful. Your order will be processed shortly.</p>
        </div>
    );
};

export default CheckoutSuccess;
