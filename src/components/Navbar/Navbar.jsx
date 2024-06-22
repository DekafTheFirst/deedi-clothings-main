import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import "./Navbar.scss"
import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { Menu, MenuOpen } from '@mui/icons-material';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const products = useSelector(state => state.cart.products)

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="left">
          <Menu className='toggle'/>
          <div className="nav-items">
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
          <Link className="link" to='/'><img src='/img/deedi_transparent.png' /></Link>
        </div>
        <div className="right">




          {/* <div className="item">
            <Link className="link" to="/products/3">Stores</Link> 
          </div> */}
          <div className="icons">
            <div className="searchbar">
              <SearchIcon fontSize='small' className='search-icon' />
            </div>
            <div className="user">
              <PersonOutlineIcon />
              <span>My Account</span>
              <KeyboardArrowDownIcon className='down-arrow' fontSize='small' />
            </div>
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>


          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  )
}

export default Navbar