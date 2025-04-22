import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function Checkout() {
  const { cartId } = useParams();
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const { cashOnDelievery } = useContext(CartContext);
  const navigate = useNavigate();

  let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
  if (isOnlinePayment) {
    url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
  }

  async function pay() {
    const res = await cashOnDelievery(url, myForm.values);
    if (res.status === "success") {
      isOnlinePayment ? window.location.href = res.session.url : navigate('/orders');
    } else {
      console.log("Error:", res);
    }
  }

  const myForm = useFormik({
    initialValues: {
      city: "Cairo",
      details: "Details",
      phone: "01010800921"
    },
    onSubmit: pay
  });

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Checkout Now</h1>
        <form onSubmit={myForm.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Your Details</label>
            <input 
              type="text" 
              id="details" 
              name="details" 
              onChange={myForm.handleChange} 
              value={myForm.values.details} 
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter your details" 
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Your Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              onChange={myForm.handleChange} 
              value={myForm.values.phone} 
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter your phone number" 
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Your City</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              onChange={myForm.handleChange} 
              value={myForm.values.city} 
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter your city" 
            />
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="forOnline" 
              onChange={() => setIsOnlinePayment(!isOnlinePayment)} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            />
            <label htmlFor="forOnline" className="text-sm text-gray-700">Pay Online</label>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            {isOnlinePayment ? 'Pay Online' : 'Cash on Delivery'}
          </button>
        </form>
      </div>
    </div>
  );
}