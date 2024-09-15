/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
export default function Footer() {
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])
  return (
    <footer className=' fixed bottom-0 right-0 left-0 bg-slate-500 text-center text-2xl text-white p-4'>
      <h2>Footer</h2>
    </footer>
  )
}
