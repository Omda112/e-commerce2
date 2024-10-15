
import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Await, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
import { Helmet } from 'react-helmet';
export default function Cart(props) {

  
    let {cartItemsNo,setCartItemsNo,getCart,removeProduct,updateProductCount,setCartId,cartId,clearCart} = useContext(CartContext)
    let [count,setCount] = useState(0)
    let [cartInfo,setCartInfo] = useState(null)
    let [isLoading,setIsLoading] = useState(true)
    let [noCartInfo,setNoCartInfo] = useState("")
    let navigate = useNavigate()

    useEffect(()=> {
      getCartInfo()
    },[])

    async function getCartInfo(){
      let res = await getCart()
      console.log(res);
      
      setCartId(res.data.id)
      setCartInfo(res)
      setCartItemsNo(res.numOfCartItems)
      setIsLoading(false)
    }

    async function removeItem(id){
      let res = await removeProduct(id)
      setCartInfo(res)
      setCartItemsNo(res.numOfCartItems)
      
    }

    async function updateProduct(id,count) {
      if(count == 0) return
    let res =  await updateProductCount(id,count)
    console.log(res);
    setCartInfo(res)
    }

    async function clearAllCart() {
      // if(count == 0) return
    let res =  await clearCart()
    console.log(res);
    if(res.message == "success"){
      setNoCartInfo("no items to show")
    }
    
    setCartInfo(res)
    }

    function goToCheckout(){
      navigate(`/checkout/${cartId}`)
    }

    return (
      <>
      
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Cart</title>
            </Helmet>
        </div>

        {isLoading ? (
          <div className="flex justify-center w-full">
            <HashLoader />
          </div>
        ) : (
          <>
            {noCartInfo ? (
              noCartInfo
            ) : (
              <>
                {cartInfo?.data?.products.length ? (
                  <>
                    <div className="w-[70%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                      <h1 className="text-4xl text-green-500 text-center font-bold mt-5">Shipping Cart</h1>
                      <div className="flex justify-between px-7 my-6">
                        <h2 className="text-gray-600 text-2xl">
                          Total Cart Items: {cartInfo ? cartInfo.numOfCartItems : 0}
                        </h2>
                        <h2 className="text-green-600 text-2xl">
                          Total Price: {cartInfo?.data?.totalCartPrice}
                        </h2>
                      </div>
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-16 py-3">
                              <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartInfo.data.products.map((ele) => (
                            <CartItem
                              key={ele.id} // Ensure to include a unique key
                              product={ele}
                              updateProduct={updateProduct}
                              removeItem={removeItem}
                            />
                          ))}
                        </tbody>
                      </table>
                      <button className="btn" onClick={goToCheckout}>
                        Continue To Checkout
                      </button>
                      <button onClick={clearAllCart} className="btn bg-red-500">
                        Clear Cart
                      </button>
                    </div>
                  </>
                ) : (
                  "No cart items"
                )}
              </>
            )}
          </>
        )}
      </>
    );
}