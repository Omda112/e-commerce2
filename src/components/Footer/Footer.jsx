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
      isOnlinePayment ? window.location.href = res.session.url : navigate('/allOrder');
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-4">
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

      <footer className="w-full bg-gray-800 text-white mt-8 p-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/products" className="hover:underline">Products</a></li>
              <li><a href="/allOrder" className="hover:underline">Orders</a></li>
              <li><a href="/account" className="hover:underline">My Account</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
            <p>Email: support@ecommerce.com</p>
            <p>Phone: +20 123 456 7890</p>
            <p>Address: Cairo, Egypt</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">Instagram</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-4">
          © {new Date().getFullYear()} E-Commerce. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
