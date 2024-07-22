import React, { useCallback, useEffect, useState } from 'react'
import './CourierOptions.scss'
import { useDispatch, useSelector } from 'react-redux'
import { rates } from '../../utils/rates'
import CourierOptionItem from './CourierOption/CourierOptionItem'
import { setSelectedCourier } from '../../redux/checkoutReducer'



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

  

  return (
    <div className="courier-selection-tab">
      <div className="top">
        <h6 className="tab-title"> Shipping Method </h6>
        <p>Pick your preferred shipping option and finish your order.</p>
      </div>
      <form className="selectCourierOptions">
        <div class="recommended">
          <div class="heading">
            <span class="title">Recommended: </span>
          </div>
          {courierOptions.slice(0, 3).map((courierOption, index) => (
            <CourierOptionItem
              courierOption={courierOption}
              key={index}
              isSelected={courierOption.courier_id === selectedCourierOption.courier_id}
              handleChangeCourierOption={handleChangeSelectedCourierOption}
            />
          ))}
        </div>
        <div class={`others`}>
          <div class="heading">
            <span class="title">Others: </span>
          </div>
          {courierOptions.slice(3,).map((courierOption, index) => (
            <CourierOptionItem
              courierOption={courierOption}
              key={index}
              isSelected={courierOption.courier_id === selectedCourierOption.courier_id}
              handleChangeCourierOption={handleChangeSelectedCourierOption}
            />
          ))}
        </div>
      </form>
    </div>
  )
}

export default CourierOptions