import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { WishListContext } from '../../Context/WishListContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { HashLoader } from 'react-spinners';
import WishItem from '../WishItem/WishItem.jsx';
export default function WishList() {

  let {addProductToWishList,clearWishList,wishListNo,setWishListNo,getWishList,removeProduct,wishListId,setWishListId} = useContext(WishListContext)
  let [count,setCount] = useState(0)
  let [wishLisInfo,setWishLisInfo] = useState(null)
  let [isLoading,setIsLoading] = useState(false)
  let [noWishLisInfo,setNoWishLisInfo] = useState("")
  let navigate = useNavigate()

  useState(()=> {
    getWishListInfo()
  },[])

  async function getWishListInfo(){
    let res = await getWishList()
    console.log(res);
    setWishListId(res.data._id)
    setWishLisInfo(res)
    setWishListNo(res.count)
    setIsLoading(false)
  }

  async function removeItem(id){
    let res = await removeProduct(id)
    console.log(res);
    setWishLisInfo(res)
    setWishListNo(res.count)
    getWishListInfo();
  }


  async function clearList() {
    // if(count == 0) return
  let res =  await clearWishList()
  console.log(res);
  if(res.message == "success"){
    setNoCartInfo("no items to show")
  }
  
  setCartInfo(res)
  }
  // async function updateProduct(id,count) {
  //   if(count == 0) return
  // let res =  await updateProductCount(id,count)
  // console.log(res);
  // setCartInfo(res)
  // }

  // async function clearAllCart() {
  //   // if(count == 0) return
  // let res =  await clearCart()
  // console.log(res);
  // if(res.message == "success"){
  //   setNoCartInfo("no items to show")
  // }
  
  // setCartInfo(res)
  // }

  // function goToCheckout(){
  //   navigate(`/checkout/${cartId}`)
  // }

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
          {noWishLisInfo ? (
            noWishLisInfo
          ) : (
            <>
              {wishLisInfo?.data?.length ? (
                <>
                  <div className="w-[70%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <h1 className="text-4xl text-green-500 text-center font-bold mt-5">Wish List</h1>
                    <div className="flex justify-between px-7 my-6">
                      <h2 className="text-gray-600 text-2xl">
                        Total Cart Items: {wishLisInfo ? wishLisInfo.count : 0}
                      </h2>
                      {/* <h2 className="text-green-600 text-2xl">
                        Total Price: {wishLisInfo?.data?.totalCartPrice}
                      </h2> */}
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                          </th>
                          <th scope="col" className="px-6 py-3">Product</th>
                          <th scope="col" className="px-6 py-3">Price</th>
                          <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishLisInfo?.data.map((ele) => (
                          <WishItem
                            key={ele.id}
                            product={ele}
                            // updateProduct={updateProduct}
                            removeItem={removeItem}
                          />
                        ))}
                      </tbody>
                    </table>
                    {/* <button className="btn" onClick={goToCheckout}>
                      Continue To Checkout
                    </button> */}
                    {/* <button onClick={clearWishList} className="btn bg-red-500">
                      Clear WishList
                    </button> */}
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
