import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import './MyAccount.scss';

import { ArrowBackIosNew, LocalShipping, Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/auth/authReducer';
import LogoutIcon from '@mui/icons-material/Logout';

const OrderHistory = lazy(() => import('./OrderHistory/OrderHistory'));
const Profile = lazy(() => import('./Profile/Profile'));

const menuItems = [
  { title: 'Profile', slug: 'profile', component: Profile, icon: <Person /> },
  { title: 'Orders', slug: 'orders', component: OrderHistory, icon: <LocalShipping /> },
];

const MyAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.hash.replace('#', '') || 'orders');
  const [showActiveTab, setShowActiveTab] = useState(false)
  const [logoutIsActive, setLogoutIsActive] = useState(false)

  const handleGoBack = () => {
    setShowActiveTab(false)
  };

  const handleSelectActiveTab = (slug) => {
    setActiveTab(slug);
    setShowActiveTab(true);
    navigate(`#${slug}`); // Update hash in URL
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setLogoutIsActive(true);
    navigate('/')
  }

  const isInitialMount = useRef(true)
  
  useEffect(() => {
    const currentHash = location.hash.replace('#', '') || 'orders';
    if (currentHash !== activeTab) {
      setActiveTab(currentHash);
    }
  }, [location.hash, activeTab]);

  const user = useSelector(state => state.auth.user);

  const Component = menuItems.find(item => item.slug === activeTab)?.component || null;


  // console.log('Component', Component)
  return (
    <div className="account-page">
      <div className="container-fluid">
        <div className="dashboard-menu">
          <div className="user-info">
            <img src={`${import.meta.env.VITE_UPLOAD_URL} + '/uploads/pexels_olly_972804_3fa9e26e5b.jpg'`} alt="" className="profile-img" />
            <div className="content">
              <span className="name">{user?.firstName} {user?.lastName}</span>
              <span className="email">{user?.email}</span>
            </div>
          </div>
          <hr></hr>
          <div className="tabs">
            {menuItems.map(item => {
              return (
                <button
                  key={item.slug}
                  className={`tab-btn ${item.slug} ${activeTab === item.slug ? 'active' : ''}`}
                  onClick={() => handleSelectActiveTab(item.slug)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              )
            })}
            <button
              className={`tab-btn logout `}
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className={`tab-content ${showActiveTab ? 'show' : ''}`}>
          <div className='back-btn' onClick={handleGoBack}><ArrowBackIosNew fontSize='small' /> Back</div>
          <Suspense fallback={<div>Loading...</div>}>
            {Component ? <Component /> : <div>Component not found</div>}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
