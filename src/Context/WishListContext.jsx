import axios from "axios";
import { createContext, useState } from "react";

const headers = {
    token : window.localStorage.getItem("token")
}

export let WishListContext = createContext() 


function addProductToWishList(productId){
    console.log("hi from wishlist");
    
    return axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        {productId},
    {
        headers
    }
    ).then(res => res.data)
    .catch(err => err.response.data)
}

function getWishList(){
    return axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
    {
        headers
    }
    ).then(res => res.data)
    .catch(error => error.response.data)
}

function removeProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishList/${id}`,{headers}).then(res => res.data)
    .catch(error => error.response.data)
}

// async function updateProductCount(id,count){
//     return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers}).then(res => res.data)
//     .catch(error => error.response.data)
// }

async function clearWishList(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).then(res => res.data)
    .catch(error => error.response.data)
}

// function cashOnDelievery(url,shippingAddress){
//     return axios.post(url,{shippingAddress},{headers}).then(res => res.data)
//     .catch(error => error.response.data)
// }

// function getOrders(userId){
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then(res => res.data)
//     .catch(error => error.response.data)
// }

export default function WishListContextProvider({children}){

    let [wishListId,setWishListId] = useState(null)
    let [wishListNo,setWishListNo] = useState(null)
    return <WishListContext.Provider value={{addProductToWishList,clearWishList,wishListNo,setWishListNo,getWishList,removeProduct,wishListId,setWishListId}}>
        {children}
    </WishListContext.Provider>
}