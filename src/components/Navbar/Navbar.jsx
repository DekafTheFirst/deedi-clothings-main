import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.scss"
import Cart from '../MiniCart/MiniCart';
import { useDispatch, useSelector } from 'react-redux';
import { Close, Menu, MenuOpen } from '@mui/icons-material';
import { selectCartTotals, setShowCart } from '../../redux/cart/cartReducer';
import LockIcon from '@mui/icons-material/Lock';


const excludedPaths = ['/checkout', '/checkout-success']; // Paths to exclude Navbar

const Navbar = () => {
  const [showMobileMenu, toggleShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { noOfItems } = useSelector(selectCartTotals);

  const { items: products, showCart } = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);

  const { pathname, state } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inCheckoutPage = excludedPaths.includes(location.pathname);
  // console.log('inCheckoutPage', inCheckoutPage)






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
            <div className="item">
              <Link className="link" to="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="brand collapse-menu-brand" onClick={(e) => {
            if (!inCheckoutPage) {
              navigate('/') // Prevents navigation if the link is disabled
            }
          }}>
            <img src='/img/deedi-logo.png' />
          </div>
        </div>

        <div className="right">
          {/* <div className="item">
            <Link className="link" to="/products/3">Stores</Link> 
          </div> */}
          <div className="item">
            <Link className="link" to="/login">Login</Link>
          </div>
          <div className="item">
            <Link className="link" to="/register">Register</Link>
          </div>
          <div className="icons">
            <div className="searchbar">
              <input type="text" name="" id="" />
              <SearchIcon fontSize='small' className='icon search-icon' />
            </div>
            <div className="user">
              {user?.photoUrl && <img src={user.photoUrl} className='user-image' />
              }
              <span>{user?.username}</span>
              <KeyboardArrowDownIcon className='icon down-arrow' fontSize="small" />
            </div>

            {pathname !== '/checkout' && <div className="cartIcon" onClick={() => dispatch(setShowCart(!showCart))}>
              <ShoppingCartOutlinedIcon className='icon' />
              <div className='noOfItems'><span>{noOfItems}</span></div>
            </div>}
            {showCart && <Cart />}

          </div>

        </div>
        {inCheckoutPage &&
          <div className="secure-checkout">
            <LockIcon fontSize='medium' className='icon' />
            <p>SECURE CHECKOUT</p>
          </div>}
      </div>

    </div>
  )
}

export default Navbar