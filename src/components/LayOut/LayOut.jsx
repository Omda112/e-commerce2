/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import styles from './LayOut.module.css';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom';

export default function TemplateNmae() {
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])
  return (
    <>
    <Navbar/>

      <div className="container mx-auto py-11">
          <Outlet/>
      </div>
      

    <Footer/>
    </>
  )
}
