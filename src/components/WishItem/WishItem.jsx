import React, { useEffect, useState } from 'react';
import styles from './WishItem.module.css';


export default function CartItem({product,removeItem,showAction}) {

  console.log(showAction)

  if(showAction == undefined){
    showAction = true
  }

    let [count,setCount] = useState(0)
    useEffect(()=> {},[])
  return (
    <><tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="p-4">
      <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
    </td>
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {product.title}
    </td>
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {product.price}
    </td>
    {showAction? <><td className="px-6 py-4">
      <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>removeItem(product._id)}>Remove</button>
    </td></> : null }
    
  </tr> </>
  )
}
