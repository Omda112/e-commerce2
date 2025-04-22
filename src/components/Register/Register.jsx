/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [apiError,setApiError] = useState(null)
  let [isLoading,setIsLoading] = useState(false)

  let navigate = useNavigate()
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])

    function register(initialValues){
      setApiError(null)
      setIsLoading(true)
      console.log("batee5")

     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',initialValues)
     .then((res) =>{
      let {data} = res;
      if(data.message == "success"){
        //yro7 3la l login
        navigate('/login')
      }else{

      }
     })
     .catch((error)=>{
        setApiError(error.response.data.message)
        setIsLoading(false)
     })
     console.log(data)

     if(data.message == "success"){
      //login
     }else{

     }
    }


    const validationSchema = ()=> {
      return Yup.object({
        name:Yup.string().min(3,"not less than 3").max(10,'max is 10').required('Required'),
        email:Yup.string().email("invalid emadil").required('Required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required("Required"),
        rePassword:Yup.string().oneOf([Yup.ref('password')]).required("Required"),
        phone : Yup.string().matches(/^01[0125][0-9]{8}$/).required("Required")
      })
    }

    let myForm = useFormik({
      initialValues: {
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:""
      },
    validationSchema,
    onSubmit : register
})


  return (
    <>
    {apiError && <div class="max-w-lg mx-auto mt-5 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium">{apiError}</span>
    </div>}


        <form onSubmit={myForm.handleSubmit} className=' max-w-lg mx-auto mt-5'>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
              <input  type="text" id="name" name='name' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>

              {myForm.errors.name && myForm.touched.name?<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium">{myForm.errors.name}</span>
              </div> : null }

            


            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="email" name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
            {myForm.errors.email && myForm.touched.email?<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium">{myForm.errors.email}</span>
              </div> : null }



            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" id="password" name='password' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
            {myForm.errors.password && myForm.touched.password?<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium">{myForm.errors.password}</span>
              </div> : null }





            <div className="mb-5">
              <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
              <input type="password" id="rePassword" name='rePassword' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
            {myForm.errors.rePassword && myForm.touched.rePassword?<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium">{myForm.errors.rePassword}</span>
              </div> : null }



            <div className="mb-5">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
              <input type="tel" id="phone" name='phone' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
            {myForm.errors.phone && myForm.touched.phone?<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium">{myForm.errors.phone}</span>
              </div> : null }


        <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Submit'} 
        </button>

        </form>
    </>
  )
}
