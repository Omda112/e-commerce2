import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem.jsx';
import Slider from "react-slick";
import { HashLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext.jsx';
// import { Toast } from 'flowbite-react';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext.jsx';

export default function ProductDetail() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
 
  let { id, category } = useParams();
  let [productDetails, setProductDetails] = useState({});
  let [relatedProducts, setRelatedProducts] = useState([]);
  let {addProductToCart,cartItemsNo,setCartItemsNo} = useContext(CartContext);
  let {addProductToWishList,WishListNo,setWishListNo} = useContext(WishListContext)
  let [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductDetails();
    getRelatedProducts();
  },[id]);

 

  function getRelatedProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        let x = data.data.filter((ele) => ele.category._id === category && ele.id !== id);
        setRelatedProducts(x);
      })
      .catch(err => console.log(err));
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  async function addToCart(id){
    console.log("hello",id);
    
    let res = await addProductToCart(id)
    console.log(res)
    let newCartItemsNo = cartItemsNo + 1;
    setCartItemsNo(newCartItemsNo)
    if(res.status == "success"){
      toast.success(res.message,{
        position: 'bottom-right'
    })
    }else{
      toast.error(res.message,{
        position: 'bottom-right'
    })
    }
   }

   async function addToWL(productId) {
    setLoading(true);
    let res = await addProductToWishList(productId);
    if (res.status === "success") {
      let newCartItemsNo = cartItemsNo + 1;
      setCartItemsNo(newCartItemsNo);
      toast.success(res.message, { position: 'bottom-right' });
    } else {
      toast.error(res.message, { position: 'bottom-right' });
    }
    setLoading(false);
  }
  let {data,isLoading} = useQuery({
    queryKey: ['Details',id],
    queryFn: getProductDetails,
    // refetchInterval:3000,
    gcTime:3000,
    select: (data)=> data?.data.data
  })
 

  useEffect(()=>{
    console.log(data)
    setProductDetails(data)
  },[data])
  

  return (
    <>
      <div className="row items-center">
        
          {isLoading ?
            <div className="flex justify-center w-full">
            <HashLoader />
            </div>
          : (
            <>
              <div className="w-2/4">
                <Slider {...settings}>
                  {productDetails?.images?.map((img, index) => (
                    <img key={index} src={img} className='w-full' alt="" />
                  ))}
                </Slider>
              </div>
              <div className="w-2/4">
                <h1 className='font-bold text-3xl text-slate-800'>{productDetails?.title}</h1>
                <p>{productDetails?.description}</p>
                <span className='mb-4 block'>{productDetails?.category?.name}</span>
                <div className='flex justify-between'>
                  <span>{productDetails?.price} EGP</span>
                  <span>{productDetails?.ratingsAverage} <i className='fa fa-star text-yellow-300'></i></span>
                </div>
                <button className='btn' onClick={()=>addToCart(productDetails.id)}>Add to cart</button>
                <button className='btn' onClick={()=>addToWL(productDetails.id)}>Add to WishList </button>
              </div>
            </>
          )}
        </div>

      <div className="row">
        <h2 className='text-gray-950 font-extrabold text-3xl my-9'>Related Products</h2>
        <div className="row">
          {relatedProducts.map(product => (
            <ProductItem key={product._id} product={product} addproduct={addToCart} addWL={addToWL} />
          ))}
        </div>
      </div>
    </>
  );
}
