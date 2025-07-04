import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import {useNavigate} from 'react-router-dom';

const CardDrawer = ({drawerOpen,toggleCardDrawer}) => {
    
  const navigate=useNavigate();
  const handelCheckout=()=>{
    toggleCardDrawer()
    navigate('checkout')
  }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0 ": "translate-x-full"}`}>
      {/* close button */}
      <div className='felx justify-end p-4'>
        <button onClick={toggleCardDrawer}>
            <IoMdClose className='h-6 w-6  text-gray-600'/>
        </button>
      </div>
      {/* Card contents with scrollable area */}
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>your Card</h2>
          {/* conponent for card  contents */}
          <CartContents/>
      </div>
      {/* checkout button fixed at the bottom */}
      <div className='p-4 bg-white sticky bottom-0'>
        <button onClick={handelCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>check</button>
        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
          Shipping,taxes, and discounts code calulated at checkout
        </p>
      </div>
    </div>
  )
}

export default CardDrawer
