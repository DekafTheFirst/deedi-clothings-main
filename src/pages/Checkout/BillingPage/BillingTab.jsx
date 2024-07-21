import React, { useEffect, useMemo, useState } from 'react'
import "./BillingTab.scss"
import { Close, DeleteOutlineOutlined, ShoppingBag, ShoppingBagOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../../../redux/cartReducer'
import { makeRequest } from '../../../makeRequest'
import { Link } from 'react-router-dom'
import OptimizedImage from '../../../components/OptimizedImage/OptimizedImage'
import FormComponent from '../../../components/Form/Form'
import * as yup from "yup";


const ShippingPage = ({ showCart, setShowCart }) => {

  // Shipping
  const shippingMethods = [
    {
      title: 'Fedex Delivery',
      slug: 'fedex',
      img: 'img/fedex.png',
    },
    {
      title: 'DHL Delivery',
      slug: 'dhl',
      img: 'img/dhl.png'
    },
    {
      title: 'UPS Delivery',
      slug: 'ups',
      img: 'img/ups.png'
    },
  ]

  const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0].slug);

  const handleChangeSelectedShippingMethod = (slug) => {
    setSelectedShippingMethod(slug)
  }

  return (
    <div className="shipping-tab">
      <div className="top">
        <h6 className="tab-title"> Shipping Address</h6>
        <p>Enter your shipping details for delivery.</p>
      </div>

      <div className="checkout">
        {/* <CourierOptions /> */}

        <FormComponent

        >
        </FormComponent>


        {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
      </div>

    </div>
  )
}

export default ShippingPage