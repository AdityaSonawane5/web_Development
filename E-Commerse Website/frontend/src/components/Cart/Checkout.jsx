import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const cart={
  product:[
    {
      name:"Stylish Jacket",
      size:"M",
      color:"Black",
      price:120,
      image:"https://picsum.photos/150?random=1",
    },
    {
      name:"Casual Sneakers",
      size:"42",
      color:"White",
      price:75,
      image:"https://picsum.photos/150?random=2"
    },
  ],
  totalPrice:195,
};

const Checkout = () => {
  const navigate=useNavigate();
  const [shippingAddress,setShippingAddress]=useState({
    firstName:"",
    lastName:"",
    address:"",
    city:"",
    postalCode:"",
    country:"",
    phone:""
  })
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl max-auto py-10 px-6 tracking-tight'>
      {/* Left Section */}
      
    </div>
  )
}

export default Checkout
// 4:44:38 // timestamp