import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from '../../../components/OptimizedImage/OptimizedImage';
import { Close, Delete, DeleteForeverOutlined, DeleteOutline, FavoriteBorder } from '@mui/icons-material';
import './CheckoutItem.scss';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, setOutOfStock, setShowCart, updateCartItem } from '../../../redux/cart/cartReducer';
import useFetch from '../../../hooks/useFetch';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';

const CheckoutItem = ({ item }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()







    const handleRedirect = () => {
        // console.log('Navigating to',`/product/${item.productId}`)
        navigate(`/product/${item.productId}`)
        dispatch(setShowCart(false))
    }

    return (
        <div
            className="checkout-item"
        >



            <div className="body">
                <div className="img-wrapper">
                    <OptimizedImage
                        // wrapperClassName='imgWrapper'
                        className={'img'}
                        alt=""
                        src={import.meta.env.VITE_UPLOAD_URL + item.img}
                        effect="blur"
                    />
                    <div className="img-quantity">
                        <span className=''>{item.quantity}</span>
                    </div>
                </div>

                <div className="wrapper" >
                    <div className="top">
                        <div className="details">
                            <h6 className='title'>{item.title}</h6>
                            {/* <p>{item.desc.substring(0, 100)}</p> */}
                            <div className='stock'>
                                <div className="size">
                                    <span>Size:</span> <span className="value">{item?.size?.size}</span>
                                </div>
                            </div>
                            {item.reduced && <div className="warning">
                                Quantity reduced to {item.quantity} due to availability.
                            </div>}
                        </div>
                        <div className="price">
                            <span className="total-price-per-item">${item?.price * item.quantity}</span>
                        </div>
                    </div>


                </div>
            </div>




        </div >
    )
}

export default CheckoutItem