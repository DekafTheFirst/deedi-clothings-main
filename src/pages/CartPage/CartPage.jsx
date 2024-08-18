import React, { useEffect } from 'react'
import "./CartPage.scss"
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart, resetCart } from '../../redux/cartReducer'
import { Link, useNavigate } from 'react-router-dom'
import MiniCartItem from '../../components/MiniCart/MiniCartItem/MiniCartItem'


const CartPage = ({ showCart, setShowCart }) => {
  const items = useSelector(state => state.cart.items)
  const navigate = useNavigate();
  console.log(items)

  const totalPrice = () => {
    let total = 0
    items.forEach(item => (total += item.price));
    return total.toFixed(2)
  }

  const dispatch = useDispatch()



  const handleRemoveFromCart = (locallocalCartItemId) => {
    dispatch(removeItemFromCart(localCartItemId))
      .unwrap()
      .then(() => {
        console.log('Item removed from cart successfully');
      })
      .catch((error) => {
        console.error('Failed to remove item from cart:', error);
      });
  };


  // {products.length > 0 ?
  //   <>
  //     {
  //       products.map(item => (
  //         <div
  //           className="item"
  //           key={item.idPerSize}
  //         >
  //           <Link
  //             to={`/product/${item.productId}`}
  //             onClick={() => setShowCart(false)}
  //             className="left">
  //             <div className="img-wrapper">
  //               <OptimizedImage
  //                 // wrapperClassName='imgWrapper'
  //                 className={'img'}
  //                 alt=""
  //                 src={import.meta.env.VITE_UPLOAD_URL + item.img}
  //                 effect="blur"
  //               />
  //             </div>
  //             <div className="details">
  //               <h1 className='title'>{item.title}</h1>
  //               {/* <p>{item.desc.substring(0, 100)}</p> */}
  //               <div className="bottom">
  //                 <span className='size'>SIZE : {item.size.size}</span>
  //                 <span className='price'>{`$${item.price}`}</span>
  //               </div>
  //             </div>
  //           </Link>
  //           <Close className='delete' onClick={() => handleRemoveFromCart(item.localCartItemId)} />
  //         </div>
  //       ))
  //     }
  //   </>
  //   :

  //   <div className='list-empty'>
  //     <span>No Products</span>
  //     <button onClick={() => navigate('/products/women')} className='btn-1'><ShoppingBagOutlined fontSize='small' /> Continue Shopping</button>
  //   </div>
  // }

  return (
    <div className="cart-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 cart-body">
            <div className="top">
              <span className="heading">Shopping Bag</span>
              <div className="total">
                <span>{`SUBTOTAL(${items ? items.length : '0'})`}</span>
                <span className='amount'>${totalPrice()}</span>
              </div>
            </div>

            <div className="items">
              {items ? (
                items.length > 0 ?
                  <>
                    {
                      items.map(item => (
                        <MiniCartItem key={item.localCartItemId} item={item} setShowCart={setShowCart} cartType='full'/>
                      ))
                    }
                  </>
                  :
                  <span className='list-empty'>No items</span>
              ) : <CircularProgress />}

              
            </div>
          </div>
          <div className="col-md-5 actions-wrapper">
            <div className="actions-card">
              <div className="checkout">
                <div className="summary">
                  <h5 className="heading">Order Summary</h5>
                  <div className="summary-items">
                    <div className="summary-item">Subtotal: <span className="value">${totalPrice()}</span></div>
                    <div className="summary-item">No. of Items: <span className="value">{items.length}</span></div>
                  </div>
                </div>
                <button onClick={() => navigate('/checkout')} className='btn-1'>PROCEED TO CHECKOUT</button>
                {/* <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span> */}
                <Link to="/cart" className='secondary-action'> Continue Shopping </Link>
              </div>
              <div className="info">
                <h5 className="heading"> Accepted Payment Methods</h5>
                <img src="/img/payment-removebg.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartPage