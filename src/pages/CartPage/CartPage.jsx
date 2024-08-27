import React, { useEffect, useMemo, useState } from 'react'
import "./CartPage.scss"
import { useDispatch, useSelector } from 'react-redux'
import { CART_MODE, removeItemFromCart, resetCart, validateStock } from '../../redux/cartReducer'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../../components/MiniCart/MiniCartItem/CartItem'
import useInitializeCheckout from '../../hooks/useInitializeCheckout'


const CartPage = () => {
  const { items, cartMode } = useSelector(state => state.cart);

  const { outOfStockItems, inStockItems } = items.reduce((acc, item) => {
    if (!item.outOfStock) {
      acc.inStockItems.push(item);
    } else {
      acc.outOfStockItems.push(item);
    }
    return acc;
  }, { outOfStockItems: [], inStockItems: [] });


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

  const totalPrice = () => {
    let total = 0
    items.forEach(item => (total += item.price * item.quantity));
    return total.toFixed(2)
  }

  const dispatch = useDispatch()



  useEffect(() => {
    const validateAndSet = () => {
      try {
        dispatch(validateStock());
        // setValidated(true);
      } catch (error) {
        console.error('Error validating stock:', error);
      }
    };

    validateAndSet();
  }, []);




  const initializeCheckout = useInitializeCheckout(null, () => { });



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
                    <span className='amount'>${totalPrice()}</span>
                  </div>
                  <div className="cart-items">

                    {
                      inStockItems.length > 0 ?
                        inStockItems.map(item => (
                          <CartItem key={item.localCartItemId} item={item} cartType="full" />
                        ))
                        :
                        <span className='list-empty'>No items</span>
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
                    <div className="summary-item">Subtotal: <span className="value">${totalPrice()}</span></div>
                    <div className="summary-item">No. of Items: <span className="value">{items.length}</span></div>
                  </div>
                </div>
                <button onClick={() => { initializeCheckout() }} className='btn-1'>{cartMode === CART_MODE.NORMAL ? 'PROCEED TO CHECKOUT' : 'CONFIRM CHANGES & CONTINUE'}</button>
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