import React from 'react'
import './ShippingTab.scss'
import FormComponent from '../../../components/Form/Form'
import { useSelector } from 'react-redux';
import axios from 'axios';

const ShippingTab = () => {
    

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

export default ShippingTab