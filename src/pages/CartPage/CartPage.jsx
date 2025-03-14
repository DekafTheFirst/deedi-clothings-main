import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./CartPage.scss"
import { useDispatch, useSelector } from 'react-redux'
import { CART_MODE, removeItemFromCart, resetCart, selectCartTotals, selectItemsByStock, setShowCart, validateCartItems } from '../../redux/cart/cartReducer.js'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../../components/MiniCart/MiniCartItem/CartItem'
import FreeShippingProgress from '../../components/FreeShippingProgress/FreeshippingProgress.jsx'
import formatAmount from '../../utils/formatAmount.js'


const CartPage = () => {
  const { items, cartMode } = useSelector(state => state.cart);

  const { inStockItems, outOfStockItems, reducedItems } = useSelector(selectItemsByStock);
  const { vat, totalAmount, subtotal, noOfItems } = useSelector(selectCartTotals)


  useEffect(() => {
    console.log('inStockItems', inStockItems)
  }, [inStockItems]);



  const stockValidationErrors = useSelector(state => state.cart.stockValidationErrors);
  const [validated, setValidated] = useState(false);

  const sortedErrors = useMemo(() => {
    return stockValidationErrors.slice().sort((a, b) => {
      const sortOrder = {
        'out-of-stock': 1,
        'reduced-stock': 2,
      };
      return sortOrder[a.type] - sortOrder[b.type];
    });
  }, [stockValidationErrors]);

  const navigate = useNavigate();
  // console.log(items);

  

  const dispatch = useDispatch()


  const isInitialMount = useRef(true);
  // Handle SPA navigation



  useEffect(() => {

    

    const validateAndSet = () => {
      try {
        dispatch(validateCartItems());
        // setValidated(true);
      } catch (error) {
        console.error('Error validating stock:', error);
      }
    };

    // validateAndSet();
  }, []);




  const handleProceedToCheckout = () => {
    if (inStockItems.length > 0) {
      dispatch(setShowCart(false));
      navigate('/checkout')
    }
  }

  return (
    <div className="cart-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 cart-body">
            <div className="top">
              <span className="heading">Shopping Bag</span>
              {stockValidationErrors.length > 0 &&
                <div className="stock-validation-errors">
                  {sortedErrors.map(error => (
                    <div key={error.itemId} className={`error-message ${error.type}`}>
                      {error.error}
                    </div>
                  ))}
                </div>
              }

            </div>

            <div className="all-items">
              <>
                <div className="item-group in-stock">
                  <div className="total">
                    <span>{`Items(${items ? inStockItems.length : '0'})`}</span>
                    <span className='amount'>${formatAmount(totalAmount)}</span>
                  </div>
                  <div className="cart-items">

                    {
                      inStockItems.length > 0 ?
                        inStockItems.map(item => (
                          <CartItem key={item.localCartItemId} item={item} cartType="full" />
                        ))
                        :
                        <div className='list-empty'><span>No items</span>
                          <Link to="/" className='cta-button'> Continue Shopping </Link>
                        </div>
                    }

                  </div>
                </div>
                {outOfStockItems.length > 0 &&
                  <div className="item-group out-of-stock">
                    <div className="total">
                      <span>{`NOT INCLUDED(${items ? outOfStockItems.length : '0'})`}</span>
                      {/* <span className='amount'>${totalPrice()}</span> */}
                    </div>
                    <div className="cart-items">
                      {outOfStockItems.map(item => (
                        <CartItem key={item.localCartItemId} item={item} cartType="full" />
                      ))}

                    </div>
                  </div>
                }
              </>



            </div>
          </div>
          <div className="col-md-5 actions-wrapper">
            <div className="actions-card">
              <div className="checkout">
                <div className="summary">

                  <h5 className="heading">Order Summary</h5>
                  <div className="summary-items">
                    <div className="summary-item">Subtotal: <span className="value">${formatAmount(totalAmount)}</span></div>
                    <div className="summary-item">No. of Items: <span className="value">{inStockItems.length}</span></div>

                  </div>
                </div>
                <FreeShippingProgress />

                {inStockItems.length > 0 && <><button onClick={handleProceedToCheckout} className='cta-button'>{cartMode === CART_MODE.NORMAL ? 'PROCEED TO CHECKOUT' : 'CONFIRM CHANGES & CONTINUE'}</button><Link to="/" className='secondary-action'> Continue Shopping </Link></>}
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