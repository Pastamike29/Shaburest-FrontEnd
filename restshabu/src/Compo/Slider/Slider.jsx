import React from 'react'
import { Navigation, Pagination, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination';
import promo1 from '../Assets/promo1.jpg'
import promo2 from '../Assets/promo2.jpg'
import promo3 from '../Assets/promo3.jpg'
import promo4 from '../Assets/promo4.jpg'

function Slider() {
  return (
    <Swiper
    style={{
      "--swiper-pagination-color": "#DD590FE5",
      "--swiper-navigation-color": "black",
    }}
      modules={[Navigation, Pagination, A11y,EffectCoverflow,Autoplay]}
      grabCursor={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
       centeredSlides={true}
      spaceBetween={300}
      slidesPerView={1}
      loop={true}
      navigation={{clickable:true}}
      pagination={{ clickable: true }}
    >
      <SwiperSlide><img src={promo1} alt="" style={{width:"80%" , height:"31.25rem"}}/></SwiperSlide>
        <SwiperSlide><img src={promo2} alt="" style={{width:"80%" , height:"31.25rem"}}/></SwiperSlide>
      <SwiperSlide><img src={promo3} alt="" style={{width:"80%", height:"31.25rem"}}/></SwiperSlide>
      <SwiperSlide><img src={promo4} alt=""style={{width:"80%", height:"31.25rem"}} /></SwiperSlide>
    </Swiper>
  )
}
export default Slider