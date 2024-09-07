import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import './MyAccount.scss';

import { LocalShipping, Person } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderHistory = lazy(() => import('./OrderHistory/OrderHistory'));
const Profile = lazy(() => import('./Profile/Profile'));

const menuItems = [
  { title: 'Orders', slug: 'orders', component: OrderHistory },
  { title: 'Profile', slug: 'profile', component: Profile },
];

const MyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.hash.replace('#', '') || 'orders');

  useEffect(() => {
    navigate(`#${activeTab}`);
  }, [activeTab, navigate]);

  const user = useSelector(state => state.auth.user);

  const Component = menuItems.find(item => item.slug === activeTab)?.component || null;


  console.log('Component', Component)
  return (
    <div className="account-page">
      <div className="container-fluid">
        <div className="dashboard-menu">
          <div className="welcome">
            <img src='http://localhost:1337/uploads/pexels_olly_972804_3fa9e26e5b.jpg' alt="" className="profile-img" />
            <span className="message">{user.username}</span>
          </div>
          <div className="tabs">
            <button
              className={`tab-btn orders ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <LocalShipping />
              <span>Orders</span>
            </button>
            <button
              className={`tab-btn profile ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Person />
              <span>Profile</span>
            </button>
          </div>
        </div>

        <div className="tab-content">
          <Suspense fallback={<div>Loading...</div>}>
            {Component ? <Component /> : <div>Component not found</div>}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
