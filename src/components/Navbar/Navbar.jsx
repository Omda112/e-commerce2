import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/assets/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Navbar({ children }) {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserTokenContext);
  const { cartItemsNo, setIconPosition } = useContext(CartContext);
  const { wishListNo } = useContext(WishListContext);
  const elementRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
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
    <nav className='p-4 fixed top-0 right-0 left-0 bg-white shadow-md z-20 h-16'>
      <div className="container mx-auto flex justify-between items-center lg:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa fa-bars"></i>
          </button>
          <img className='w-28' src={logo} alt="Logo" />
        </div>

        <ul className="hidden lg:flex gap-4 text-lg font-medium">
          {token && [
            'home',
            'cart',
            'brands',
            'categories',
            'products'
          ].map((path) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-4 text-xl">
          <li className="hidden sm:flex gap-3">
            <i className='fa-brands fa-facebook socialIcon'></i>
            <i className='fa-brands fa-instagram socialIcon'></i>
            <i className='fa-brands fa-twitter socialIcon'></i>
            <i className='fa-brands fa-youtube socialIcon'></i>
          </li>

          {token ? (
            <>
              <li className='relative'>
                <NavLink to='cart' className='relative'>
                  <i className='fa fa-cart-shopping text-2xl text-green-600'></i>
                  {cartItemsNo > 0 && (
                    <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                      {cartItemsNo}
                    </span>
                  )}
                </NavLink>
              </li>
              <li className='relative'>
                <NavLink to='wishlist' className='relative'>
                  <i className="fa-solid fa-heart text-2xl text-green-500"></i>
                  {wishListNo > 0 && (
                    <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                      {wishListNo}
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <span onClick={Logout} className={styles.signOut}>Sign Out</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='register' className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to='login' className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Sidebar Menu for Mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 lg:hidden z-30 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="text-2xl p-4" onClick={() => setMenuOpen(false)}>
          <i className="fa fa-times"></i>
        </button>
        {token && (
          <ul className='flex flex-col gap-4 text-lg font-medium p-4'>
            {['home', 'cart', 'brands', 'categories', 'products'].map((path) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
} 