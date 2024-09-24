import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import "./MiniCart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import CartItem from './MiniCartItem/CartItem'
import { selectCartTotals, selectItemsByStock, setCartMode, setShowCart, validateCartItems } from '../../redux/cart/cartReducer'
import CTAButton from '../CTAButton/CTAButton'
import FreeShippingProgress from '../FreeShippingProgress/FreeshippingProgress'


const Cart = ({ setShowCart }) => {

  const navigate = useNavigate();

  const items = useSelector(state => state.cart.items);
  const { noOfItems, subtotal, } = useSelector(selectCartTotals)
  const { inStockItems, outOfStockItems } = useSelector(selectItemsByStock)





  const dispatch = useDispatch()

  const handleProceedToCheckout = () => {
    if (inStockItems.length > 0) {
      setShowCart(false);
      navigate('/checkout');
    }
  }


  const isInitialMount = useRef(true);
  // Handle SPA navigation


  useEffect(() => {
    
    const validateAndSet = () => {
      try {
        dispatch(validateCartItems());
        // setValidated(true);
      } catch (error) {
        console.error('Error validating stock:', error);
      }
    };

    validateAndSet();
  }, []);



  return (
    <div className="mini-cart">
      <div className="mini-cart-header">
        <div className="total">
          <span>{`SUBTOTAL(${inStockItems.length})`}</span>
          <span className='amount'>${subtotal}</span>
        </div>
        <FreeShippingProgress />

      </div>
      <div className="items">
        {items ? (
          items.length > 0 ?
            <>
              <div className="cart-items in-stock">
                {
                  items.filter(item => !item.outOfStock).map(item => (
                    <CartItem key={item.localCartItemId} item={item} cartType="mini" />
                  ))
                }
              </div>
              <div className="cart-items out-of-stock">
                {
                  items.filter(item => item.outOfStock).map(item => (
                    <CartItem key={item.localCartItemId} item={item} cartType="mini" />
                  ))
                }
              </div>
            </>

            :
            <span className='list-empty'>Your cart is empty</span>
        ) : <CircularProgress />}
      </div>

      <div className="navigation">
        {noOfItems > 0 ?
          <>
            <CTAButton onClick={handleProceedToCheckout} buttonText={'Proceed To Checkout'} />

            <Link to="/cart" className='view-cart' onClick={() => setShowCart(false)}> View Shopping Bag </Link>
          </>
          :
          <CTAButton onClick={() => {
            setShowCart(false)
            navigate('/products/women');
          }}
            buttonText={'Go Shopping'}
          />
        }
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
      </div>
    </div>
  )
}

export default Cart