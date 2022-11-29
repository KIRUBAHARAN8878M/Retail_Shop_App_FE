
import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { env } from '../../config';


import UserContext from '../Context/usercContext';



function Razorpay() {
  let navigate = useNavigate();
  const context = useContext(UserContext);
  const { orders, setOrders } = context;
  const { order, payment, customer, paymenttype, billerId, billerName } = orders
  const { Total } = payment
  const send = async (id) => {
    let data = {
      payment_id: id,
      order,
      customer,
      payment,
      paymenttype,
      billerName,
      billerId
    }
    let mongo_id = await axios.post(`${env.api}/orders/order`, data);
    setOrders({})
    navigate(`/user-portal/order-success/${mongo_id.data.id}`)
  }
  const handleSubmit = () => {
    var options = {
      key: "rzp_test_cSjwpLQPPi0Uxz",
      key_secret: "0wVxMg5kGzT0eJyDdjR9FLdi",
      amount: parseInt(Total) * 100,
      currency: "INR",
      name: "Retail Shop App",
      description: "for testing purpose",
      handler: function (response) {

        send(response.razorpay_payment_id)
      },
      prefill: {
        name: "Kirubaharan m",
        email: "kirubaharan8878m@gmail.com",
        contact: "8489671064"
      },
      notes: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();

  }
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }}>
      <div>
        <h1>Note : -</h1>
        <div style={{
          marginTop: "10px",
          border: "2px solid red",
          padding: "10px"
        }}>
          <h2>Card Number : 4111 1111 1111 1111</h2>
          <h2>expiry Date : 11/28</h2>
          <h2>CVV :  123</h2>
          <h2>OTP Number : 1111</h2>
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-success mt-5 me-5">Conform To Place your Order</button>
      </div>
    </div>
  )
}

export default Razorpay