import React, { memo, useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.scss"
import Cart from '../MiniCart/MiniCart';
import { useDispatch, useSelector } from 'react-redux';
import { Close, LocalMall, LocalShipping, Logout, Menu, MenuOpen, Person } from '@mui/icons-material';
import { selectCartTotals } from '../../redux/cart/cartReducer';
import LockIcon from '@mui/icons-material/Lock';
import Countdown from '../Countdown/Countdown';
import { toast } from 'react-toastify';
import { endCheckoutSession, setCheckoutSessionExpiryDate } from '../../redux/checkout/checkoutReducer';
import { logoutUser } from '../../redux/auth/authReducer';
import LoginForm from '../../pages/Auth/Login/LoginForm';
import PersonOutline from '@mui/icons-material/PersonOutline';
import classNames from 'classnames';


const excludedPaths = ['/checkout', '/checkout-success']; // Paths to exclude Navbar

const menuItems = [
  { title: 'Profile', slug: 'profile', icon: <Person /> },
  { title: 'Orders', slug: 'orders', icon: <LocalShipping /> },
];

const AuthDropDownItem = memo(({ title, slug, icon, setShowUserDropdown }) => {
  const location = useLocation();
  const isActive = `#${slug}` === location.hash;
  const navigate = useNavigate();

  const handleDropDownclick = () => {
    navigate(`/my-account#${slug}`)
    setShowUserDropdown(false)
  }
  
  return (
    <span className={classNames("dropdown-item", { isActive })} onClick={handleDropDownclick}>
      {icon}
      <span>{title}</span>
    </span>
  )
})


const Navbar = ({ showUserDropdown, setShowUserDropdown }) => {
  const [showMobileMenu, toggleShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { noOfItems } = useSelector(selectCartTotals);



  const [showCart, setShowCart] = useState(false)
  const timeoutRef = useRef(null);

  const handleUserMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowUserDropdown(true);
  };

  const handleUserMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowUserDropdown(false);
    }, 2000);
  };

  const handleUserDropdownEnter = () => {

    console.log('cleared timeout, dropdown should stay open')
    clearTimeout(timeoutRef.current);
  };

  const handleDropdownLeave = () => {
    // Ensure it hides after leaving the dropdown area
    handleUserMouseLeave()
  };

  const { items: products } = useSelector(state => state.cart);
  const { checkoutSessionExpiresAt } = useSelector(state => state.checkout);
  const user = useSelector(state => state.auth.user);
  // console.log('user', user)
  const { pathname, state } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inCheckoutPage = excludedPaths.includes(location.pathname);
  // console.log('inCheckoutPage', inCheckoutPage)



  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  }

  useEffect(() => {
    // Parse the target date string into a Date object
    const now = new Date();
    // const fiveSecondsLater = new Date(now.getTime() + 5000);
    const targetDateLocal = new Date(checkoutSessionExpiresAt)
    // Update the countdown timer every second
    // Update every second
    // console.log('showCountdown', showCountdown)
    if (inCheckoutPage) {
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const difference = targetDateLocal - currentTime;
        const timeRemaining = difference > 0 ? difference : 0;
        // console.log('timeRemaining', timeRemaining)
        if (timeRemaining <= 5 * 1000 * 6) {
          setShowCountdown(true)
        }

        if (timeRemaining <= 0) {
          clearInterval(intervalId);
          dispatch(endCheckoutSession())
          navigate('/cart');
        } else {
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setTimeRemaining({ minutes, seconds });
        }
      }, 1000);


      return () => clearInterval(intervalId);
    }

  }, [inCheckoutPage]);


  useEffect(() => {
    // Listen for scroll events
    const handleScroll = () => {
      // Check the scroll position
      if (window.scrollY > 10) { // Change 100 to the desired scroll position
        // Update the state to indicate that the user has scrolled
        setScrolled(true);
      } else {
        // Update the state to indicate that the user hasn't scrolled
        setScrolled(false);
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.navbar')) {
        toggleShowMobileMenu(false); // Close the navbar if clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener('click', handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };

  }, []);

  const handleClickUser = () => {
    if (user) {
      navigate('/my-account')
    }
    else {
      navigate('/login')
    }
    setShowUserDropdown(false)
  }




  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''} ${showMobileMenu ? 'toggled' : ''} ${inCheckoutPage ? 'in-checkout-page' : ''}`}>
      <div className="container-fluid">

        <div className="left">

          <Menu className='toggle' onClick={() => toggleShowMobileMenu(!showMobileMenu)} />
          <div className={`nav-items ${showMobileMenu ? 'show' : ''}`}>
            <div className="top">
              <div className="brand collapse-menu-brand" >
                <Link className="brand" to='/'><img src='/img/deedi-logo.png' /></Link>
              </div>
              <Close className='close' onClick={() => toggleShowMobileMenu(!showMobileMenu)} />
            </div>
            <div className="item">
              <Link className="link" to="/products/women">Women</Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/men">Men</Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/kids">Kids</Link>
            </div>
            <div className="item">
              <Link className="link" to="/about">About</Link>
            </div>
            {/* <div className="item">
              <Link className="link" to="/contact">Contact</Link>
            </div> */}
          </div>
        </div>
        <div className="center">
          <div className="brand collapse-menu-brand" onClick={(e) => {
            navigate('/')
          }}>
            <img src='/img/deedi-logo.png' />
          </div>
        </div>

        <div className="right">
          {/* <div className="item">
            <Link className="link" to="/products/3">Stores</Link> 
          </div> */}

          <div className="icons">
            {/* <div className="searchbar">
              <input type="text" name="" id="" />
              <SearchIcon fontSize='small' className='icon search-icon' />
            </div> */}

            <div className="user" >
              <div className="summary" onClick={handleClickUser} onMouseEnter={handleUserMouseEnter} onMouseLeave={handleUserMouseLeave}>
                <div className="user-icon" >
                  {!user ? <PersonOutline /> : <img src={import.meta.env.VITE_UPLOAD_URL + '/uploads/pexels_olly_972804_3fa9e26e5b.jpg'} className='user-image' />}
                </div>
                <div className="user-info"><span>
                  {!user ? 'My Account' : `Hello, ${user?.firstName}`}</span>
                  <KeyboardArrowDownIcon className='icon down-arrow' fontSize="small" />
                </div>

              </div>


              {showUserDropdown && (user ?
                <div className="user-dropdown" onMouseEnter={handleUserDropdownEnter}>
                  <div className="wrapper">
                    {menuItems.map((item) => <AuthDropDownItem key={item.slug} title={item.title} slug={item.slug} icon={item.icon} setShowUserDropdown={setShowUserDropdown} />)}
                    <div className="dropdown-item" onClick={handleLogout}>
                      <Logout fontSize='small' />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
                :
                <div className="user-dropdown nav-login-form" onMouseEnter={handleUserDropdownEnter}>
                  <div className="wrapper">
                    <h4 className='mb-3 text-center fw-semibold'>LOGIN</h4>
                    <LoginForm />
                  </div>
                </div>)}



            </div>

            {
              pathname !== '/checkout' &&
              <div
                className="cart-icon-wrapper"

                onMouseEnter={() => {
                  if (location.pathname !== "/cart") {
                    setShowCart(true)
                  }
                }}
                onMouseLeave={() => setShowCart(false)}>
                <div className="cartIcon"
                  onClick={() => {
                    // console.log(location.pathname)
                    if (location.pathname !== "/cart") {
                      navigate('/cart')
                      setShowCart(false)
                    }
                  }}
                >
                  <ShoppingCartOutlinedIcon className='icon' />
                  <div className='noOfItems'><span>{noOfItems}</span></div>
                </div>
                {showCart &&
                  <div className="cart-dropdown">
                    <div className='darkOverlay' onMouseEnter={() => setShowCart(false)}></div>
                    <div className='cart-dropdown-wrapper'>
                      <Cart setShowCart={setShowCart} />
                    </div>
                  </div>
                }
              </div>
            }


          </div>

        </div>
        {inCheckoutPage &&
          <div className="visible-in-checkout-page">
            {showCountdown && <Countdown timeRemaining={timeRemaining} />}
            <div className="secure-checkout">
              <LockIcon fontSize='medium' className='icon' />
              <p>SECURE CHECKOUT</p>
            </div>
          </div>
        }
      </div>

    </div >
  )
}

export default Navbar