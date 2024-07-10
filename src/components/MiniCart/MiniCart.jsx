import React, { useEffect } from 'react'
import "./MiniCart.scss"
import { Close, DeleteOutlineOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../../redux/cartReducer'
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from '../../makeRequest'
import OptimizedImage from '../OptimizedImage/OptimizedImage'
import { Link, useNavigate } from 'react-router-dom'


const Cart = ({ showCart, setShowCart }) => {

  const navigate = useNavigate();

  const products = useSelector(state => state.cart.products)

  console.log(products)

  const totalPrice = () => {
    let total = 0
    products.forEach(item => (total += item.price));
    return total.toFixed(2)
  }

  const dispatch = useDispatch()



  const stripePromise = loadStripe('pk_test_51OzQqiP8nMwtf7KwjeDBvSrJh0QU2AMmJncITWpVrXW9Cm8XesZc1MqofLogMUrphlOB0exTEsHSQ91mJoA5V94u00JrVmVkWL');

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      console.log(products)

      const res = await makeRequest.post("/orders", {
        products,
      })

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id
      })



    }
    catch (err) {
      console.log(err)
    }
  }

  const handleCheckoutClicked = () => {
    navigate('/checkout-page');
    setShowCart(false);
  }

  return (
    <div className="mini-cart">
      <div className="total">
        <span>{`SUBTOTAL(${products ? products.length : '0'})`}</span>
        <span>${totalPrice()}</span>
      </div>

      <div className="products">
        {products.length > 0 ?
          <>
            {
              products.map(item => (
                <div
                  className="item"
                  key={item.idPerSize}
                >
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={() => setShowCart(false)}
                    className="left">
                    <div className="img-wrapper">
                      <OptimizedImage
                        // wrapperClassName='imgWrapper'
                        className={'img'}
                        alt=""
                        src={import.meta.env.VITE_UPLOAD_URL + item.img}
                        effect="blur"
                      />
                    </div>
                    <div className="details">
                      <h1 className='title'>{item.title}</h1>
                      {/* <p>{item.desc.substring(0, 100)}</p> */}
                      <div className="bottom">
                        <span className='size'>SIZE : {item.size}</span>
                        <span className='price'>{`$${item.price}`}</span>
                      </div>
                    </div>
                  </Link>
                  <Close className='delete' onClick={() => dispatch(removeItem(item.cartItemId))} />
                </div>
              ))
            }
          </>
          :
          <span className='list-empty'>No Products</span>}
      </div>

      <div className="actions">
        <button onClick={handleCheckoutClicked} className='btn-1'>PROCEED TO CHECKOUT</button>
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
        <Link to="/cart-page" className='view-cart' onClick={() => setShowCart(false)}> View Shopping Bag </Link>
      </div>

    </div>
  )
}

export default Cart