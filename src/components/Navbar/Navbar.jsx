import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import "./Navbar.scss"
import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { Close, Menu, MenuOpen } from '@mui/icons-material';

const Navbar = ({ setShowCart }) => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const products = useSelector(state => state.cart.products)


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
        setToggle(false); // Close the navbar if clicked outside
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
    <div className={`navbar ${scrolled ? 'scrolled' : ''} ${toggle ? 'toggeled' : ''}`}>
      <div className="container-fluid">
        <div className="left">

          <Menu className='toggle' onClick={() => setToggle(!toggle)} />
          <div className={`nav-items ${toggle ? 'show' : ''}`}>
            <div className="top">
              <Link className="brand collapse-menu-brand" to='/'><img src='/img/deedi-logo.png' /></Link>
              <Close className='close' onClick={() => setToggle(!toggle)} />
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
          <Link className="brand" to='/'><img src='/img/deedi-logo.png' /></Link>
        </div>
        <div className="right">
          {/* <div className="item">
            <Link className="link" to="/products/3">Stores</Link> 
          </div> */}
          <div className="icons">
            <div className="searchbar">
              <input type="text" name="" id="" />
              <SearchIcon fontSize='small' className='icon search-icon' />
            </div>
            <div className="user">
              <PersonOutlineIcon className='icon' fontSize='small' />
              <span>My Account</span>
              <KeyboardArrowDownIcon className='icon down-arrow' fontSize="small" />
            </div>
            <div className="cartIcon" onClick={() => setShowCart((prev) => !prev)}>
              <ShoppingCartOutlinedIcon className='icon' />
              <span>{products.length}</span>
            </div>


          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar