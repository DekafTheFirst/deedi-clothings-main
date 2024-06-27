import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const Categories = () => {
  return (
    <div className="categories">
      {/* <div className="cards">
        <div className="category-card">
          <div className="content">
            <div className="text">
              <h1 className="fw-bold">Women</h1>
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
              <h1 className="fw-bold">Men</h1>
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
        <Link to="/products/women" className="category-card dresses ">
          <div className="content">
            <div className="text">
              <h1 className=" title">Dresses</h1>
              <p>Beautiful Pieces for her</p>
            </div>
            <span to="/dresses" className="link">Shop Now</span>
          </div>
          <div className="image">
            <OptimizedImage src="/img/img-7-medium.jpg" className="img" />
          </div>

        </Link>

        <Link className="category-card regular-category-card men">
          <div className="content">
            <div className="text">
              <h1 className=" title">Men</h1>
              <p>Beautiful Pieces for her</p>
            </div>
            <span to="/women" className="link">Shop Now</span>
          </div>
          <OptimizedImage src="/img/img-8-medium-transparent.png" className="img" />
        </Link>

        <Link className="category-card accessories ">
          <div className="content">
            <div className="text">
              <h1 className=" title">Home Accessories</h1>
              <p>Beautiful Pieces for her</p>
            </div>
            <span to="/women" className="link">Shop Now</span>
          </div>
          <div className="image">
            <OptimizedImage src="/img/img-10-medium.jpg" className="img" />
          </div>
        </Link>

        <Link className="category-card regular-category-card kids">
          <div className="content">
            <div className="text">
              <h1 className=" title">Kids</h1>
              <p>Beautiful Pieces for her</p>
            </div>
            <span to="/women" className="link">Shop Now</span>
          </div>
          <OptimizedImage src="/img/img-9-medium-removebg.png" className="img" />
        </Link>





      </div>

    </div>
  );
};

export default Categories;