import React, { useEffect, useState } from 'react';
import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';


export default function ProductItem({product,addproduct,loading,currentIds,addWL}) {
  // console.log(product)
    // let [currentId,setCurrentId] = useState(null)
    useEffect(()=> {},[])
  return (
    <>
    <div className="w-1/6 p-1">
      <div className="product overflow-hidden hover:rounded-md">
        <Link to={`/productDetails/${product.id}/${product.category._id}`}>
          <img src={product.imageCover} className='w-full' alt="" />
          <div className='p-2'>
            <span>{product.category?.name}</span>
            <h2 className='font-bold mb-3'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
            <div className="flex justify-between">
              <span className='text-green-500'>{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className='fa fa-star text-yellow-300'></i> </span>
            </div>

            </div>
        </Link>
        <div className='px-3 pb-3'>
          <button className='btn' onClick={()=>addproduct(product.id)}>
          {loading && currentIds[product.id] ? <i className='fa fa-spinner fa-spin'></i> : <span> Add to cart</span>}
           </button>
        </div>
        <div className='px-3 pb-3'>
          <button className='btn' onClick={()=>addWL(product.id)}>
          {loading ? <i className='fa fa-spinner fa-spin'></i> : <span> Add to WishList</span>}
           </button>
        </div>
      </div>
    </div>
    </>
  )
}


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function ProductItem({ product, addToCart }) {
//   // هنا بعمل state للـ loading لكل زر إضافة للسلة بشكل منفصل
//   let [loading, setLoading] = useState(false);

//   async function handleAddToCart() {
//     setLoading(true); // ابدأ الـ spinner
//     await addToCart(product.id); // استدعي الفانكشن لإضافة المنتج
//     setLoading(false); // وقف الـ spinner بعد انتهاء الإضافة
//   }

//   return (
//     <div className="w-1/6 p-1">
//       <div className="product overflow-hidden hover:rounded-md">
//         <Link to={`/productDetails/${product.id}/${product.category._id}`}>
//           <img src={product.imageCover} className='w-full' alt="" />
//           <div className='p-2'>
//             <span>{product.category?.name}</span>
//             <h2 className='font-bold mb-3'>{product.title.split(" ").splice(0, 2).join(" ")}</h2>
//             <div className="flex justify-between">
//               <span className='text-green-500'>{product.price} EGP</span>
//               <span>{product.ratingsAverage} <i className='fa fa-star text-yellow-300'></i></span>
//             </div>
//           </div>
//         </Link>
//         <div className='px-3 pb-3'>
//           <button className='btn' onClick={()=>addToCart(product.id)}>
//             {/* هنا بنربط الـ spinner لكل منتج بشكل منفصل */}
//             {loading ? <i className='fa fa-spinner fa-spin'></i> : <span>Add to cart</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
