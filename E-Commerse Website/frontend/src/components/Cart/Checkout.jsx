import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
const cart = {
  product: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 75,
      image: "https://picsum.photos/150?random=2"
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId]=useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  });
  const handelCreateChekout=(e)=>{
    e.preventDefault();
    // setCheckoutId(123);
  }

  const handlePaymentSuccess=(details)=>{
    console.log("Payment Successfull",details);
    navigate('/order-confirmation',)
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl max-auto py-10 px-6 tracking-tight'>
      {/* Left Section */}
      <div className='bg-white rounded-lg p-6'>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handelCreateChekout}>
          <h3 className='text-lg mb-4 '>contact Details</h3>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input type="email"
              value='user@example.com'
              className='w-full p-2 border rounded'
              disabled
            />
          </div>
          <h3 className='text-lg mb-4'>Delivery</h3>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-gray-700">Fast Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value
                  })
                }
                className='w-full p-2 border rounded'
                required />
            </div>

            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value
                  })
                }
                className='w-full p-2 border rounded'
                required />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 '>Address </label>
            <input
              type='text'
              value={setShippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress, address: e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div className=''>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value
                  })
                }
                className='w-full p-2 border rounded'
                required />
            </div>

            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value
                  })
                }
                className='w-full p-2 border rounded'
                required />
            </div>

          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 '>Country </label>
            <input
              type='text'
              value={setShippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress, country: e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 '>Phone</label>
            <input 
              type='tel'
              value={setShippingAddress.phone}
              onChange={(e)=>
                setShippingAddress({
                  ...shippingAddress,phone:e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mt-6'>
            {!checkoutId ?(
              <button type='submit' className="w-full bg-black text-white py-3 rounded">Continue to payment</button>
            ):(
              <div>
                <h3 className='text-lg mb-4 '>Pay with Paypal</h3>
                <PayPalButton 
                  amount={100} 
                  onSuccess={handlePaymentSuccess} 
                  onError={(err)=>alert("Payment failed. Try again ")}/>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
// 4:55:41 // timestamp