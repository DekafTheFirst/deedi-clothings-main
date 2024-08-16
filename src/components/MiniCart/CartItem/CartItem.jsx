import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OptimizedImage from '../../OptimizedImage/OptimizedImage'
import { Close } from '@mui/icons-material'
import './CartItem.scss'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../../redux/cartReducer'
import useFetch from '../../../hooks/useFetch'
const CartItem = ({ item, setShowCart }) => {
    // console.log(item)
    const { data: stockData, loading, error } = useFetch(
        `/stocks?filters[product][id][$eq]=${item.productId}&filters[size][id][$eq]=${item.size.id}`
    );
    // console.log(stockData)
    const [availableStock, setAvailableStock] = useState(null)

    useEffect(() => {
        // console.log('stockData', stockData)
        setAvailableStock(stockData?.[0]?.attributes?.stock)
    }, [stockData]);

    useEffect(() => {
        // console.log('availableStock', availableStock)
    }, [availableStock]);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleRemoveFromCart = (e, { localCartItemId, strapiCartItemId }) => {
        // console.log(localCartItemId)\
        e.preventDefault(); // Prevents default action
        e.stopPropagation(); // Prevents the parent click handler from firing

        dispatch(removeItemFromCart({ localCartItemId, strapiCartItemId }))
            .unwrap()
            .then(() => {
                console.log('Item removed from cart successfully');
            })
            .catch((error) => {
                console.error('Failed to remove item from cart:', error);
            });

    };


    const handleUpdateCartItem = (e) => {
        e.preventDefault(); // Prevents default action
        e.stopPropagation();

    }

    const handleRedirect = () => {

        navigate(`/product/${item.productId}`)
        setShowCart(false)
    }

    return (
        <Link
            onClick={handleRedirect}
            className="cart-item"
        >
            <div
                className="info">

                <div className="img-wrapper">
                    <OptimizedImage
                        // wrapperClassName='imgWrapper'
                        className={'img'}
                        alt=""
                        src={import.meta.env.VITE_UPLOAD_URL + item.img}
                        effect="blur"
                    />
                </div>
                <div className="details">
                    <h1 className='title'>{item.title}{item.outOfStock ? '(Out Of Stock)' : ''}</h1>
                    {/* <p>{item.desc.substring(0, 100)}</p> */}
                    <span className='size'>SIZE : {item?.size?.size}</span>

                    <div className="bottom">
                        <span className='price'>{`$${item.price}`}</span>
                        <div className="quantity">
                            <button
                                className={`reduce ${item.quantity === 1 ? 'disabled' : ''}`}
                                disabled={item.quantity === 1}
                                onClick={(e) => {
                                    handleUpdateCartItem(e)// Prevents the parent click handler from firing
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
                                    handleUpdateCartItem(e); // Prevents the parent click handler from firing
                                }}
                            ><span>+</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <Close className='delete' onClick={(e) => handleRemoveFromCart(e, { localCartItemId: item.localCartItemId, strapiCartItemId: item.strapiCartItemId })} />
            </div>

        </Link>
    )
}

export default CartItem