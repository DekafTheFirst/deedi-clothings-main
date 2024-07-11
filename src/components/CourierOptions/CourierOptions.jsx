import React, { useState } from 'react'

import './CourierOptions.scss'

import CourierOption from './CourierOption/CourierOptionItem'



const CourierOptions = () => {
  const courierOptions = [
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

  const [selectedCourierOption, setSelectedCourierOption] = useState(courierOptions[0].slug);

  const handleChangeSelectedCourierOption = (slug) => {
    setSelectedCourierOption(slug)
  }





  return (
    <form className="selectCourierOptions">
      {courierOptions.map((courierOption, index) => (
        <CourierOption
          courierOption={courierOption}
          key={index}
          isSelected={courierOption.slug === selectedCourierOption}
          handleChangeCourierOption={handleChangeSelectedCourierOption}
        />
      ))}
    </form>
  )
}

export default CourierOptions