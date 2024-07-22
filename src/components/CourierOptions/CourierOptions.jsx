import React, { useCallback, useEffect, useState } from 'react'
import './CourierOptions.scss'
import { useDispatch, useSelector } from 'react-redux'
import { rates } from '../../utils/rates'
import CourierOptionItem from './CourierOption/CourierOptionItem'
import { nextStep, setSelectedCourier } from '../../redux/checkoutReducer'



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

  const courierOptions = rates.data.rates


  const selectedCourierOption = useSelector(state => state.checkout.selectedCourier);
  const dispatch = useDispatch()

  const handleChangeSelectedCourierOption = useCallback((courier_id) => {
    dispatch(setSelectedCourier(courier_id));
  }, []);

  useEffect(() => {
    // console.log(selectedCourierOption);
  }, [selectedCourierOption])

  const [showAll, setShowAll] = useState(false)
  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }


  const handleSubmitCourierOtion = () => {
    dispatch(nextStep())
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
          {courierOptions.slice(0, 2).map((courierOption, index) => (
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
          {courierOptions.slice(2,).map((courierOption, index) => (
            <CourierOptionItem
              courierOption={courierOption}
              key={index}
              isSelected={courierOption.courier_id === selectedCourierOption.courier_id}
              handleChangeCourierOption={handleChangeSelectedCourierOption}
            />
          ))}
        </div>
        <button onClick={handleSubmitCourierOtion} className="btn-1 submit-btn" disabled={false} >
          Save & Continue
        </button>
      </form>
    </div>
  )
}

export default CourierOptions