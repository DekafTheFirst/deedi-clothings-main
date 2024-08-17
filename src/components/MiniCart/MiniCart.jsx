import React, { useCallback, useMemo } from 'react'
import "./MiniCart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import calculateNoOfProducts from '../../utils/calculateNoOfProducts'
import CartItem from './CartItem/CartItem'
import { CircularProgress } from '@mui/material'


const Cart = ({ showCart, setShowCart }) => {

  const navigate = useNavigate();


  const items = useSelector(state => state.cart.items);

  const noOfProducts = useMemo(() => calculateNoOfProducts(items), [items]);

  const subtotal = useSelector(state => state.cart.subtotal)




  const dispatch = useDispatch()






  const handleCheckoutClicked = useCallback(() => {
    navigate('/checkout');
    setShowCart(false);
  }, [navigate, setShowCart]);

  // console.log(items)

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
              {
                items.map(item => (
                  <CartItem key={item.localCartItemId} item={item} setShowCart={setShowCart} />
                ))
              }
            </>
            :
            <span className='list-empty'>No Products</span>
        ) : <CircularProgress />}
      </div>

      <div className="actions">
        {noOfProducts > 0 ?
          <button onClick={handleCheckoutClicked} className='btn-1'>PROCEED TO CHECKOUT</button>
          :
          <button onClick={() => navigate('/products/women')} className='btn-1'>GO SHOPPING</button>
        }
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
        <Link to="/cart" className='view-cart' onClick={() => setShowCart(false)}> View Shopping Bag </Link>
      </div>

    </div>
  )
}

export default Cart