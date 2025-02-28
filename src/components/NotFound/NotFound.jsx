/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './NotFound.module.css';
import notFound from '../../assets/assets/images/notFound.jpg';
export default function TemplateNmae() {
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])
  return (
    <div>
      <img src={notFound} alt="" />
    </div>
  )
}
