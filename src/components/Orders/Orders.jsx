import React, { useContext, useEffect, useState } from 'react';
import styles from './Orders.module.css';
import { CartContext } from '../../Context/CartContext';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { Accordion } from "flowbite-react";
import CartItem from '../CartItem/CartItem';


export default function Orders() {

  let {getOrders}= useContext(CartContext)
  let {userId} = useContext(UserTokenContext)
    let [orders,setOrders] = useState([])

    console.log(userId);
    
    useEffect(() => {
      if (userId) {
        console.log("User ID:", userId); // Debugging output
        getAllOrders();
      }
    }, [userId]);
    
  async function getAllOrders() {
    console.log("allorders",userId);
    
    let x = await getOrders(userId)
    console.log("x======",x);
    setOrders(x)
    
  }

  return (
    <>
    <Accordion>
      {orders.map(order=>
        <Accordion.Panel>
        <Accordion.Title className={order.isPaid ? 'bg-green-600' : 'bg-red-500'}>{order.paymentMethodType}</Accordion.Title>
        <Accordion.Content>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        {/* <th scope="col" className="px-6 py-3">
          Action
        </th> */}
      </tr>
    </thead>
    <tbody>
      {order.cartItems.map(ele => <CartItem product={ele} showAction={false} />)}
    </tbody>
  </table>
        </Accordion.Content>
      </Accordion.Panel>
      )}
      
    </Accordion>
    </>
  )
}
