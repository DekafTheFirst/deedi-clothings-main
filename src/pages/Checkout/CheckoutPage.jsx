import React, { useEffect, useMemo, useState } from 'react'
import "./CheckoutPage.scss"
import { Close, DeleteOutlineOutlined, ShoppingBag, ShoppingBagOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../../redux/cartReducer'
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from '../../makeRequest'
import { Link, useNavigate } from 'react-router-dom'
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage'
import CourierOptions from '../../components/CourierOptions/CourierOptions'
import ShippingTab from './Shipping/ShippingTab'
import StepWizard from './StepWizard/StepWizard'


const CheckoutPage = ({ showCart, setShowCart }) => {
  const navigate = useNavigate()
  // Products
  const products = useSelector(state => state.cart.products)
  const subtotal = useSelector(state => state.cart.subtotal);
  const vat = useSelector(state => state.cart.vat);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  console.log(products)
  
  // Price
  
  // dispatch
  const dispatch = useDispatch()

  // Payment
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

  // Form Data






  return (
    <div className="checkout-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 checkout-items">
            <div className="top">
              <span className="heading">Order Items</span>
              <p >Check your items and confirm them before checking out.</p>
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
                              <span className='amount'>${item.price}</span>

                            </div>
                          </div>
                        </Link>
                        <span className='quantity'>QTY : {item.quantity}</span>
                        {/* <Close className='delete' onClick={() => dispatch(removeItem(item.cartItemId))} /> */}
                      </div>
                    ))
                  }
                </>
                :

                <div className='list-empty'>
                  <span>No Products</span>
                  <button onClick={() => navigate('/products/women')} className='btn-1'><ShoppingBagOutlined fontSize='small' /> Continue Shopping</button>
                </div>}
            </div>
          </div>

          <div className="col-md-6 checkout-actions-col">
            <div className="wrapper">
              <div className="top">
                <div className="order-summary">
                  <h5 className="heading">Order Summary </h5>

                  <div className="summary-items">
                    <div className="summary-item">No. of Items: <span className="value">{products.length}</span></div>
                    <div className="summary-item">Subtotal: <span className="value">${subtotal}</span></div>
                    <div className="summary-item">VAT(20%): <span className="value">${vat}</span></div>
                    <div className="summary-item total">Total: <span className="value">${totalAmount}</span></div>
                  </div></div>
              </div>

              <div className="tabs">
                <h5 className="heading">Checkout Process</h5>
                <StepWizard />
                <div className="current-tab">
                  <ShippingTab subtotal={subtotal} totalAmount={totalAmount} vat={vat} quantity={products.length} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CheckoutPage