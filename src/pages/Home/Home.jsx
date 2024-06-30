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

        <svg xmlns="http://www.w3.org/2000/svg" className='blob-1' viewBox="26.57 62.33 143.6 98.19">
          <path fill="#FF4B5C" d="M65.8,-31.5C75.7,-20.8,67.6,6.8,53.6,26.8C39.6,46.7,19.8,59.2,-2.2,60.4C-24.2,61.7,-48.3,51.8,-61.7,32.1C-75.1,12.4,-77.8,-17,-65.7,-28.9C-53.6,-40.8,-26.8,-35.2,0.6,-35.6C27.9,-35.9,55.8,-42.1,65.8,-31.5Z" transform="translate(100 100)"></path>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="blob-2" viewBox="22.41 38.35 144.13 133.99">
                <path fill="#FF4B5C" d="M57.3,-45.3C68.6,-31.5,68.3,-8,63,13.9C57.6,35.9,47.2,56.2,30.1,65.7C12.9,75.3,-11.1,74,-32.9,64.9C-54.7,55.7,-74.3,38.6,-77.2,19.5C-80.1,0.4,-66.2,-20.7,-50.5,-35.5C-34.9,-50.3,-17.4,-58.9,2.8,-61.1C23,-63.3,45.9,-59.1,57.3,-45.3Z" transform="translate(100 100)"></path>
              </svg>
              <OptimizedImage src="/img/img-5-medium-removebg.png" className='img' />

              {/* <img src="/img/blob-1.svg" alt="blob-1" className='blob-1' /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <FeaturedProducts type="featured" />
      </div>
      <Categories />


      {/* <FeaturedProducts type="trending" /> */}
      <Contact />

    </div>

  )
}

export default Home