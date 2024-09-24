import React, { memo, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './OrderHistory.scss';
import { makeRequest } from '../../../../makeRequest';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link, redirect, useNavigate } from 'react-router-dom';
import StatusElement from '../../../../components/StatusElement/StatusElement';
import OptimizedImage from '../../../../components/OptimizedImage/OptimizedImage';
import CheckoutItem from '../../../Checkout/CheckoutItem/CheckoutItem';
import formatAmount from '../../../../utils/formatAmount';

const OrderHistory = memo(() => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequest.get(`/orders?filters[user][id][$eq]=${user?.id}&sort=createdAt:desc`);
        console.log('response', response);
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, [user?.id]);

  const handleFilterClick = (slug) => {
    setSelectedFilter(slug);
  };

  const handleRedirect = (productId) => {
    navigate(`/product/${productId}`);
    dispatch(setShowCart(false));
  };

  const filterOptions = [
    { label: 'All', slug: 'all' },
    { statuses: ['processing', 'pending', 'shipped', 'in_transit', 'out_for_delivery'], label: 'Active', slug: 'active' },
    { statuses: ['delivered'], label: 'Delivered', slug: 'delivered' },
    { statuses: ['cancelled'], label: 'Cancelled', slug: 'cancelled' },
  ];

  // Memoize the filtered orders based on selected filter and orders list
  const filteredOrders = useMemo(() => {
    if (selectedFilter === 'all') {
      return orders;
    }

    // Find the filter option based on the selected slug
    const filterOption = filterOptions.find((filter) => filter.slug === selectedFilter);

    // Return orders that match any status in the selected filter's statuses array
    return orders?.filter((order) => filterOption.statuses.includes(order.attributes.status));
  }, [orders, selectedFilter]);

  // console.log('filteredOrders', filteredOrders);

  return (
    <div className="order-tab">
      <div className="heading">
        <h6 className="fw-semibold"><span className='text-capitalize'>{selectedFilter}</span> Orders</h6>
        <span className='quantity'>{filteredOrders?.length}</span>
      </div>

      <div className="filters">
        <div className="filters-wrapper">
          {filterOptions.map((filterOption) => (
            <span
              key={filterOption.slug}
              onClick={() => handleFilterClick(filterOption.slug)}
              className={classNames('filter-item', { active: filterOption.slug === selectedFilter })}
            >
              {filterOption.label}
            </span>
          ))}
        </div>
      </div>

      <div className="order-tab-content">
        {
          filteredOrders?.length > 0 ?
            filteredOrders?.map((order) => {
              const { status, totalAmount, createdAt, items: orderItems, trackingPageUrl } = order.attributes;
              return (
                <div key={order.id} className="order-card" >
                  <div className="order-item-header">
                    <div className="header-item">
                      <span className="header-item-label">Placed on</span>
                      <span className="header-item-value">
                        {new Date(createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="header-item">
                      <span className="header-item-label">Total </span>
                      <span className="header-item-value">${formatAmount(totalAmount / 100)}</span>
                    </div>
                    <div className="view-details">
                      <span className="order-number">Order #{order.id}</span>
                      <StatusElement status={status} />
                    </div>
                  </div>

                  <div className="order-body">
                    <div className="summary">
                      <div className="eta">
                        <span className="label">Estimated Delivery Time:</span>
                        <div className="value">5th Sept, 2024</div>
                      </div>
                      <div className="order-actions">
                        <button className="cta-button" onClick={(e) => {
                          e.preventDefault()
                          if (trackingPageUrl) {
                            window.open(trackingPageUrl)
                          }
                        }}
                        >
                          Track Package
                        </button>
                        {/* <button className="secondary-btn">Track Package</button> */}
                      </div>
                    </div>

                    <div className="order-items">
                      {orderItems?.map((orderItem, index) => {
                        const { img, title, size, price, productId } = orderItem;

                        return (
                          <CheckoutItem key={index} item={{ ...orderItem, size: { size: size } }} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }) : <span className='text-center p-5 fw-medium text-muted'>{selectedFilter === 'all' ? 'No Orders' : `No ${selectedFilter} orders`}</span>
        }
      </div>
    </div>
  );
});

export default OrderHistory;
