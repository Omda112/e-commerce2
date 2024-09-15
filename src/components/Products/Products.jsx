import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
export default function Products() {

  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  
   let {isLoading,data,isError} = useQuery({
    queryKey: ['Route'],
    queryFn : getProducts,
    staleTime: 5000
   })

    let [count,setCount] = useState(0)
    useEffect(()=> {},[])

   
  return (
    <>
    </>
  )
}
