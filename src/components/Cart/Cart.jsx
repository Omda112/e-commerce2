import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import CartItem from '../CartItem/CartItem';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let {
    cartItemsNo,
    setCartItemsNo,
    getCart,
    removeProduct,
    updateProductCount,
    setCartId,
    cartId,
    clearCart,
  } = useContext(CartContext);
  let [cartInfo, setCartInfo] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [noCartInfo, setNoCartInfo] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    getCartInfo();
  }, []);

  async function getCartInfo() {
    let res = await getCart();
    setCartId(res.data._id);

    if (res.data.products && res.data.products.length === 0) {
      setNoCartInfo('No items to show');
    }

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
    if (res.message === 'success') {
      setNoCartInfo('No items to show');
    }
    setCartItemsNo(res.numOfCartItems);
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
        <div className="flex justify-center items-center h-40">
          <HashLoader color="#16a34a" size={60} />
        </div>
      ) : (
        <div className="w-[90%] md:w-[70%] mx-auto my-10 relative overflow-x-auto shadow-lg rounded-xl border border-green-300 bg-white">
          {noCartInfo ? (
            <p className="text-center text-gray-500 text-xl my-10">{noCartInfo}</p>
          ) : (
            <>
              <h1 className="text-4xl text-green-600 text-center font-bold mt-8 mb-4">
                Shopping Cart
              </h1>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-5 md:px-10 py-4 rounded-md shadow-sm">
                <h2 className="text-gray-700 text-2xl font-semibold">
                  Total Items: <span className="text-green-500">{cartItemsNo}</span>
                </h2>
                <h2 className="text-gray-700 text-2xl font-semibold">
                  Total: <span className="text-green-500">{cartInfo.data.totalCartPrice} EGP</span>
                </h2>
              </div>

              <table className="w-full text-sm text-left text-gray-700 mt-4 border-t border-green-200">
                <thead className="text-xs uppercase bg-green-50 text-green-800">
                  <tr>
                    <th className="px-4 py-3 text-center">Image</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartInfo.data.products.map((ele) => (
                    <CartItem key={ele.id} product={ele} updateProduct={updateProduct} removeItem={removeItem} />
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
                <button
                  className="w-full md:w-auto bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                  onClick={goToCheckout}
                >
                  Continue To Checkout
                </button>
                <button
                  className="w-full md:w-auto bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={clearAllCart}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
