import React, { useCallback, useEffect, useMemo } from 'react'
import "./MiniCart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import calculateNoOfProducts from '../../utils/calculateNoOfProducts'
import { CircularProgress } from '@mui/material'
import CartItem from './MiniCartItem/CartItem'
import { CART_MODE, setCartMode, setShowCart, validateStock } from '../../redux/cartReducer'
import useInitializeCheckout from '../../hooks/useInitializeCheckout'


const Cart = () => {

  const navigate = useNavigate();

  const items = useSelector(state => state.cart.items);

  const noOfProducts = useMemo(() => calculateNoOfProducts(items), [items]);

  const subtotal = useSelector(state => state.cart.subtotal)




  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(validateStock())
  }, [])

  const initializeCheckout = useInitializeCheckout(null, () => navigate('/cart'));


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
            <span className='list-empty'>No Products</span>
        ) : <CircularProgress />}
      </div>

      <div className="navigation">
        {noOfProducts > 0 ?
          <button onClick={() => initializeCheckout()} className='btn-1'>PROCEED TO CHECKOUT</button>
          :
          <button onClick={() => navigate('/products/women')} className='btn-1'>GO SHOPPING</button>
        }
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
        <Link to="/cart" className='view-cart' onClick={() => dispatch(setShowCart(false))}> View Shopping Bag </Link>
      </div>
    </div>
  )
}

export default Cart