import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import { Close, Delete, DeleteForeverOutlined, DeleteOutline, FavoriteBorder } from '@mui/icons-material';
import './CartItem.scss';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, setOutOfStock, setShowCart, updateCartItem } from '../../../redux/cartReducer';
import useFetch from '../../../hooks/useFetch';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';

const CartItem = ({ item, cartType }) => {
    // console.log(item)
    const { data: stockData, loading, error } = useFetch(
        `/stocks?filters[product][id][$eq]=${item.productId}&filters[size][id][$eq]=${item.size.id}&populate=product`
    );

    // const { data: product, loading, error } = useFetch(
    //     `/products?filters[id][$eq]=${item.productId}&filters[stocks][size][id][$eq]=${item.size.id}`
    // );
    const product = stockData?.[0]?.attributes?.product?.data?.attributes
    const [availableStock, setAvailableStock] = useState(null);

    const fetchedAvailableStock = stockData?.[0]?.attributes?.stock

    useEffect(() => {
        console.log('fetchedAvailableStock', fetchedAvailableStock)
        const validateStock = () => {
            if ((fetchedAvailableStock < item.quantity) && !item.outOfStock) {
                callUpdateDispatch(fetchedAvailableStock)
            }

            setAvailableStock(fetchedAvailableStock);

        }

        validateStock()


    }, [fetchedAvailableStock]);


    useEffect(() => {
        console.log('availableStock', availableStock)
    }, [availableStock]);

    const isOutOfStock = availableStock <= 1;

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

    const callUpdateDispatch = async (requestedQuantity) => {
        console.log('reqested quantity', requestedQuantity)
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
    }

    const handleUpdateCartItem = (e, { requestedQuantity }) => {
        e.preventDefault();
        e.stopPropagation();
        callUpdateDispatch(requestedQuantity)
    };

    const handleRedirect = () => {
        // console.log('Navigating to',`/product/${item.productId}`)
        navigate(`/product/${item.productId}`)
        dispatch(setShowCart(false))
    }

    return (
        <div
            className="cart-item"
        >

            <div className="img-wrapper" onClick={handleRedirect}>
                <OptimizedImage
                    // wrapperClassName='imgWrapper'
                    className={'img'}
                    alt=""
                    src={import.meta.env.VITE_UPLOAD_URL + item.img}
                    effect="blur"
                />
            </div>

            <div className="body">
                <div className="wrapper" onClick={handleRedirect}>
                    <div className="details">
                        <h1 className='title'>{item.title}</h1>
                        {/* <p>{item.desc.substring(0, 100)}</p> */}
                        <div className='stock'>
                            <div className="size">
                                <span>Size:</span> <span className="value">{item?.size?.size}</span>
                            </div>
                            <div className="vertical-line"></div>

                            <div className="stock-info">{(() => {
                                switch (true) {
                                    case availableStock === 0:
                                        return <span className='out-of-stock'>Out of Stock</span>
                                    case availableStock <= 5:
                                        return <span className='low-stock'>Only {availableStock} left !</span>

                                    case availableStock > 5:
                                        return <span className='in-stock'>In Stock</span>


                                }
                            })()}</div>
                        </div>
                    </div>
                    <div className="price">
                        <span className="total-price-per-item">${item.price * item.quantity}</span>
                    </div>
                </div>

                <div className="actions">

                    {availableStock != null || availableStock != undefined ?
                        <div className="quantity">
                            <button
                                className={`reduce ${item.quantity <= 1 || isOutOfStock ? 'disabled' : ''}`}
                                disabled={item.quantity <= 1 || isOutOfStock}
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

                            <span className='calc'>({item.quantity} x ${item.price})</span>

                        </div>
                        :
                        <Skeleton variant="rectangular" width={71} height={20} />
                    }
                    

                    <div className="others">
                        {cartType === 'full' &&
                            < div className="action wishlist">
                                <FavoriteBorder sx={{ m: 0, p: 0, minWidth: 0 }} className='action-icon' />
                                {/* <span>Remove</span> */}
                                <span>Move to wishlist</span>
                            </div>}
                        <div className="action delete">
                            <DeleteForeverOutlined sx={{ m: 0, p: 0, minWidth: 0 }} className='action-icon' onClick={(e) => handleRemoveFromCart(e, { localCartItemId: item.localCartItemId, strapiCartItemId: item.strapiCartItemId })} />
                            {cartType === 'full' && <span>Remove</span>}
                        </div>
                    </div>

                </div>

                {item.outOfStock && <button className='notify-me'>Notify me</button>}
            </div>





        </div >
    )
}

export default CartItem