import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.scss';
import { makeRequest } from '../../../../makeRequest';

const OrderHistory = memo(() => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequest.get('/orders');
        console.log('response', response)
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, []);

  const renderOrderStatus = (status) => {
    switch (status) {
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

  return (
    <div className="order-history">
      {orders?.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-info">
            <h4>Order #{order.id}</h4>
            <p>Total: ${order.total}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            {renderOrderStatus(order.status)}
          </div>
          <div className="order-actions">
            <button>View Details</button>
            <button>Track Package</button>
          </div>
        </div>
      ))}
    </div>
  );

});

export default OrderHistory;
