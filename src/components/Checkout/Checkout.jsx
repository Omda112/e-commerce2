import React, { useContext, useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
export default function Checkout() {

    let {cartId} = useParams()
    let [isOnlinePayment,setIsOnlinePayment] = useState(false)
    let{cashOnDelievery} = useContext(CartContext)
    let navigate = useNavigate()
    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
    console.log(cartId);
    
  if(isOnlinePayment){
    url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
  }

  async function pay(){
    console.log(cartId);
    console.log(myForm.values)
     
    let res = await cashOnDelievery(url,myForm.values)
    if(res.status == "success"){
      if(isOnlinePayment){
        window.location.href = res.session.url
      }
      else{
        navigate('/allOrder')
      }
    }else{
      console.log("ay7aga",res);
      
    }
  }

  let myForm = useFormik({
    initialValues: {
      city:"cairo",
      details:"datails",
      phone:"01010800921"
    },
  onSubmit : pay
  })

    useEffect(()=> {},[])

  return (
    <>
      <h1>Checkout now:</h1>
      
      <form onSubmit={myForm.handleSubmit} className=' max-w-lg mx-auto mt-5'>
          <div className='w-[50%] mx-auto' >
      <div className="mb-5">
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
      <input type="text" id="details" name='details' onChange={myForm.handleChange} value={myForm.values.details} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
      </div>
      <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
      <input type="tel" id="phone" name='phone' onChange={myForm.handleChange} value={myForm.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
      </div>
      <div className="mb-5">
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
      <input type="text" id="city" name='city' onChange={myForm.handleChange} value={myForm.values.city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
      </div>

      <input type="checkbox" id='forOnline' onChange={()=>setIsOnlinePayment(!isOnlinePayment)} />
      <label htmlFor="forOnline">Pay Online</label>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isOnlinePayment? 'Pay Online' : 'COD'}
      </button>
          </div>
      </form>
    </>
    
  )
}
