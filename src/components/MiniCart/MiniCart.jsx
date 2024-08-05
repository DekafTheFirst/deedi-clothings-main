import React, { useEffect } from 'react'
import "./MiniCart.scss"
import { Close, DeleteOutlineOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../../redux/cartReducer'
import { makeRequest } from '../../makeRequest'
import OptimizedImage from '../OptimizedImage/OptimizedImage'
import { Link, useNavigate } from 'react-router-dom'
import calculateNoOfProducts from '../../utils/calculateNoOfProducts'


const Cart = ({ showCart, setShowCart }) => {

  const navigate = useNavigate();


  const products = useSelector(state => state.cart.cartItems);

  const noOfProducts = calculateNoOfProducts(products);

  const subtotal = useSelector(state => state.cart.subtotal)




  const dispatch = useDispatch()





  const handleCheckoutClicked = () => {
    navigate('/checkout');
    setShowCart(false);
  }

  return (
    <div className="mini-cart">
      <div className="total">
        <span>{`SUBTOTAL(${noOfProducts})`}</span>
        <span>${subtotal}</span>
      </div>

      <div className="products">
        {products.length > 0 ?
          <>
            {
              products.map(item => (
                <div
                  className="item"
                  key={item.cartItemId}
                >
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={() => setShowCart(false)}
                    className="left">
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
                      <h1 className='title'>{item.title}</h1>
                      {/* <p>{item.desc.substring(0, 100)}</p> */}
                      <div className="bottom">
                        <span className='size'>SIZE : {item.size}</span>
                        <span className='price'>{`${item.quantity} x $${item.price}`}</span>
                      </div>
                    </div>
                  </Link>
                  <Close className='delete' onClick={() => dispatch(removeItem(item.cartItemId))} />
                </div>
              ))
            }
          </>
          :
          <span className='list-empty'>No Products</span>}
      </div>

      <div className="actions">
        {noOfProducts > 0 ?
          <button onClick={handleCheckoutClicked} className='btn-1'>PROCEED TO CHECKOUT</button>
          :
          <button onClick={() => navigate('/products/women')} className='btn-1'>GO SHOPPING</button>
        }
        {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
        <Link to="/cart" className='view-cart' onClick={() => setShowCart(false)}> View Shopping Bag </Link>
      </div>

    </div>
  )
}

export default Cart