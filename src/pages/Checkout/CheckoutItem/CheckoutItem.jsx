import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from '../../../components/OptimizedImage/OptimizedImage';
import { Close, Delete, DeleteForeverOutlined, DeleteOutline, FavoriteBorder } from '@mui/icons-material';
import './CheckoutItem.scss';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, setOutOfStock, setShowCart, updateCartItem } from '../../../redux/cartReducer';
import useFetch from '../../../hooks/useFetch';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';

const CheckoutItem = ({ item }) => {
    const { data, loading, error } = useFetch(
        `/products/${item.productId}?populate=img`
    );
    const product = data?.attributes
    const productImg = product?.img?.data?.[0]?.attributes?.formats?.thumbnail?.url || product?.img?.data?.[0]?.attributes?.url
    // console.log('product', product)

    // useEffect(() => {
    //     console.log('product', data)
    // }, [data]);



    // const product = stockData?.[0]?.attributes?.product?.data?.attributes


    // useEffect(() => {
    //     // console.log('fetchedAvailableStock', fetchedAvailableStock)
    //     const validateStock = () => {
    //         if ((fetchedAvailableStock < item.quantity) && !item.outOfStock) {
    //             callUpdateDispatch(fetchedAvailableStock)
    //         }

    //         setAvailableStock(fetchedAvailableStock);

    //     }
    //     // console.log('product:', product)


    //     validateStock()


    // }, [fetchedAvailableStock]);





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
                <div className="img-wrapper" onClick={handleRedirect}>
                    <OptimizedImage
                        // wrapperClassName='imgWrapper'
                        className={'img'}
                        alt=""
                        src={import.meta.env.VITE_UPLOAD_URL + productImg}
                        effect="blur"
                    />
                    <div className="img-quantity">
                        <span className=''>{item.quantity}</span>
                    </div>
                </div>

                <div className="wrapper" onClick={handleRedirect} >
                    <div className="top">
                        <div className="details">
                            {product?.title ? <h6 className='title'>{product.title}</h6> : <Skeleton className="title" variant="text" sx={{ fontSize: '16px' }} />}
                            {/* <p>{item.desc.substring(0, 100)}</p> */}
                            <div className='stock'>
                                <div className="size">
                                    <span>Size:</span> <span className="value">{item?.size?.size}</span>
                                </div>
                            </div>
                        </div>
                        <div className="price">
                            {product?.price ? <span className="total-price-per-item">${product?.price * item.quantity}</span> : <Skeleton className="total-price-per-item" variant="text" sx={{ fontSize: '16px' }} />}
                        </div>
                    </div>


                </div>



                {item.outOfStock && <button className='notify-me'>Notify me</button>}
            </div>




        </div >
    )
}

export default CheckoutItem