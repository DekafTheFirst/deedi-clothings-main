import React from 'react'
import "./Home.scss"
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import MySwiper from '../../components/Swiper/MySwiper'
import { Link } from 'react-router-dom'
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage'


const Home = () => {
  return (
    <div className="home">
      {/* <Slider /> */}
      <div className="hero">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='blob-1'>
          <path fill="#D0E2FF" d="M52,-58.1C61,-43,57.5,-21.5,55.5,-2C53.5,17.5,53,35.1,44.1,50.5C35.1,65.9,17.5,79.2,2.6,76.7C-12.4,74.1,-24.9,55.7,-39.9,40.3C-54.9,24.9,-72.5,12.4,-73,-0.5C-73.5,-13.4,-56.9,-26.8,-41.9,-41.9C-26.8,-56.9,-13.4,-73.6,4,-77.7C21.5,-81.7,43,-73.1,52,-58.1Z" transform="translate(100 100)" />
        </svg>

        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='blob-2'>
          <path fill="#E8DAFF" d="M41.6,-59.1C54.5,-47.9,65.8,-36.5,71.9,-22.3C77.9,-8.2,78.5,8.8,71.5,21.1C64.6,33.4,50,41.1,36.8,51.8C23.6,62.5,11.8,76.3,-2.4,79.5C-16.5,82.8,-33,75.5,-44,64C-55,52.6,-60.4,37,-61.1,22.8C-61.7,8.5,-57.5,-4.4,-53.3,-17.4C-49.2,-30.4,-45.1,-43.4,-36.3,-55.9C-27.4,-68.4,-13.7,-80.3,0.3,-80.7C14.4,-81.2,28.7,-70.3,41.6,-59.1Z" transform="translate(100 100)" />
        </svg>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 content">
              <div className="top">
                <p>SUMMER <br></br>COLLECTION 2024</p>
              </div>
              <h1>Wear <span className="deedi">Deedi</span>, <br></br><span className='weave-hope'>Weave Hope</span></h1>
              <div className="bottom">
                <Link to="/products" className="btn">Shop Now</Link>
              </div>
            </div>
            <div className="col-6 image">
              <OptimizedImage src="/img/img-5-medium-removebg.png" className='img' />
              {/* <img src="/img/blob-1.svg" alt="blob-1" className='blob-1' /> */}



            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <Categories />

        <FeaturedProducts type="featured" />
      </div>

      {/* <FeaturedProducts type="trending" /> */}
      <Contact />

    </div>

  )
}

export default Home