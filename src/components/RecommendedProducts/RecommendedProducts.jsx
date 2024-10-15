import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './RecommendedProducts.module.css';
import axios from 'axios';
import { CounterContext } from '../../Context/CounterContext';
import ProductItem from '../ProductItem/ProductItem';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';


export default function RecommendedProducts() {
  let [Loading,setLoading] = useState(false)//
  let {addProductToCart,cartItemsNo,setCartItemsNo,iconPosition } = useContext(CartContext)
  let {addProductToWishList,WishListNo,setWishListNo} = useContext(WishListContext)
  let [products,setProducts] = useState([])
  let [currentIds,setCuurentId] = useState([])
  let [currentIdsWl,setCuurentIdWl] = useState([])
  console.log(iconPosition);
  
  function getBoundingClientRect(){
      if (cartIconRef.current) {
          const cartIconRect = cartIconRef.current.getBoundingClientRect();
          setBoundries("hi");
      }
  }

  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }


  async function addproduct(id){
    console.log("hello",id)
    setLoading(true)//

    // let x = structuredClone(currentIds) //
    let x = [...currentIds]
    setCuurentId(x)
    setTimeout(()=>{
      currentIds[id] = true //
      setCuurentId(currentIds)//
    },10)
    
    setTimeout(()=>{
      console.log(currentIds);
    },1000)
    
  let res = await addProductToCart(id)//
  //  console.log("addToCart",data)
  if(res.status == "success"){
    let newCartItemsNo = cartItemsNo + 1;
    setCartItemsNo(newCartItemsNo)
    toast.success(res.message,{
      position: 'bottom-right'
    })
  }else{
    toast.error(res.message,{
      position: 'bottom-right'
    })
  }
   setLoading(false)
  }


  async function addWL(productId) {
    setLoading(true);
    let x = [...currentIdsWl];
    x[productId] = true;
    setCuurentIdWl(x);

    let res = await addProductToWishList(productId);
    if (res.status === "success") {
      let newCartItemsNo = cartItemsNo + 1;
      setCartItemsNo(newCartItemsNo);
      toast.success(res.message, { position: 'bottom-right' });
    } else {
      toast.error(res.message, { position: 'bottom-right' });
    }
    console.log(res);
    setLoading(false);
  }


  let x = useQuery({
    queryKey: ['Products'],
    queryFn : getProducts
  })

  
   let {isLoading,data,isError} = useQuery({
    queryKey: ['Products'],
    queryFn : getProducts
   })

   
   
  if(isLoading){
    return
    <div className="flex justify-center w-full">
    <HashLoader color='#09c'/>
    </div>
  }

return (
  <>
  <div className='row'>
    { data?.data?.data.map(product => 
      <ProductItem 
        key={product.id} 
        currentIds={currentIds}
        loading={Loading}
        addproduct={addproduct}
        addWL={addWL}
        product={product} 
        // moveToIcon={moveToIcon}
        // box={box}
        // setBox={setBox}
      />
    )}
  </div>
  
  </>
)

}



