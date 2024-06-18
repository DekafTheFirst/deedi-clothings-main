import React from 'react'
import "./Footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>Help us keep running
            If you don't mind tech-related ads (no tracking or remarketing), and want to keep us running, please whitelist us in your blocker.
            Thank you! ❤️</span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sodales consequat ullamcorper. Fusce lorem lacus, blandit non erat sed, placerat porttitor lacus. Aliquam ac nunc nec orci tristique consequat. Cras tristique mollis pharetra. Donec sagittis viverra leo eu porta. Vivamus rutrum porta magna, sed vestibulum ligula hendrerit ut.</span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">DEEDI</span>
          <span className="copyright">&copy; Copyright 2024, All Rights Reserved</span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="payment" />
        </div>
      </div>
    </footer>
  )
}

export default Footer