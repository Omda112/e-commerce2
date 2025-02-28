import React, { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';
import { HashLoader } from 'react-spinners';
import WishItem from '../WishItem/WishItem.jsx';

export default function WishList() {
  const {
    clearWishList,
    wishListNo,
    setWishListNo,
    getWishList,
    removeProduct,
    setWishListId
  } = useContext(WishListContext);

  const [wishListInfo, setWishListInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [noWishListMessage, setNoWishListMessage] = useState("");

  useEffect(() => {
    getWishListInfo();
  }, []);

  async function getWishListInfo() {
    setIsLoading(true);
    const res = await getWishList();
    console.log(res);

    if (res.data && res.data.length > 0) {
      setWishListId(res.data._id);
      setWishListInfo(res);
      setWishListNo(res.data.length);
    } else {
      setNoWishListMessage("No items to show in your wishlist.");
    }
    setIsLoading(false);
  }

  async function removeItem(id) {
    await removeProduct(id);
    getWishListInfo();
  }

  async function clearList() {
    const res = await clearWishList();
    console.log(res);

    if (res.message === "success") {
      setNoWishListMessage("Your wishlist is now empty.");
      setWishListInfo(null);
      setWishListNo(0);
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Wishlist</title>
      </Helmet>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <HashLoader color="#16a34a" size={60} />
        </div>
      ) : (
        <div className="w-[90%] md:w-[70%] mx-auto my-10 relative overflow-x-auto shadow-lg rounded-xl border border-green-300 bg-white">
          <h1 className="text-4xl text-green-600 text-center font-extrabold mt-8 mb-4 underline decoration-green-400">My Wishlist</h1>

          {noWishListMessage ? (
            <p className="text-center text-gray-500 text-xl my-10">{noWishListMessage}</p>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-5 md:px-10 py-4 bg-green-50 rounded-md shadow-sm">
                <h2 className="text-gray-700 text-2xl font-semibold">
                  Total Items: <span className="text-green-500">{wishListNo}</span>
                </h2>
                <button
                  onClick={clearList}
                  className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out shadow-md"
                >
                  Clear Wishlist
                </button>
              </div>

              <table className="w-full text-sm text-left text-gray-700 mt-4 border-t border-green-200">
                <thead className="text-xs uppercase bg-green-200 text-green-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">Image</th>
                    <th scope="col" className="px-4 py-3">Product</th>
                    <th scope="col" className="px-4 py-3">Price</th>
                    <th scope="col" className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishListInfo?.data.map((item) => (
                    <WishItem
                      key={item.id}
                      product={item}
                      removeItem={removeItem}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
}
