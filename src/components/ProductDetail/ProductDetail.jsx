import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem.jsx';
import Slider from "react-slick";
import { HashLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext.jsx';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext.jsx';

export default function ProductDetail() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
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
    gcTime:3000,
    select: (data)=> data?.data.data
  })
 
  useEffect(()=>{
    console.log(data)
    setProductDetails(data)
  },[data])
  
  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="flex justify-center items-center py-16 w-full">
          <HashLoader color='#16a34a' />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6 py-8">
            {/* Product Images */}
            <div className="w-full md:w-1/2 lg:w-2/5 mb-6 md:mb-0">
              <div className="max-w-md mx-auto">
                <Slider {...settings}>  
                  {productDetails?.images?.map((img, index) => (
                    <div key={index} className="px-2">
                      <img src={img} className="w-full h-64 md:h-80 object-contain mx-auto" alt="Product" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <h1 className='font-bold text-2xl md:text-3xl text-slate-800 mb-3'>{productDetails?.title}</h1>
              <p className="text-gray-700 mb-4">{productDetails?.description}</p>
              <span className='mb-4 block text-gray-600'>{productDetails?.category?.name}</span>
              
              <div className='flex justify-between items-center mb-6'>
                <span className="text-lg font-semibold">{productDetails?.price} EGP</span>
                <span className="flex items-center">
                  {productDetails?.ratingsAverage} 
                  <i className='fa fa-star text-yellow-300 ml-1'></i>
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  className='btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors' 
                  onClick={()=>addToCart(productDetails.id)}
                >
                  Add to cart
                </button>
                <button 
                  className='btn border border-green-500 text-green-500 hover:bg-green-50 py-2 px-4 rounded transition-colors' 
                  onClick={()=>addToWL(productDetails.id)}
                >
                  Add to WishList
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="row">
        <h2 className='text-green-500 font-extrabold text-3xl my-9'>Related Products</h2>
        <div className="row">
          {relatedProducts.map(product => (
            <ProductItem key={product._id} product={product} addproduct={addToCart} addWL={addToWL} />
          ))}
        </div>
      </div>
        </>
      )}
    </div>
  );
}