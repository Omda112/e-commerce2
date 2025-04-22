import axios from "axios";
import { createContext, useState } from "react";

const headers = {
    token: window.localStorage.getItem("token")
};

export let CartContext = createContext();  

// Add product to the cart
function addProductToCart(productId) {
    return axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers }
    )
    .then(res => res.data)
    .catch(err => err.response.data);
}

// Get cart info
function getCart() {
    return axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers }
    )
    .then(res => res.data)
    .catch(error => error.response.data);
}

// Remove a product from the cart
function removeProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
        .then(res => res.data)
        .catch(error => error.response.data);
}

// Update the quantity of a product in the cart
async function updateProductCount(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers })
        .then(res => res.data)
        .catch(error => error.response.data);
}

// Clear all items in the cart
async function clearCart() {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
        .then(res => res.data)
        .catch(error => error.response.data);
}

// Cash on delivery API call
function cashOnDelievery(url, shippingAddress) {
    return axios.post(url, { shippingAddress }, { headers })
        .then(res => res.data)
        .catch(error => error.response.data);
}

// Get user orders
function getOrders(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then(res => res.data)
        .catch(error => error.response.data);
}

// Context provider component
export default function CartContextProvider({ children }) {
    const [cartId, setCartId] = useState(null);
    const [cartItemsNo, setCartItemsNo] = useState(null);
    const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });

    return (
        <CartContext.Provider value={{
            iconPosition,
            setIconPosition,
            clearCart,
            cartItemsNo,
            setCartItemsNo,
            getOrders,
            addProductToCart,
            getCart,
            removeProduct,
            updateProductCount,
            cashOnDelievery,
            cartId,
            setCartId
        }}>
            {children}
        </CartContext.Provider>
    );
}
