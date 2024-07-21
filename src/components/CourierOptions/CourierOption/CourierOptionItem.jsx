import React, { memo, useState } from 'react'
import './CourierOptionItem.scss'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const CourierOptionItem = memo(({ courierOption, isSelected, handleChangeCourierOption }) => {
  // console.log('rendered')
  return (
    <div
      className={`courierOptionItem ${isSelected ? 'selected' : ''}`}
      onClick={() => handleChangeCourierOption(courierOption.courier_id)}
    >
      <div className="icon-wrapper">
        <img
          src={`${courierOption.courier_logo_url
            }`}
          alt=""
          className='icon'
          loading='lazy' />
      </div>

      <div className="text">
        <h6 className="title">{courierOption.courier_name}</h6>
        <p>Delivery: {`${courierOption.min_delivery_time}-${courierOption.max_delivery_time} Days`}</p>
      </div>

      <div className="end">
        <span className='amount'>${courierOption.total_charge}</span>
        <div className='radio'>{isSelected ? <RadioButtonCheckedIcon fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />}</div>
      </div>
    </div>
  )
})

export default CourierOptionItem