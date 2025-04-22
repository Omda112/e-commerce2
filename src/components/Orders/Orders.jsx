import React, { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../../Context/UserTokenContext";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaShoppingBag } from "react-icons/fa";
import { HashLoader } from "react-spinners";

export default function Orders() {
  let { userId } = useContext(UserTokenContext);
  let [orders, setOrders] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  function getAllOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        console.log("Orders fetched:", res.data);
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error.response?.data || error.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (userId) {
      console.log("Fetching orders for User ID:", userId);
      getAllOrders();
    }
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
        <FaShoppingBag className="mr-2 text-green-500" /> Your Orders
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <HashLoader color="#16a34a" size={60} />
        </div>
      ) : orders.length > 0 ? (
        <div className="w-[90%] md:w-[100%] mx-auto my-10 relative overflow-x-auto">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 my-10">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{order.paymentMethodType}</h3>
                {order.isPaid ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <FaCheckCircle className="mr-1 text-xl" /> Paid
                  </span>
                ) : (
                  <span className="flex items-center text-red-500 font-medium">
                    <FaTimesCircle className="mr-1 text-xl" /> Unpaid
                  </span>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center">
                  <thead className="text-xs uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((ele) => (
                      <tr key={ele._id} className="bg-white border-b hover:bg-gray-50">
                        <td className="p-4">
                          <img
                            src={ele.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full object-contain"
                            alt={ele.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {ele.product.title}
                        </td>
                        <td className="px-6 py-4 text-center">{ele.count}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          ${ele.price} / ${ele.price * ele.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">No orders found.</p>
      )}
    </div>
  );
}
