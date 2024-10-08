import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import { Close, Delete, DeleteForeverOutlined, DeleteOutline, FavoriteBorder } from '@mui/icons-material';
import './CartItem.scss';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, setOutOfStock, setShowCart, updateCartItem } from '../../../redux/cart/cartReducer';
import CTAButton from '../../CTAButton/CTAButton';
import classNames from 'classnames';


const CartItem = ({ item, cartType }) => {
    const isOutOfStock = item.outOfStock;

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

            // console.log('response', response)
            // Update local state with the result

        } catch (error) {
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
            className={classNames("cart-item", { outOfStock: isOutOfStock })}
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
                        <h6 className='title'>{item.title}</h6>
                        <div className='stock'>
                            <div className="size">
                                <span>Size:</span> <span className="value">{item?.size?.size}</span>
                            </div>
                            <div className="vertical-line"></div>

                            <div className="stock-info">{(() => {
                                switch (true) {
                                    case item.availableStock === 0:
                                        return <span className='out-of-stock'>Out of Stock</span>
                                    case item.availableStock <= 5:
                                        return <span className='low-stock'>Only {item.availableStock} left !</span>

                                    case item.availableStock > 5:
                                        return <span className='in-stock'>In Stock</span>
                                }
                            })()}</div>
                        </div>
                        <span className='product-price'>${item?.price}</span>

                    </div>
                    <div className="price">
                        <span className="total-price-per-item">${item?.price * item.quantity}</span>
                    </div>
                </div>

                <div className="actions">


                    {isOutOfStock
                        ?
                        <button className="disabled-btn" disabled>SOLD OUT</button>
                        :
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
                                className={`add ${item.quantity >= item.availableStock ? 'disabled' : ''}`}
                                disabled={item.quantity >= item.availableStock}
                                onClick={(e) => {
                                    handleUpdateCartItem(e, { requestedQuantity: item.quantity + 1 }); // Prevents the parent click handler from firing
                                }}
                            ><span>+</span></button>

                        </div>
                    }


                    <div className="others">
                        {cartType === 'full' &&
                            < div className="action wishlist">
                                <FavoriteBorder sx={{ m: 0, p: 0, minWidth: 0 }} className='action-icon' />
                                {/* <span>Remove</span> */}
                                <span>Move to wishlist</span>
                            </div>
                        }
                        <div className="action delete" onClick={(e) => handleRemoveFromCart(e, { localCartItemId: item.localCartItemId, strapiCartItemId: item.strapiCartItemId })}>
                            <DeleteForeverOutlined sx={{ m: 0, p: 0, minWidth: 0 }} className='action-icon' />
                            {cartType === 'full' && <span>Remove</span>}
                        </div>
                    </div>

                </div>

                {item.reduced &&
                    <div className="warning">
                        Quantity reduced to {item.quantity} due to availability.
                    </div>
                }
            </div>





        </div >
    )
}

export default CartItem