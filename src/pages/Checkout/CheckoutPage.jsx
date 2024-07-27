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
import StepWizard from './StepWizard/StepWizard'
import ShippingTab from './ShippingTab/ShippingTab'
import calculateNoOfProducts from '../../utils/calculateNoOfProducts'
import { current } from '@reduxjs/toolkit'
import BillingTab from './BillingTab/BillingTab'
import { setShippingInfo } from '../../redux/checkoutReducer'
import { getShippingInfoFromSession } from '../../utils/session'


const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // Products
  const products = useSelector(state => state.cart.cartItems)
  const selectedCourier = useSelector(state => state.checkout.selectedCourier);

  const currentStep = useSelector(state => state.checkout.currentStep);
  const previewedStep = useSelector(state => state.checkout.previewedStep);

  // const billingInfo = useSelector(state => state.checkout.billingInfo);
  // const shippingInfo = useSelector(state => state.checkout.shippingInfo);
  
  // console.log('previewedStep', previewedStep, '\n\n' + 'currentStep', currentStep)
  // Calculate totals
  const subtotal = useMemo(() => {
    let total = 0;
    products.forEach(item => {
      total += item.price;
    });
    return total.toFixed(2);
  }, [products]);

  const vat = useMemo(() => (subtotal * 0.2).toFixed(2), [subtotal]);

  const totalAmount = useMemo(() => {
    let total = parseFloat(subtotal) + parseFloat(vat);
    if (selectedCourier) {
      total += selectedCourier.total_charge;
    }
    return total.toFixed(2);
  }, [subtotal, vat, selectedCourier]);
  // console.log(products);

  // Price

  // dispatch

  // Payment


  

  //Checkout Step

  const handleChangeCheckoutStep = () => {

  }




  const renderCurrentTab = () => {
    switch (previewedStep?.id || currentStep.id) {
      case 1:
        return <ShippingTab subtotal={subtotal} totalAmount={totalAmount} vat={vat} quantity={products.length} />
      case 2:
        return <CourierOptions />
      case 3:
        return <BillingTab totalAmount={totalAmount}/>
    }
  }

  return (
    <div className="checkout-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 tabs">
            <StepWizard />
            <div className="current-tab">
              {renderCurrentTab()}
            </div>
          </div>

          <div className="col-md-6 order-summary">
            <div className="wrapper">
              <div className="top">
                <div className="order-total">
                  <h5 className="heading">Order Summary </h5>

                  <div className="summary-items">
                    <div className="summary-item">No. of Items: <span className="value">{calculateNoOfProducts(products)}</span></div>
                    <div className="summary-item">Subtotal: <span className="value">${subtotal}</span></div>
                    <div className="summary-item">VAT(20%): <span className="value">${vat}</span></div>
                    {selectedCourier && <div className="summary-item">Shipping: <span className="value">${selectedCourier.total_charge}</span></div>}
                    <div className="summary-item total">Total: <span className="value">${totalAmount}</span></div>
                  </div></div>
              </div>
              <div className="checkout-items">
                {/* <div className="top">
                  <span className="heading">Order Items</span>
                  <p >Check your items and confirm them before checking out.</p>
                </div> */}

                <div className="products">
                  {products.length > 0 ?
                    <>
                      {
                        products.map((item, index) => (
                          <div
                            className="item"
                            key={index}
                          >
                            <Link
                              to={`/product/${item.productId}`}
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
                                  <span className='subtotal'>${item.price}</span>

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

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CheckoutPage