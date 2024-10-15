
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { jwtDecode } from 'jwt-decode';
import style from './Login.module.css';

export default function Login() {
  let [apiError,setApiError] = useState(null)
  let [isLoading,setIsLoading] = useState(false)
  let tokenContext = useContext(UserTokenContext)
  let navigate = useNavigate()
  let {setToken,convertToken} = useContext(UserTokenContext)
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])

    function login(initialValues){
      
      setApiError(null)
      setIsLoading(true)
      console.log("batee5")

      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',initialValues)
      .then((res) =>{
      let {data} = res;
      if(data.message == "success"){
        //yro7 3la l login
        localStorage.setItem("token", data.token)
        convertToken()
        tokenContext.setToken(data.token)
        let decoded = jwtDecode(data.token)
        navigate('/home')
      }
     })
     .catch((error)=>{
        setApiError(error.response.data.message)
        setIsLoading(false)
     })
     console.log(data)
    }


    const validationSchema = ()=> {
      return Yup.object({
        email:Yup.string().email("invalid emadil").required('Required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required("Required"),
      })
    }

    let myForm = useFormik({
      initialValues: {
        email:"",
        password:"",
      },
    validationSchema,
    onSubmit : login
})


  return (
    <>
    <div>
      
    </div>
    {apiError && <div className="max-w-lg mx-auto mt-5 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span className="font-medium">{apiError}</span>
    </div>}


        <form onSubmit={myForm.handleSubmit} className=' max-w-lg mx-auto mt-5'>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="email" name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
            {myForm.errors.email && myForm.touched.email?<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span className="font-medium">{myForm.errors.email}</span>
              </div> : null }



            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" id="password" name='password' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
            {myForm.errors.password && myForm.touched.password?<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span className="font-medium">{myForm.errors.password}</span>
              </div> : null }

        <button disabled={isLoading} type="submit" className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Login'} 
        </button>
        <NavLink to={'/Fpassword'}>Forget Password</NavLink>

        </form>
    </>
  )
}
