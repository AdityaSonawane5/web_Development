import React from 'react'
import {PayPalButton,paypalScriptProvider} from "@paypal/react-paypal-js";
const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
    <paypalScriptProvider option={{"client-id":
      "Acf2U2Ta0Ud1pjZRszprLR6XvdPEXPSFH3sxpREHkWClmORn6PTm65u5PQ96Og0gUZ-nd0VyyzkfvQ70"}}>

        <PayPalButton style={{"layout":"vertical"}}
          createOrder={(data,actions)=>{
            return actions.order.create({
              purchase_units:[{amount:{value:amount}}]
            })
          }}
          onApprove={async(data,actions)=>{
            return actions.order.capture().then(onSuccess)
          }}
          onError={onError}
        />
    </paypalScriptProvider>


  )
}

export default PayPalButton
// 5:03:35 timestamp
