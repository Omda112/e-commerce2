/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import Slider from "react-slick";
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function TemplateNmae() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 500
  };

  let [count,setCount] = useState(0)
  let[categories,setCategories] = useState([])

  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data}) =>{
      // console.log(data.data)
      setCategories(data.data)
      // setProductDetails(data.data)
    } )
    .catch(err => console.log(err))
  }

   
    useEffect(()=> {
      getCategories()
    },[])


  return (
    <>

        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Category</title>
            </Helmet>
        </div>
    
  <Slider {...settings}>
    {categories.map(category=> <div key={category._id}>
      <img src={category.image} className='h-[300px] p-3' alt="" />
      <h2>{category.name}</h2>
    </div> )}

  </Slider>
  </>
  )
}
