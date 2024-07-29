import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import { store } from '../../redux/store';

const checkCartItemsLoader = () => {
    const state = store.getState();
    const cartItems = state.cart.cartItems;

    if (cartItems.length === 0) {
        return redirect('/cart'); // Redirect to cart page or change to "/" for home page
    }

    return null; // No redirection needed
};

export default checkCartItemsLoader;
