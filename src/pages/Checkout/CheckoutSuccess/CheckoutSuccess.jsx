import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../../redux/cart/cartReducer';
import { resetCheckout } from '../../../redux/checkout/checkoutReducer';

const CheckoutSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        if (sessionId) {
            // Here you can fetch the session to verify payment if necessary
            
            // Clear cart and checkout data
            // dispatch(resetCart());
            // dispatch(resetCheckout());

            // Clear session storage if needed
            // sessionStorage.removeItem('checkout');
        }
    }, [location, dispatch]);

    return (
        <div className='container-fluid'>
            <h1>Thank you for your purchase!</h1>
            <p>Your payment was successful. Your order will be processed shortly.</p>
        </div>
    );
};

export default CheckoutSuccess;
