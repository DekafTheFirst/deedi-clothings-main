import React, { useMemo, useState } from 'react'
import "./CheckoutPage.scss"
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage'
import CourierOptions from '../../components/CourierOptions/CourierOptions'
import StepWizard from './StepWizard/StepWizard'
import ShippingTab from './ShippingTab/ShippingTab'
import calculateNoOfProducts from '../../utils/calculateNoOfProducts'
import BillingTab from './BillingTab/BillingTab'
import { getCurrentStepFromSession, getShippingInfoFromSession } from '../../utils/session'
import CartItem from '../../components/MiniCart/MiniCartItem/CartItem'
import { CircularProgress } from '@mui/material'
import CheckoutItem from './CheckoutItem/CheckoutItem'


const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // Products
  const items = useSelector(state => state.cart.items)
  const selectedCourier = useSelector(state => state.checkout.selectedCourier);

  const currentStep = useSelector(state => state.checkout.currentStep);
  const previewedStep = useSelector(state => state.checkout.previewedStep);
  const currentStepFromSession = getCurrentStepFromSession();


  const [editingAllowed, setEditingAllowed] = useState(false)
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




  //Checkout Step

  const handleChangeCheckoutStep = () => {

  }




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
                <span className='edit-cart' onClick={() => setEditingAllowed(!editingAllowed)}>{editingAllowed ? 'Done':'Edit Cart'}</span>
              </div>

              <div className="checkout-items">
                {/* <div className="top">
                  <span className="heading">Order Items</span>
                  <p >Check your items and confirm them before checking out.</p>
                </div> */}

                <div className="items">
                  {items.length > 0 ?
                    <>

                      {items ? (
                        items.length > 0 ?
                          <>
                            {
                              items.map(item => (
                                <CheckoutItem key={item.localCartItemId} item={item} editingAllowed={editingAllowed} />
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
                    <div className="summary-item">No. of Items: <span className="value">{calculateNoOfProducts(items)}</span></div>
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