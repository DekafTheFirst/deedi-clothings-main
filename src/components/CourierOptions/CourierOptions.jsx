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
    console.log(selectedCourierOption);
  }, [selectedCourierOption])



  return (
    <form className="selectCourierOptions">
      {courierOptions.map((courierOption, index) => (
        <CourierOptionItem
          courierOption={courierOption}
          key={index}
          isSelected={courierOption.courier_id === selectedCourierOption.courier_id}
          handleChangeCourierOption={handleChangeSelectedCourierOption}
        />
      ))}
    </form>
  )
}

export default CourierOptions