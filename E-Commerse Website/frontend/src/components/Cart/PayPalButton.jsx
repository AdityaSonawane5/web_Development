
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider option={{
      "client-id":
      import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    }}>

      <PayPalButtons style={{ "layout": "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }]
          })
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
      />
    </PayPalScriptProvider>


  )
}

export default PayPalButton
// 5:03:35 timestamp
