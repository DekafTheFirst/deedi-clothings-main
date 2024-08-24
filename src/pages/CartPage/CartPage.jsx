import React, { useEffect } from 'react'
import "./CartPage.scss"
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart, resetCart, validateStock } from '../../redux/cartReducer'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../../components/MiniCart/MiniCartItem/CartItem'


const CartPage = () => {
  const items = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  console.log(items);

  const totalPrice = () => {
    let total = 0
    items.forEach(item => (total += item.price * item.quantity));
    return total.toFixed(2)
  }

  const dispatch = useDispatch()

 






  return (
    <div className="cart-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 cart-body">
            <div className="top">
              <span className="heading">Shopping Bag</span>
              <div className="total">
                <span>{`SUBTOTAL(${items ? items.length : '0'})`}</span>
                <span className='amount'>${totalPrice()}</span>
              </div>
            </div>

            <div className="items">
              {items ? (
                items.length > 0 ?
                  <>
                    {
                      items.map(item => (
                        <CartItem key={item.localCartItemId} item={item} cartType='full' />
                      ))
                    }
                  </>
                  :
                  <span className='list-empty'>No items</span>
              ) : <CircularProgress />}


            </div>
          </div>
          <div className="col-md-5 actions-wrapper">
            <div className="actions-card">
              <div className="checkout">
                <div className="summary">
                  <h5 className="heading">Order Summary</h5>
                  <div className="summary-items">
                    <div className="summary-item">Subtotal: <span className="value">${totalPrice()}</span></div>
                    <div className="summary-item">No. of Items: <span className="value">{items.length}</span></div>
                  </div>
                </div>
                <button onClick={() => navigate('/checkout')} className='btn-1'>PROCEED TO CHECKOUT</button>
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
                <Link to="/cart" className='secondary-action'> Continue Shopping </Link>
              </div>
              <div className="info">
                <h5 className="heading"> Accepted Payment Methods</h5>
                <img src="/img/payment-removebg.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartPage