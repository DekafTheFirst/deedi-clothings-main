import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CART_MODE, validateStock, setCartMode, setShowCart, initializeCheckout } from '../redux/cartReducer'; // Adjust the import path
import { toast } from 'react-toastify';

// Custom hook with parameters for different behaviors
const useInitializeCheckout = (onSuccess, onFailure) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);

  const handleInitializeCheckout = useCallback(async () => {
    const inStockItems = items.filter(item => !item.outOfStock);
    console.log('inStockItems', inStockItems)
    try {
      if (inStockItems.length > 0) {
        const response = await dispatch(initializeCheckout({ reserve: true })).unwrap();
        const { outOfStockItems, reducedItems } = response;
        //   console.log('outOfStockItems', outOfStockItems);

        if (outOfStockItems.length > 0) {
          if (onFailure) {
            onFailure(); // Execute custom failure logic
          } else {
            navigate('/cart');
            dispatch(setCartMode(CART_MODE.REVIEW));
          }
        } else {
          if (onSuccess) {
            onSuccess(); // Execute custom success logic
          } else {

            navigate('/checkout');
            dispatch(setShowCart(false))
            // dispatch(reserveStock());

          }
        }

        dispatch(setShowCart(false));
      }
      else {
        toast.warning('Add items to your cart to checkout !')
      }
    } catch (error) {
      console.error('Error initializing checkout', error);
    }
  }, [dispatch, navigate, onSuccess, onFailure]);

  return handleInitializeCheckout;
};

export default useInitializeCheckout;
