import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import "./CheckoutPage.scss"
import { useDispatch, useSelector } from 'react-redux'

import { useBeforeUnload, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import CourierOptions from '../../components/CourierOptions/CourierOptions'
import StepWizard from './StepWizard/StepWizard'
import ShippingTab from './ShippingTab/ShippingTab'
import BillingTab from './BillingTab/BillingTab'
import { CircularProgress } from '@mui/material'
import CheckoutItem from './CheckoutItem/CheckoutItem'
import { endCheckoutSession, setBillingInfo, setCheckoutSessionExpiryDate, setClientSecret } from '../../redux/checkout/checkoutReducer'
import { ShoppingBagOutlined } from '@mui/icons-material'
import { selectCartTotals, selectItemsByStock } from '../../redux/cart/cartReducer.js'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import { makeRequest } from '../../makeRequest.js'


const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  // Products
  const { inStockItems } = useSelector(selectItemsByStock)


  const { vat, totalAmount, subtotal, noOfItems } = useSelector(selectCartTotals)

  const [stripePromise, setStripePromise] = useState(null);

  // console.log('inStockItems', inStockItems)

  const { previewedStep, currentStep, selectedCourier } = useSelector(state => state.checkout);


  // const billingInfo = useSelector(state => state.checkout.billingInfo);
  // const shippingInfo = useSelector(state => state.checkout.shippingInfo);

  // console.log('previewedStep', previewedStep, '\n\n' + 'currentStep', currentStep)
  // Calculate totals

  // console.log(products);

  // Price

  // dispatch

  // Payment



  // console.log('checkoutSessionAlreadyExists', checkoutSessionAlreadyExists)
  // console.log('checkoutSessionDuration', checkoutSessionDuration)
  const isInitialMount = useRef(true);

  useEffect(() => {
    setStripePromise(loadStripe('pk_test_51OzQqiP8nMwtf7KwjeDBvSrJh0QU2AMmJncITWpVrXW9Cm8XesZc1MqofLogMUrphlOB0exTEsHSQ91mJoA5V94u00JrVmVkWL'))
  }, [])
  //Checkout Step
  const sessionTimeoutIdRef = useRef(null);
  const warningTimeoutIdRef = useRef(null);

  useEffect(() => {
    // Handle SPA navigation

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return
    }


    // const handleInitializeCheckout = async () => {
    //   try {
    //     // console.log('checkout initiated')
    //     const response = await dispatch(initializeCheckout({ reserve: true })).unwrap();
    //     console.log('response', response);

    //     const { validationResults, checkoutSessionAlreadyExists } = response;

    //     if (!checkoutSessionAlreadyExists) {
    //       const { successfulItems, outOfStockItems } = validationResults



    //       // console.log('response', response);
    //       if (outOfStockItems?.length > 0) {
    //         navigate('/cart');
    //         // toast.warning('Some items are out of stock')
    //         return
    //       }


    //       if (successfulItems?.length <= 0) {
    //         navigate('/cart');
    //         toast.warning('Your cart is empty, add some items!')
    //         return
    //       }

    //       dispatch(setCartMode(CART_MODE.REVIEW));
    //     }
    //     else {
    //       toast.info('Checkout session restored')
    //     }
    //   } catch (error) {
    //     console.error('Error initializing checkout', error);
    //   }
    // };
    // handleInitializeCheckout();

    return () => {
      console.log('cleanup')
      // if (!isReloadingRef.current) {
      // Only end the session if it's not a reload
      dispatch(setCheckoutSessionExpiryDate(null))

      dispatch(endCheckoutSession());
      // }
      console.log('sessionTimeoutId', sessionTimeoutIdRef.current)
      clearTimeout(sessionTimeoutIdRef.current);
      clearTimeout(warningTimeoutIdRef.current);
    };

  }, [dispatch]);


  // useEffect(() => {

  // }, [])
  // useEffect(() => {
  //   // Set up event listener for route changes
  //   const handleRouteChange = () => {
  //     // Clear session state when navigating away from the checkout route
  //     if (location.pathname !== '/checkout') {
  //       sessionStorage.removeItem('checkoutState');
  //     }
  //   };

  //   // Listen for route changes
  //   handleRouteChange();

  //   // Clean up listener
  //   return () => {
  //     // Remove session state on component unmount if necessary
  //     sessionStorage.removeItem('checkoutState');
  //   };
  // }, [location.pathname]);

  // useEffect(() => {
  //   console.log('Component mounted');

  //   return () => {
  //     console.log('Cleanup triggered');
  //     // dispatch(endCheckoutSession());
  //   };
  // }, [dispatch]);

  const renderCurrentTab = () => {
    switch (previewedStep?.id || currentStep?.id) {
      case 1:
        return <ShippingTab subtotal={subtotal} totalAmount={totalAmount} vat={vat} quantity={inStockItems.length} />
      case 2:
        return <CourierOptions />
      case 3:
        return <BillingTab totalAmount={totalAmount} />
    }
  }

  return (
    <>
      {stripePromise &&
        < Elements stripe={stripePromise} options={{ mode: 'payment', currency: 'usd',  amount: 1099,}}>
          <div className="checkout-page">
            <div className="container">
              <div className="row">
                <div className="col-md-6 tabs">
                  <div className="tabs-wrapper">
                    <StepWizard />
                    <div className="current-tab">
                      {renderCurrentTab()}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 order-summary">
                  <div className="summary-wrapper">

                    <div className="header">
                      <h5 className="heading">Order Summary </h5>
                    </div>

                    <div className="checkout-items">
                      {/* <div className="top">
                  <span className="heading">Order Items</span>
                  <p >Check your items and confirm them before checking out.</p>
                </div> */}

                      <div className="items">
                        {inStockItems.length > 0 ?
                          <>
                            {inStockItems ? (
                              inStockItems.length > 0 ?
                                <>
                                  {
                                    inStockItems.map(item => (
                                      <CheckoutItem key={item.localCartItemId} item={item} />
                                    ))
                                  }
                                </>
                                :
                                <span className='list-empty'>No Products</span>
                            ) : <CircularProgress />}
                          </>
                          :

                          <div className='list-empty'>
                            <span>No Products</span>
                            <button onClick={() => navigate('/products/women')} className='xta-btn'><ShoppingBagOutlined fontSize='small' /> Continue Shopping</button>
                          </div>}
                      </div>
                    </div>
                    <div className="totals">
                      <div className="order-total">
                        <div className="summary-items">
                          <div className="summary-item">No. of Items: <span className="value">{noOfItems}</span></div>
                          <div className="summary-item">Subtotal: <span className="value">${subtotal}</span></div>
                          <div className="summary-item">VAT(20%): <span className="value">${vat}</span></div>
                          {selectedCourier && <div className="summary-item">Shipping: <span className="value">${selectedCourier.total_charge}</span></div>}
                          <div className="summary-item total">Total: <span className="value">${totalAmount}</span></div>
                        </div></div>
                    </div>


                  </div>
                </div>
              </div>
            </div>

          </div>
        </Elements >
      }
    </>

  )
}

export default CheckoutPage