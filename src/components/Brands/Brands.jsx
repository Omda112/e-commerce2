
import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../../Store/counter/conter.slice';

export default function Brands () {
  let {counter} = useSelector((store) => store); console.log(counter);
  let disptach = useDispatch()
  return (
    <>
  <button onClick={()=>disptach(decrease())} className='☐ bg-red-600 Itext-white p-3 rounded-md mr-10'> - </button>
  <h1 className='text-4xl'>
  hello from redux {counter.count}
  </h1>
  <button onClick={()=>disptach(increase())} className='☐ bg-green-600 Itext-white p-3 rounded-md'> +</button>
  </>
  )
  }
  