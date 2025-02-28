import axios from "axios";
import { createContext, useState, useEffect } from "react";

const headers = {
    token: window.localStorage.getItem("token")
};

export let WishListContext = createContext();

function addProductToWishList(productId) {
    return axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers }
    )
    .then(res => {
        // ✅ تحديث عدد العناصر بعد الإضافة
        getWishList().then(data => {
            setWishListNo(data.count || data.data.length); // تحديث عدد العناصر
        });
        return res.data;
    })
    .catch(err => err.response.data);
}

function getWishList() {
    return axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { headers }
    )
    .then(res => res.data)
    .catch(error => error.response.data);
}

function removeProduct(id) {
    return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishList/${id}`,
        { headers }
    )
    .then(res => res.data)
    .catch(error => error.response.data);
}

async function clearWishList() {
    return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
    )
    .then(res => res.data)
    .catch(error => error.response.data);
}

export default function WishListContextProvider({ children }) {
    let [wishListId, setWishListId] = useState(null);
    let [wishListNo, setWishListNo] = useState(0); // عدد العناصر

    // ✅ تحميل عدد العناصر عند بداية تحميل الموقع
    useEffect(() => {
        if (headers.token) {
            getWishList().then(data => {
                setWishListNo(data.count || data.data.length); // تحديث العدد
            });
        }
    }, []); // يتم التنفيذ مرة واحدة فقط عند تحميل الصفحة

    return (
        <WishListContext.Provider value={{
            addProductToWishList,
            clearWishList,
            wishListNo,
            setWishListNo,
            getWishList,
            removeProduct,
            wishListId,
            setWishListId
        }}>
            {children}
        </WishListContext.Provider>
    );
}
