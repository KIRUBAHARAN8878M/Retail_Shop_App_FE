import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { env } from "../../config";


let UserContext = createContext();

export const UserProvider = ({ children }) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState([])
  const [orders, setOrders] = useState({});
  let [data, setData] = useState({});




  useEffect(() => {
    productData()
  }, [])




  useEffect(() => {
    productData()
  }, [orders])



  const productData = async () => {
    try {
      let value;
      value = await axios.get(`${env.api}/inventory/products`);
      setProduct(value.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setOrderz = async (data) => {
    const { paymenttype } = data;
    if (paymenttype === "online_payment") {
      navigate("/user-portal/razorpay")
    } else {
      let mongo_id = await axios.post(`${env.api}/orders/order`, data);
      setOrders({});
      navigate(`/user-portal/order-success/${mongo_id.data.id}`)
    }
  }


  const getInvoice = async (id) => {
    try {
      let value = await axios.get(`${env.api}/orders/invoice/${id}`);
      setData(value.data);
      navigate(`/user-portal/order-success/invoice`)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <UserContext.Provider value={{ username, setUsername, product, orders, setOrders, setOrderz, data, getInvoice,productData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;