import React, { useCallback, useEffect, useState } from 'react'
import './CourierOptions.scss'
import { useDispatch, useSelector } from 'react-redux'
import CourierOptionItem from './CourierOption/CourierOptionItem'
import { nextStep, setClientSecret, setSelectedCourierId, setStripeTaxCalculationData } from '../../redux/checkout/checkoutReducer'
import CTAButton from '../CTAButton/CTAButton'
import { makeRequest } from '../../makeRequest'
import { selectCartTotals, selectItemsByStock } from '../../redux/cart/cartReducer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const CourierOptions = () => {
  // const courierOptions = [
  //   {
  //     title: 'Fedex Delivery',
  //     slug: 'fedex',
  //     img: 'img/fedex.png',
  //   },
  //   {
  //     title: 'DHL Delivery',
  //     slug: 'dhl',
  //     img: 'img/dhl.png'
  //   },
  //   {
  //     title: 'UPS Delivery',
  //     slug: 'ups',
  //     img: 'img/ups.png'
  //   },
  // ]

  const navigate = useNavigate()
  const { rates: courierOptions, selectedCourierId, shippingInfo } = useSelector(state => state.checkout)
  const { inStockItems } = useSelector(selectItemsByStock)
  const { vat, totalAmount, subtotal, noOfItems } = useSelector(selectCartTotals)

  const selectedCourierOption = courierOptions?.find(option => option.courier_id === selectedCourierId) || courierOptions?.[0];
  console.log(courierOptions);
  console.log('selectedCourierOption', selectedCourierOption);

  const dispatch = useDispatch()
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleChangeSelectedCourierOption = useCallback((courier_id) => {
    console.log(courier_id)
    dispatch(setSelectedCourierId(courier_id));
  }, []);

  useEffect(() => {
    // console.log(selectedCourierOption);
  }, [selectedCourierOption])

  const [showAll, setShowAll] = useState(false)
  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }


  const handleSubmitCourierOtion = async () => {
    let clientSecret;
    try {
      console.log('shipping info', shippingInfo)
      const { data } = await makeRequest.post('/checkout/create-payment-intent', {
        items: inStockItems,
        shippingInfo,
        courierId: selectedCourierOption?.courier_id
      });



      console.log('data', data)

      clientSecret = data.clientSecret; // Save for further use
      if (!clientSecret) {
        throw new Error('No clientSecret received from backend.');
      }

      setErrorMessage(null);
      dispatch(setClientSecret(clientSecret))
      dispatch(setStripeTaxCalculationData(data.taxCalculation))
      dispatch(nextStep())
    } catch (err) {
      if (err.response?.status === 410 && err.response?.data?.error?.name === 'GoneError') {

        toast.error('Checkout session has expired. Redirecting to cart...');
        // navigate('/cart');
      } else {
        console.error('Error creating payment intent:', err);
        setErrorMessage(err?.response?.data?.error?.message || 'Error creating payment. Please try again.')
        toast.error('Error creating payment. Please try again.');
      }
      setIsProcessing(false);
      return;
    }

  }

  return (
    <div className="courier-selection-tab">
      <div className="top">
        <h6 className="tab-title"> Shipping Method </h6>
        <p>Pick your preferred shipping option and finish your order.</p>
      </div>
      <form className="selectCourierOptions">
        <div className="recommended">
          <div className="heading">
            <span className="title">Recommended: </span>
            <span className={`view-all ${showAll ? 'underlined' : ''}`} onClick={toggleShowAll}>View more</span>
          </div>
          {courierOptions?.slice(0, 2).map((courierOption, index) => (
            <CourierOptionItem
              courierOption={courierOption}
              key={index}
              isSelected={courierOption.courier_id === selectedCourierOption.courier_id}
              handleChangeCourierOption={handleChangeSelectedCourierOption}
            />
          ))}
        </div>
        <div className={`others ${showAll ? 'show' : ''}`}>
          <div className="heading">
            <span className="title">Others: </span>
            <span className="view-all" onClick={toggleShowAll}>Hide</span>
          </div>
          {courierOptions?.slice(2,).map((courierOption, index) => (
            <CourierOptionItem
              courierOption={courierOption}
              key={index}
              isSelected={courierOption.courier_id === selectedCourierOption.courier_id}
              handleChangeCourierOption={handleChangeSelectedCourierOption}
            />
          ))}
        </div>
        <CTAButton onClick={handleSubmitCourierOtion} className="" disabled={false} buttonText={'Proceed To Payment'} />
        {errorMessage && <span className='error'>{errorMessage}</span>}
      </form>
    </div>
  )
}

export default CourierOptions