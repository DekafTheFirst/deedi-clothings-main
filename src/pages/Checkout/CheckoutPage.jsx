import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import "./CheckoutPage.scss"
import { useDispatch, useSelector } from 'react-redux'

import { useLoaderData, useNavigate } from 'react-router-dom'
import CourierOptions from '../../components/CourierOptions/CourierOptions'
import StepWizard from './StepWizard/StepWizard'
import ShippingTab from './ShippingTab/ShippingTab'
import BillingTab from './BillingTab/BillingTab'
import { CircularProgress } from '@mui/material'
import CheckoutItem from './CheckoutItem/CheckoutItem'
import { endCheckoutSession, sessionExpired } from '../../redux/checkout/checkoutReducer'
import { ShoppingBagOutlined } from '@mui/icons-material'
import { selectCartTotals, selectItemsByStock } from '../../redux/cart/cartReducer.js'
import { toast } from 'react-toastify'


const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Products
  const items = useSelector(state => state.cart.items);

  const { inStockItems } = useSelector(selectItemsByStock)






  // console.log('inStockItems', inStockItems)
  const selectedCourier = useSelector(state => state.checkout.selectedCourier);

  const currentStep = useSelector(state => state.checkout.currentStep);
  const previewedStep = useSelector(state => state.checkout.previewedStep);


  // const billingInfo = useSelector(state => state.checkout.billingInfo);
  // const shippingInfo = useSelector(state => state.checkout.shippingInfo);

  // console.log('previewedStep', previewedStep, '\n\n' + 'currentStep', currentStep)
  // Calculate totals
  const subtotal = useMemo(() => {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  }, [items]);

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



  const isInitialMount = useRef(true);

  //Checkout Step
  const checkoutSessionDuration = useLoaderData();
  const sessionTimeoutIdRef = useRef(null);
  const warningTimeoutIdRef = useRef(null);

  let sessionTimeoutId, warningTimeoutId

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

    //     const { validationResults, sessionAlreadyExists } = response;

    //     if (!sessionAlreadyExists) {
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


    if (checkoutSessionDuration) {
      sessionTimeoutId = setTimeout(() => {
        console.log('cleared');
        toast.error('Your checkout session has expired')
        navigate('/cart')
        // dispatch(sessionExpired());
      }, checkoutSessionDuration);

      // warningTimeoutIdRef.current = setTimeout(() => {
      //   dispatch({ type: 'checkout/warningAboutToExpire' }); // Replace with your action
      // }, checkoutSessionDuration - 5 * 60 * 1000); // Warn 5 minutes before expiration
    }

    const handleBeforeUnload = (event) => {
      // dispatch(endCheckoutSession());
      event.preventDefault();
      event.returnValue = 'You';
    };

    // window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      console.log('cleanup')
      // window.removeEventListener('beforeunload', handleBeforeUnload);
      dispatch(endCheckoutSession());
      console.log('sessionTimeoutId', sessionTimeoutId)
      clearTimeout(sessionTimeoutId);
      clearTimeout(warningTimeoutIdRef.current);
    };

  }, [dispatch]);


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
  const { noOfItems } = useSelector(selectCartTotals)

  const renderCurrentTab = () => {
    switch (previewedStep?.id || currentStep?.id) {
      case 1:
        return <ShippingTab subtotal={subtotal} totalAmount={totalAmount} vat={vat} quantity={items.length} />
      case 2:
        return <CourierOptions />
      case 3:
        return <BillingTab totalAmount={totalAmount} />
    }
  }

  return (
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
                      <button onClick={() => navigate('/products/women')} className='btn-1'><ShoppingBagOutlined fontSize='small' /> Continue Shopping</button>
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
  )
}

export default CheckoutPage