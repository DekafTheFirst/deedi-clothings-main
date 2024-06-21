import React from 'react'
import "./Home.scss"
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import MySwiper from '../../components/Swiper/MySwiper'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      {/* <Slider /> */}
      <div className="hero">
        <MySwiper />
        <div className="content">
          <h1>Wear Deedi, <span>Wear Hope</span></h1>
          <p>A minority woman-owned business supporting  widows and vulnerable children in west Africa…We are not just selling clothes we are selling a story, a cause.</p>
          <Link to="/products" className="btn">Shop</Link>

        </div>
      </div>
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending" />
      <Contact />
    </div>

  )
}

export default Home