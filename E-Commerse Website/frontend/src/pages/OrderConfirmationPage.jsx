import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearCart} from "../redux/slices/CartSlice"
const OrderConfirmationPage = () => {
    const dispatch= useDispatch();
    const navigate=useNavigate();
    const {checkout} = useSelector((state)=>state.checkout);

    // clear the cart when the order is confirmed 
    useEffect(()=>{
        if(checkout && checkout._id){
            dispatch((clearCart()));
            localStorage.removeItem("cart")
        }else{
            navigate("/my-orders");
        }
    },[checkout,dispatch,navigate]);

    const calculatestEstimatedDelivery=(createdAt)=>{
        const orderDate=new Date(createdAt);
        orderDate.setDate(orderDate.getDate()+10); //Add 10 days to the oreder date
        return orderDate.toLocaleDateString();
    }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8  ">
        Thank You for Your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
            <div className="flex justify-between mb-20">
                {/* Order Id and Date */}
                <div>
                    <h2 className="text-xl font-semibold ">
                        Order ID :{checkout._id}
                    </h2>
                    <p className="text-gray-500">
                        Order Date: {new Date(checkout.createAt).toLocaleDateString()}
                    </p>
                </div>
                {/* Estimated  Delivery */}
                <div>
                    <p className="text-emerald-700 text-sm ">
                        Estimated Delivery:{calculatestEstimatedDelivery(checkout.createAt)}
                    </p>
                </div>
            </div>
            {/* Order Items */}
            <div className="mb-20">
                {
                    checkout.checkoutIteams.map((item)=>(
                        <div key={item.productId} className="flex items-center mb-4 ">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                            <div>
                                <h4 className="text font-semibold">{item.name}</h4>
                                <p className="text-sm text-gray-500">
                                    {item.color} | {item.size}
                                </p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-md">${item.price}</p>
                                <p className="text-sm text-gray-500">Qty:{item.quentity}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* payment and Delivery Info */}
            <div className="grid grid-cols-2 gap-8">{/* Payment Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2 ">Payment</h4>
                    <p className="text-gray-600">PayPal</p>
                </div>
                {/* Delivery Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2 ">Delivery</h4>
                    <p className="text-gray-600">{checkout.shppingAddress.address}</p>
                    <p className="text-gray-600">{checkout.shppingAddress.city},{" "}
                        {checkout.shppingAddress.country}
                    </p>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

//15:22:42 timestmp
export default OrderConfirmationPage
