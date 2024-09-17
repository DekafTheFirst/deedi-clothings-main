import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.scss';
import { makeRequest } from '../../../../makeRequest';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import StatusElement from '../../../../components/StatusElement/StatusElement';
import OptimizedImage from '../../../../components/OptimizedImage/OptimizedImage';

const OrderHistory = memo(() => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const handleFilterClick = (value) => {
    setSelectedFilter(value);
    // You can implement the actual filtering logic here based on `value`
    console.log("Selected Filter:", value);
  };

  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequest.get(`/orders?filters[user][id][$eq]=${user.id}`);
        console.log('response', response)
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, []);

  const handleRedirect = (productId) => {
    // console.log('Navigating to',`/product/${item.productId}`)
    navigate(`/product/${productId}`)
    dispatch(setShowCart(false))
  }

  const renderOrderStatus = (status) => {
    switch (status) {
      case 'pending':
        return <span className="status pending">Pending</span>;
      case 'ordered':
        return <span className="status ordered">Ordered</span>;
      case 'shipped':
        return <span className="status shipped">Shipped</span>;
      case 'delivered':
        return <span className="status delivered">Delivered</span>;
      default:
        return <span className="status unknown">Unknown</span>;
    }
  };


  const filterOptions = [
    { value: 'all', label: 'Orders' },
    { value: 'pending', label: 'Not Yet Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  return (
    <div className="order-tab">
      <div className="heading">
        <h6 className='fw-semibold'>Your Orders</h6>
        <span>{orders.length}</span>
      </div>

      <div className="filters">
        <div className="filters-wrapper">
          {
            filterOptions.map(
              (filterOption) =>
                <span
                  key={filterOption.value}
                  onClick={() => {handleFilterClick(filterOption.value) }}
                  className={classNames('filter-item', { active: filterOption.value === selectedFilter })}
                >
                  {filterOption.label}
                </span>)
          }
        </div>

      </div>
      <div className="order-tab-content">
        {orders?.map((order) => {
          console.log('order', order)
          const { status, totalAmount, createdAt, items: orderItems } = order.attributes;
          return (
            <div key={order.id} className="order-card">
              <div className="order-item-header">
                <div className='header-item'><span className='header-item-label'>Placed on</span> <span className="header-item-value">{new Date(createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',   // e.g., 2024
                  month: 'short',    // e.g., Sep
                  day: 'numeric'     // e.g., 16 (day number)
                })}</span></div>
                <div className='header-item'><span className='header-item-label'>Total </span><span className="header-item-value">${totalAmount}</span></div>
                <div className="view-details">
                  <span className='order-number'>Order #{order.id}</span>
                  <StatusElement status={'delivered'} />
                </div>
              </div>
              <div className="order-body">
              <div className="summary">
                  <div className="eta"><span className="label">Estimated Delivery Time:</span> <div className="value">5th Sept, 2024</div></div>
                  <div className="order-actions">
                    <button className='cta-button'>View Details</button>
                    <button className='secondary-btn'>Track Package</button>
                  </div>
                </div>
                <div className="order-items">
                  {orderItems.map((orderItem, index) => {
                    const { img, title, size, price, productId } = orderItem

                    return (
                      <div className='order-item' key={index} onClick={() => handleRedirect(productId)}>
                        <div className="img-wrapper" >
                          <OptimizedImage
                            // wrapperClassName='imgWrapper'
                            className={'img'}
                            alt=""
                            src={import.meta.env.VITE_UPLOAD_URL + img}
                            effect="blur"
                          />
                        </div>
                        <div className="wrapper" >
                          <div className="top">
                            <div className="details">
                              <h6 className='title'>{title}</h6>
                              {/* <p>{item.desc.substring(0, 100)}</p> */}
                              <div className='stock'>
                                <div className="size">
                                  <span>Size:</span> <span className="value">{size}</span>
                                </div>
                              </div>
                            </div>
                            <div className="price">
                              <span className="total-price-per-item">${price}</span>
                            </div>
                          </div>


                        </div>
                      </div>
                    )
                  })}
                </div>
                

              </div>

            </div>
          )
        })}
      </div>
    </div>
  );

});

export default OrderHistory;
