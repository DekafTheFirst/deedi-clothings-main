import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './MySwiper.scss';

// import required modules
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules';

export default function MySwiper() {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true
        }}
        // autoplay={{
          
        //   delay: 2000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: false
        // }}
        effect={'fade'}
        keyboard={
          true
        }
        loop={true}
        navigation={true}
        modules={[Pagination, Autoplay, EffectFade, Navigation, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide className='hero-img hero-img-1'></SwiperSlide>
        <SwiperSlide className='hero-img hero-img-2'></SwiperSlide>
        <SwiperSlide className='hero-img hero-img-3'></SwiperSlide>

      </Swiper>

    </>
  );
}
