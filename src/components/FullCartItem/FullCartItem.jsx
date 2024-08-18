import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import { Close, Delete, DeleteForeverOutlined, DeleteOutline, FavoriteBorder } from '@mui/icons-material';
import './FullCartItem.scss';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateCartItem } from '../../../redux/cartReducer';
import useFetch from '../../../hooks/useFetch';
import { Skeleton } from '@mui/material';

const FullCartItem = ({ item, setShowCart }) => {
    // console.log(item)
    const { data: stockData, loading, error } = useFetch(
        `/stocks?filters[product][id][$eq]=${item.productId}&filters[size][id][$eq]=${item.size.id}`
    );
    // console.log(stockData)
    const [availableStock, setAvailableStock] = useState(null);


    useEffect(() => {
        setAvailableStock(stockData?.[0]?.attributes?.stock)
    }, [stockData]);


    useEffect(() => {
        console.log('availableStock', availableStock)
    }, [availableStock]);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleRemoveFromCart = (e, { localCartItemId, strapiCartItemId }) => {
        // console.log(localCartItemId)\
        // Prevents the parent click handler from firing
        dispatch(removeItemFromCart({ localCartItemId, strapiCartItemId }))
            .unwrap()
            .then(() => {
                console.log('Item removed from cart successfully');
            })
            .catch((error) => {
                console.error('Failed to remove item from cart:', error);
            });

    };


    const handleUpdateCartItem = async (e, { requestedQuantity }) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            // Dispatch the update action and unwrap the result
            const response = await dispatch(updateCartItem({
                currentQuantity: item.quantity,
                requestedQuantity: requestedQuantity,
                localCartItemId: item.localCartItemId,
                productId: item.productId,
                size: item.size,
                strapiCartItemId: item.strapiCartItemId,
            })).unwrap(); // Unwrap to get the result

            console.log('response', response)
            // Update local state with the result
            const latestAvaialableStockData = response.responseData?.availableStock;

            setAvailableStock(latestAvaialableStockData || availableStock);

        } catch (error) {
            const latestAvaialableStockData = error?.status === 'out-of-stock' ? 0 : error?.availableStock;

            setAvailableStock(latestAvaialableStockData);
            console.error('Failed to update cart item:', error);
        }
    };

    const handleRedirect = () => {
        // console.log('Navigating to',`/product/${item.productId}`)
        navigate(`/product/${item.productId}`)
        setShowCart(false)
    }

    return (
        <div
            className="full-cart-item"
        >

            <div className="img-wrapper">
                <OptimizedImage
                    // wrapperClassName='imgWrapper'
                    className={'img'}
                    alt=""
                    src={import.meta.env.VITE_UPLOAD_URL + item.img}
                    effect="blur"
                    onClick={handleRedirect}
                />
            </div>

            <div className="body">
                <div className="wrapper" onClick={handleRedirect}>
                    <div className="details">
                        <h1 className='title'>{item.title}{item.outOfStock ? '(Out Of Stock)' : ''}</h1>
                        {/* <p>{item.desc.substring(0, 100)}</p> */}
                        <div className='size'><span>Size:</span> <span className="value">{item?.size?.size}</span></div>
                    </div>
                    <div className="delete">
                        <DeleteForeverOutlined sx={{ m: 0, p: 0, minWidth: 0 }} className='delete-icon' onClick={(e) => handleRemoveFromCart(e, { localCartItemId: item.localCartItemId, strapiCartItemId: item.strapiCartItemId })} />
                        {/* <span>Remove</span> */}
                    </div>
                </div>

                <div className="bottom">

                    <div className='price-calc'>
                        {availableStock != null || undefined ?
                            <div className="quantity">
                                <button
                                    className={`reduce ${item.quantity <= 1 ? 'disabled' : ''}`}
                                    disabled={item.quantity <= 1}
                                    onClick={(e) => {
                                        handleUpdateCartItem(e, { requestedQuantity: item.quantity - 1 })// Prevents the parent click handler from firing
                                    }
                                    }
                                >
                                    <span>-</span>
                                </button>
                                <span className="no-of-items">{item.quantity}</span>
                                <button
                                    className={`add ${item.quantity >= availableStock ? 'disabled' : ''}`}
                                    disabled={item.quantity >= availableStock}
                                    onClick={(e) => {
                                        handleUpdateCartItem(e, { requestedQuantity: item.quantity + 1 }); // Prevents the parent click handler from firing
                                    }}
                                ><span>+</span></button>


                            </div>
                            :
                            <Skeleton variant="rectangular" width={71} height={20} />
                        }
                        {/* <div className="vertical-line"></div> */}
                    </div>
                    <div className="price">
                        <span className='sub-price'>({item.quantity} x ${item.price})</span>
                        <span className="total-price-per-item">${item.price * item.quantity}</span>
                    </div>

                </div>
            </div>





        </div>
    )
}

export default FullCartItem