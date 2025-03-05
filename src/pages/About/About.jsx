import React from 'react'
import "./About.scss"
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage'
import { useNavigate } from 'react-router-dom'
import { Diversity3 } from '@mui/icons-material'

const About = () => {
  const navigate = useNavigate()
  const itemToPass = {
    name: "dekaf"
  }



  return (
    <div className="about-us-page">
  <div className="container">
    <div className="row">
      <div className="col-md-6 image-col">
        <OptimizedImage src="/img/women-empowerment-2.jpg" className="image" />
      </div>
      <div className="col-md-6 text-col">
        <span>About Us</span>
        <h4 className="title">About Deedi</h4>
        <p>
          At <strong>Deedi</strong>, we are more than just a clothing brand—we are a movement dedicated to 
          <strong> empowering voiceless widows in West Africa</strong>. Every purchase fuels economic 
          independence, providing these resilient women with the opportunity to support their families, 
          regain their dignity, and build a better future.
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 image-col">
        <OptimizedImage src="/img/women-empowerment.jpg" className="image" />
      </div>
      <div className="col-md-6 text-col">
        <span>Our Vision</span>
        <h4 className="title">Deedi's Vision</h4>
        <p>
          At <strong>Deedi</strong>, we envision a world where <strong>every voiceless widow in West Africa 
          has the opportunity to thrive and sustain her family</strong>. We empower these resilient women by 
          providing sustainable economic opportunities through the sale of unique, ethically-made clothing. 
          Each purchase not only supports a widow but also fuels our commitment to enhance livelihoods, 
          support families, and strengthen communities.
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 image-col">
        <OptimizedImage src="/img/women-empowerment-4.jpg" className="image" />
      </div>
      <div className="col-md-6 text-col">
        <span>Our Impact</span>
        <h4 className="title">How Your Purchase Makes a Difference</h4>
        <p>
          Every <strong>Deedi</strong> purchase empowers a voiceless widow in West Africa, 
          providing her with <strong>sustainable livelihood opportunities</strong> and the 
          support she needs to uplift her family. We are not just selling clothes—we are 
          <strong>selling a story, a cause, and a mission to transform lives</strong>.
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 image-col">
        <OptimizedImage src="/img/women-empowerment-3.jpg" className="image" />
      </div>
      <div className="col-md-6 text-col">
        <span>Our Commitment</span>
        <h4 className="title">Beyond Fashion</h4>
        <p>
          As a <strong>minority-owned business</strong>, Deedi is deeply committed to 
          making a difference. <strong>100% of our profits</strong> go toward transforming 
          and empowering the lives of widows and vulnerable children in West Africa. 
          With every purchase, you are directly contributing to a widow’s journey toward 
          independence and dignity.
        </p>
      </div>
    </div>
  </div>
</div>

  )
}

export default About