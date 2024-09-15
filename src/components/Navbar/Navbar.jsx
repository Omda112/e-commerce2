
import React, { useContext, useEffect, useState } from 'react';

import styles from './Navbar.module.css';
import logo from '../../assets/assets/freshcart-logo.svg'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Navbar() {
  let navigate = useNavigate()
  let x = useContext(CounterContext)
  let {token,setToken} = useContext(UserTokenContext)
  let {cartItemsNo} = useContext(CartContext)
  let {wishListNo} = useContext(WishListContext)
  console.log(token,"hello from navbar component");
  
  function Logout(){
    setToken(null)
    localStorage.removeItem('token')
    navigate('/login')
  }
    let [count,setCount] = useState(0)
    useEffect(()=> {},[])
  return (
    <nav className=' p-2 lg:fixed top-0 right-0 left-0 bg-slate-300 z-20'>
      <div className="container mx-auto flex flex-col justify-between items-center lg:flex-row ">
        <div className="left-side flex items-center text-center flex-col lg:flex-row ">
          <img className=' mr-7 mb-4 lg:mb-0' width={120} src={logo} alt="" />

          {token? <>
          {console.log(token)}
            <ul className='flex flex-col lg:flex-row gap-2 text-xl'>
            <li>
              <NavLink to={'home'}>Home</NavLink>
            </li>
            <li>
                <NavLink to={'cart'}>Cart</NavLink>
            </li>
            <li>
                <NavLink to={'brands'}>Brands</NavLink>
            </li>
            <li>
                <NavLink to={'categories'}>Categories</NavLink>
            </li>
            <li>
                <NavLink to={'products'}>Products</NavLink>
            </li>
          </ul>
          </> 
           : null}
         
        </div>


          <ul className="right-side flex items-center text-xl flex-col gap-2 lg:flex-row">
            <li>
              <i className='fa-brands mx-1 fa-facebook'></i>
              <i className='fa-brands mx-1 fa-instagram'></i>
              <i className='fa-brands mx-1 fa-twitter'></i>
              <i className='fa-brands mx-1 fa-youtube'></i>
            </li>
           

          {token?
          <>
          <li className='relative p-2'>
            <div className='absolute -top-2 bg-green-500 rounded-lg -right-0'>{cartItemsNo}</div> 
            <NavLink to={'cart'}><i className='fa fa-cart-shopping'></i></NavLink>
          </li>
          <li className='relative p-2'>
          <div className='absolute -top-2 bg-green-500 rounded-lg -right-0'>{wishListNo}</div> 
           <NavLink to={'wishlist'}><i class="fa-solid fa-heart"></i></NavLink>
          </li>
            <li>
              <button to={'login'} onClick={Logout}>SignOut</button>
            </li>
          </>
           : <>
            <li>
              <NavLink to={'register'}>Register</NavLink>
            </li>
            <li>
              <NavLink to={'login'}>Login</NavLink>
            </li>
            </> }

            
           
          </ul>
      </div>
    </nav>
  )
}
