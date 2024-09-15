import React, { useEffect, useState } from 'react';
import styles from './MainSlider.module.css';
import Slider from 'react-slick';
import Slider1 from '../../assets/assets/images/slider-image-1.jpeg'
import Slider2 from '../../assets/assets/images/slider-image-2.jpeg'
import Slider3 from '../../assets/assets/images/slider-image-3.jpeg'


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 500
  };

    let [count,setCount] = useState(0)
    useEffect(()=> {},[])
  return (
    <>
    <div className="row my-10">
      <div className="w-3/4">
        <Slider{...settings}>
          <img src={Slider1} className='h-[600px]' alt="" />
          <img src={Slider2} className='h-[600px]' alt="" />
          <img src={Slider3} className='h-[600px]' alt="" />
        </Slider>
      </div>
      <div className='w-1/4'>
        <img src={Slider2} className='h-[300px]' alt="" />
        <img src={Slider3} className='h-[300px]' alt="" />
      </div>
    </div>
    </>
  )
}
