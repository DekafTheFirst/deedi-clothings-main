import React, { useState } from 'react'
import './CourierOptionItem.scss'

const CourierOptionItem = ({ courierOption, isSelected, handleChangeCourierOption }) => {

  

  return (
    <div
      className={`courierOptionItem ${isSelected ? 'selected' : ''}`}
      onClick={() => handleChangeCourierOption(courierOption.slug)}
    >
      <div className="icon-wrapper">
        <img src={`${courierOption.img}`} alt="" className='icon' />

      </div>

      <div className="text">
        <h6 className="title">{courierOption.title}</h6>
        <p>Delivery: {'2-3 Work Days'}</p>
      </div>

      <div className="end">
        <span className='amount'>{'Free'}</span>
        <input type='radio' checked={isSelected} />
      </div>
    </div>
  )
}

export default CourierOptionItem