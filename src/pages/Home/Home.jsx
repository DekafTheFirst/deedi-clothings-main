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
        {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='blob-1'>
          <path fill="#D0E2FF" d="M52,-58.1C61,-43,57.5,-21.5,55.5,-2C53.5,17.5,53,35.1,44.1,50.5C35.1,65.9,17.5,79.2,2.6,76.7C-12.4,74.1,-24.9,55.7,-39.9,40.3C-54.9,24.9,-72.5,12.4,-73,-0.5C-73.5,-13.4,-56.9,-26.8,-41.9,-41.9C-26.8,-56.9,-13.4,-73.6,4,-77.7C21.5,-81.7,43,-73.1,52,-58.1Z" transform="translate(100 100)" />
        </svg> */}

        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='blob-2'>
          <path fill="#FAF4E6" d="M43.5,-46.3C55.9,-31.1,65.2,-15.5,65.3,0.1C65.3,15.7,56.2,31.4,43.8,43.2C31.4,54.9,15.7,62.8,-2.9,65.7C-21.5,68.6,-43,66.5,-56.3,54.8C-69.7,43,-74.8,21.5,-72.3,2.6C-69.7,-16.3,-59.4,-32.7,-46,-47.9C-32.7,-63.1,-16.3,-77.2,-0.4,-76.8C15.5,-76.4,31.1,-61.5,43.5,-46.3Z" transform="translate(100 100)" />
        </svg>
        <div className="container-fluid">
          <div className="row">
            <div className="col-7 col-sm-6 content">
              <div className="top">
                <p>SUMMER <br></br>COLLECTION 2024</p>
              </div>
              <h1>Wear <span className="deedi">Deedi</span>, <br></br><span className='weave-hope'>Weave Hope</span></h1>
              <div className="bottom">
                <Link to="/products" className="btn">Shop Now</Link>
              </div>
            </div>
            <div className="col-5 col-sm-6 image">
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