import React, { useEffect } from 'react'
import './CTAButton.scss'
import { CircularProgress } from '@mui/material'
import classNames from 'classnames'
const CTAButton = ({ isSubmitting, onClick, buttonText, disabled }) => {

    useEffect(()=>{
        console.log('disabled', disabled)
    }, [disabled])
    
    return (
        <button type='button' onClick={onClick} className={classNames("cta-button", { disabled })} disabled={disabled}>
            {isSubmitting ? <CircularProgress
                size={15}
                thickness={2}
                style={{ color: '#ffffff' }} /> : buttonText}
        </button>
    )
}

export default CTAButton
