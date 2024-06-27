import React, { useEffect, useState } from 'react'
import "./FeaturedProducts.scss"
import Card from '../Card/Card'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'
const FeaturedProducts = ({ type }) => {
  // const data = [
  //   {
  //     id: 1,
  //     img: '/img/products/1.1.jpg',
  //     img2: '/img/products/1.2.jpg',
  //     title: 'Sweater x White Tee Outfit',
  //     isNew: true,
  //     oldPrice: 19,
  //     price: 12,

  //   },
  //   {
  //     id: 2,
  //     img: '/img/products/2.1.jpg',
  //     img2: '/img/products/2.2.jpg',
  //     title: 'Casual Outside Outfit',
  //     isNew: true,
  //     oldPrice: 19,
  //     price: 12,

  //   },
  //   {
  //     id: 3,
  //     img: '/img/products/3.1.jpg',
  //     img2: '/img/products/3.2.jpg',
  //     title: 'Casual Outside Outfit',
  //     isNew: true,
  //     oldPrice: 19,
  //     price: 12,

  //   },
  //   {
  //     id: 4,
  //     img: '/img/products/4.1.jpg',
  //     img2: '/img/products/4.2.jpg',
  //     title: 'Casual Outside Outfit',
  //     isNew: true,
  //     oldPrice: 19,
  //     price: 12,

  //   },
  // ]

  const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)

  return (
    <div className='featuredProducts'>
      <div className="row">
        <div className="col-md-4">
          <h1>{type} products</h1>
        </div>
        <div className="col-md-5">
          <p>
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consequatur neque
            totam sed tenetur expedita
             
          </p>
        </div>

      </div>
      <div className="products">
        {
          error ? "Something went wrong!" : (loading ?
            "loading"
            : data?.map(item => (<Card key={item.id} item={item} />)))
        }
      </div>
    </div>
  )
}

export default FeaturedProducts