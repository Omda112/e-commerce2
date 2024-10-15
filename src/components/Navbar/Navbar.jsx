import React, { useContext, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/assets/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Navbar({children}) {
    let navigate = useNavigate();
    let { token, setToken } = useContext(UserTokenContext);
    let { cartItemsNo, setIconPosition } = useContext(CartContext);
    let { wishListNo } = useContext(WishListContext);
    const elementRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                console.log(rect);
                setIconPosition({ top: rect.top, left: rect.left });
            }
        }, 100);
    
        return () => clearTimeout(timeoutId);
    }, [setIconPosition]);

    function Logout() {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            <nav className='p-2 lg:fixed top-0 right-0 left-0 bg-slate-300 z-20'>
                <div className="container mx-auto flex flex-col justify-between items-center lg:flex-row">
                    <div className="left-side flex items-center text-center flex-col lg:flex-row">
                        <img className='mr-7 mb-4 lg:mb-0' width={120} src={logo} alt="" />
                        {token && (
                            <ul className='flex flex-col lg:flex-row gap-2 text-xl'>
                                <li><NavLink to={'home'}>Home</NavLink></li>
                                <li><NavLink to={'cart'}>Cart</NavLink></li>
                                <li><NavLink to={'brands'}>Brands</NavLink></li>
                                <li><NavLink to={'categories'}>Categories</NavLink></li>
                                <li><NavLink to={'products'}>Products</NavLink></li>
                            </ul>
                        )}
                    </div>

                    <ul className="right-side flex items-center text-xl flex-col gap-2 lg:flex-row">
                        <li>
                            <i className='fa-brands mx-1 fa-facebook'></i>
                            <i className='fa-brands mx-1 fa-instagram'></i>
                            <i className='fa-brands mx-1 fa-twitter'></i>
                            <i className='fa-brands mx-1 fa-youtube'></i>
                        </li>
                        {token ? (
                            <>
                                <li className='relative p-3' >
                                    <div className='absolute -top-2 bg-green-500 rounded-lg -right-0'>{cartItemsNo}</div>
                                    <NavLink to={'cart'}>
                                        <i ref={elementRef} className='fa fa-cart-shopping'>{children}</i>
                                    </NavLink>
                                </li>
                                <li className='relative p-2'>
                                    <div className='absolute -top-2 bg-green-500 rounded-lg -right-0'>{wishListNo}</div>
                                    <NavLink to={'wishlist'}>
                                        <i className="fa-solid fa-heart"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={Logout}>Sign Out</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to={'register'}>Register</NavLink></li>
                                <li><NavLink to={'login'}>Login</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}
