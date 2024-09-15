
import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import RecommendedProducts from '../RecommendedProducts/RecommendedProducts';
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
    useEffect(()=> {
     
    },[])


  return (
    <>
    <MainSlider/>
    <Categories/>
    <div className="row">
      <RecommendedProducts/>
    </div>
    </>
  )
}
