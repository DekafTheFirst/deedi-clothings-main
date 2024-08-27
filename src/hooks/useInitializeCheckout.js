import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CART_MODE, validateStock, setCartMode, setShowCart } from '../redux/cartReducer'; // Adjust the import path

// Custom hook with parameters for different behaviors
const useInitializeCheckout = (onSuccess, onFailure) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInitializeCheckout = useCallback(async () => {
    try {
      const response = await dispatch(validateStock({ reserve: true })).unwrap();
      const { outOfStockItems, reducedItems } = response;
      //   console.log('outOfStockItems', outOfStockItems);

      if (outOfStockItems.length > 0 || reducedItems.length > 0) {
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
    } catch (error) {
      console.error('Error initializing checkout', error);
    }
  }, [dispatch, navigate, onSuccess, onFailure]);

  return handleInitializeCheckout;
};

export default useInitializeCheckout;
