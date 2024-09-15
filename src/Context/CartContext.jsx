import axios from "axios";//
import { createContext, useState } from "react";//

const headers = {//
    token : window.localStorage.getItem("token")//
}//

export let CartContext = createContext()   //


function addProductToCart(productId){
    return axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {productId},
    {
        headers
    }
    ).then(res => res.data)
    .catch(err => err.response.data)
}

function getCart(){
    return axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
    {
        headers
    }
    ).then(res => res.data)
    .catch(error => error.response.data)
}

function removeProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers}).then(res => res.data)
    .catch(error => error.response.data)
}

async function updateProductCount(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers}).then(res => res.data)
    .catch(error => error.response.data)
}

async function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then(res => res.data)
    .catch(error => error.response.data)
}

function cashOnDelievery(url,shippingAddress){
    return axios.post(url,{shippingAddress},{headers}).then(res => res.data)
    .catch(error => error.response.data)
}

function getOrders(userId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then(res => res.data)
    .catch(error => error.response.data)
}

export default function CartContextProvider({children}){

    let [cartId,setCartId] = useState(null)
    let [cartItemsNo,setCartItemsNo] = useState(null)
    return <CartContext.Provider value={{clearCart,cartItemsNo,setCartItemsNo,getOrders,addProductToCart,getCart,removeProduct,updateProductCount,cashOnDelievery,cartId,setCartId}}>
        {children}
    </CartContext.Provider>
}