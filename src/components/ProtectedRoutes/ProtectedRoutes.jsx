import React, { useEffect, useState } from 'react';
import styles from './ProtectedRoutes.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
export default function ProtectedRoutes({children}) {

    let navigate = useNavigate()
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])


    if(localStorage.getItem("token")){
      return children
    }else{
      //navigate
    return <Navigate to={'/login'}/>
    }
  
}
