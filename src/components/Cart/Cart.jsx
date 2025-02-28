import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import CartItem from '../CartItem/CartItem';
import { Helmet } from 'react-helmet';

export default function Cart() {
    let { cartItemsNo, setCartItemsNo, getCart, removeProduct, updateProductCount, setCartId, cartId, clearCart } = useContext(CartContext);
    let [cartInfo, setCartInfo] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    let [noCartInfo, setNoCartInfo] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        getCartInfo();
    }, []);

    async function getCartInfo() {
        let res = await getCart();
        setCartId(res.data.id);
        setCartInfo(res);
        setCartItemsNo(res.numOfCartItems);
        setIsLoading(false);
    }

    async function removeItem(id) {
        let res = await removeProduct(id);
        setCartInfo(res);
        setCartItemsNo(res.numOfCartItems);
    }

    async function updateProduct(id, count) {
        if (count === 0) return;
        let res = await updateProductCount(id, count);
        setCartInfo(res);
    }

    async function clearAllCart() {
        let res = await clearCart();
        if (res.message === "success") {
            setNoCartInfo("No items to show");
        }
        setCartInfo(res);
    }

    function goToCheckout() {
        navigate(`/checkout/${cartId}`);
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Cart</title>
            </Helmet>

            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <HashLoader color="#10B981" />
                </div>
            ) : (
                <div className="container mx-auto p-4">
                    {noCartInfo ? (
                        <p className="text-center text-gray-500 text-xl">{noCartInfo}</p>
                    ) : (
                        cartInfo?.data?.products.length ? (
                            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                                <h1 className="text-3xl text-green-500 text-center font-bold my-6">Shopping Cart</h1>
                                <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4">
                                    <h2 className="text-gray-700 text-xl">Total Items: {cartInfo.numOfCartItems}</h2>
                                    <h2 className="text-green-700 text-xl">Total: {cartInfo.data.totalCartPrice} EGP</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-gray-700">
                                        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Image</th>
                                                <th className="px-4 py-3">Product</th>
                                                <th className="px-4 py-3">Qty</th>
                                                <th className="px-4 py-3">Price</th>
                                                <th className="px-4 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartInfo.data.products.map((ele) => (
                                                <CartItem key={ele.id} product={ele} updateProduct={updateProduct} removeItem={removeItem} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
                                    <button className="w-full md:w-auto bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300" onClick={goToCheckout}>
                                        Continue To Checkout
                                    </button>
                                    <button className="w-full md:w-auto bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300" onClick={clearAllCart}>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 text-xl">No cart items</p>
                        )
                    )}
                </div>
            )}
        </>
    );
}
