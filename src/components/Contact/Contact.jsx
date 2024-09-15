import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/products/products.slice';


export default function Contact() {
  let disptach = useDispatch()
  let {products,isLoading,isError} = useSelector((store)=>store.products)
  console.log(products)
  useEffect(()=>{
    disptach(getProducts())
  },[])

return (
  <>
    {products.map((ele)=><h1 key={ele.id}>{ele.title}</h1>)}
  </>
)
}
