import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h4 className="fw-bold mb-2 heading">Categories</h4>
      {/* <div className="cards">
        <div className="category-card">
          <div className="content">
            <div className="text">
              <h6 className="fw-bold">Women</h6>
              <p>Beautiful Pieces for her</p>
            </div>
            <Link to="/women" className="link">Shop Now</Link>
          </div>
          <div className="right">
            <div className="image women">
            </div>
          </div>
        </div>
        <div className="category-card">
          <div className="content">
            <div className="text">
              <h6 className="fw-bold">Men</h6>
              <p>Elegant Pieces for him</p>
            </div>
            <Link to="/women" className="link">Shop Now</Link>
          </div>
          <div className="right">
            <div className="image men">
            </div>
          </div>
        </div>
      </div> */}

      <div className="cards">
        <div className="category-card women">
          <div className="content">
            <div className="text">
              <h6 className="fw-bold title">Women</h6>
              <p>Beautiful Pieces for her</p>
            </div>
            <Link to="/women" className="link">Shop Now</Link>
          </div>
          <div className="right">
            <div className="image ">
            </div>
          </div>
        </div>
        <div className="category-card men">
          <div className="content">
            <div className="text">
              <h6 className="fw-bold title">Men</h6>
              <p>Elegant Pieces for him</p>
            </div>
            <Link to="/women" className="link">Shop Now</Link>
          </div>
          <div className="right">
            <div className="image">
            </div>
          </div>
        </div>

        <div className="category-card kids">
          <div className="content">
            <div className="text">
              <h6 className="fw-bold title">Kids</h6>
              <p>Elegant Pieces for him</p>
            </div>
            <Link to="/women" className="link">Shop Now</Link>
          </div>
          <div className="right">
            <div className="image">
            </div>
          </div>
        </div>

        {/* <div className="category-card kids">
          <div className="content">
            <div className="text">
              <h6 className="fw-bold">Accessories</h6>
              <p>Elegant Pieces for him</p>
            </div>
            <Link to="/women" className="link">Shop Now</Link>
          </div>
          <div className="right">
            <div className="image">
            </div>
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default Categories;