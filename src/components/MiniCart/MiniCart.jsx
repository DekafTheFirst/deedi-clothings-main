import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import "./MiniCart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import calculateNoOfProducts from '../../utils/calculateNoOfProducts'
import { CircularProgress } from '@mui/material'
import CartItem from './MiniCartItem/CartItem'
import { CART_MODE, setCartMode, setShowCart, validateCartItem } from '../../redux/cartReducer'
import { splitItemsByStock } from '../../utils/cartItemUtils'


const Cart = () => {

  const navigate = useNavigate();

  const items = useSelector(state => state.cart.items);

  const { inStockItems, outOfStockItems } = useMemo(
    () => splitItemsByStock(items),
    [items]
  );
  const noOfProducts = useMemo(() => calculateNoOfProducts(inStockItems), [inStockItems]);

  const subtotal = useSelector(state => state.cart.subtotal)




  const dispatch = useDispatch()

  const handleProceedToCheckout = () => {
    if (inStockItems.length > 0) {
      dispatch(setShowCart(false));
      navigate('/checkout');
    }
  }


  const isInitialMount = useRef(true);
  // Handle SPA navigation


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return
    }

    

    dispatch(validateCartItem())
  }, [])



  return (
    <div className="mini-cart">
      <div className="total">
        <span>{`SUBTOTAL(${noOfProducts})`}</span>
        <span>${subtotal}</span>
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
        {noOfProducts > 0 ?
          <>
            <button onClick={handleProceedToCheckout} className='btn-1'>PROCEED TO CHECKOUT</button>
            <Link to="/cart" className='view-cart' onClick={() => dispatch(setShowCart(false))}> View Shopping Bag </Link>
          </>
          :
          <button onClick={() => navigate('/products/women')} className='btn-1'>GO SHOPPING</button>
        }
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
      </div>
    </div>
  )
}

export default Cart