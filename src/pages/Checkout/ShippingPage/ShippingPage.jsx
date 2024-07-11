import React, { useEffect, useMemo, useState } from 'react'
import "./ShippingPage.scss"
import { Close, DeleteOutlineOutlined, ShoppingBag, ShoppingBagOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../../../redux/cartReducer'
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from '../../../makeRequest'
import { Link } from 'react-router-dom'
import OptimizedImage from '../../../components/OptimizedImage/OptimizedImage'
import FormComponent from '../../../components/Form/Form'
import * as yup from "yup";
import CourierOptions from '../../../components/CourierOptions/CourierOptions'


const ShippingPage = ({ showCart, setShowCart }) => {
  // Products
  const products = useSelector(state => state.cart.products)
  console.log(products)

  // Price
  const price = useMemo(() => {
    let total = 0;
    products.forEach(item => {
      total += item.price;
    });
    return total.toFixed(2);
  }, [products]);

  const vat = useMemo(() => (price * 0.2).toFixed(2), [price]);
  const totalPrice = useMemo(() => (parseFloat(price) + parseFloat(vat)).toFixed(2), [price, vat]);

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
  const formItems = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: '',
      initialValue: '',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: '',
      initialValue: ''
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: '',
      initialValue: ''
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '',
      initialValue: ''
    },
    {
      name: 'streetAddress',
      label: 'Street Address',
      type: 'text',
      as: 'custom',
      customInputName: 'streetAddress',
      placeholder: '',
      initialValue: ''
    },

  ]

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required'),
    phoneNumber: yup.string().matches(
      /^(\+\d{1,3})?(\d{10,14})$/, // Regex for phone number with or without country code
      'Invalid phone number'
    ).required('Phone Number is required'),
    details: yup.string().required('Please fill in the details'),
    streetAddress
  })


  // Shipping
 

  return (
    <div className="checkout-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 cart-body">
            <div className="top">
              <span className="heading">Order Summary</span>
              <p >Check your items and select your preferred shipping method.</p>
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
                              <span className='price'>{`2 x $${item.price}`}</span>

                            </div>
                          </div>
                        </Link>
                        <span className='quantity'>QTY : {2}</span>
                        {/* <Close className='delete' onClick={() => dispatch(removeItem(item.cartItemId))} /> */}
                      </div>
                    ))
                  }
                </>
                :

                <div className='list-empty'>
                  <span>No Products</span>
                  <button onClick={handlePayment} className='btn-1'><ShoppingBagOutlined fontSize='small' /> Continue Shopping</button>
                </div>}
            </div>
          </div>

          <div className="col-md-6 actions-wrapper">
            <div className="actions-card">

              <div className="top">
                <h5 className="heading"> Shipping Address</h5>
                <p>Enter your shipping details for delivery.</p>
              </div>

              <div className="checkout">
                {/* <CourierOptions /> */}

                <FormComponent
                  items={formItems}
                  validationSchema={validationSchema}
                  submitBtnText="Save & Continue"
                  
                >
                  <div className="summary-items">
                    <div className="summary-item">No. of Items: <span className="value">{products.length}</span></div>
                    <div className="summary-item">Subtotal: <span className="value">${price}</span></div>
                    <div className="summary-item">VAT(20%): <span className="value">${vat}</span></div>
                    <div className="summary-item total">Total: <span className="value">${totalPrice}</span></div>
                  </div>
                </FormComponent>


                {/* <button onClick={handlePayment} className='btn-1'>PROCEED TO CHECKOUT</button> */}
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShippingPage