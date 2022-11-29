import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import './OrderPage.css'
import UserContext from '../Context/usercContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faFloppyDisk,faCartFlatbedSuitcase,faTrash} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import load from "../../asset/loading3.svg";

function OrderPage() {
  const context = useContext(UserContext);
  const { product, setOrders, setOrderz, username } = context;
  const [order, setOrder] = useState([])
  const [customerDetail, SetCustomerDetail] = useState({});
  const [payment, setPayment] = useState({});
  const [quantitys, setQuantitys] = useState({});
  const [paymentType, setPaymentType] = useState("");
  const [paymenterror, setPaymentError] = useState("");
  const [button,setButton] = useState(false)



  const formiks = useFormik({
    initialValues: {
      orderDate: new Date().toLocaleDateString("de-DE"),
      customerName: "",
      customerMobile: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.orderDate === 0) {
        errors.orderDate = "Enter your Order Date";
      }
      if (values.customerName.length === 0) {
        errors.customerName = "Enter Customer Name";
      }
      function validateMobile(mobilenumber) {
        var regmm = "^([0|+[0-9]{1,5})?([7-9][0-9]{9})$";
        var regmob = new RegExp(regmm);
        if (values.customerMobile.length === 0) {
          return (errors.customerMobile = "Enter your mobile number");
        }
        if (regmob.test(mobilenumber)) {
          return errors;
        } else {
          return (errors.customerMobile = "Please provide a valid mobile number");
        }
      }
      validateMobile(values.customerMobile);
      return errors;
    },
    onSubmit: async (values) => {
      toast.success("Customer Details Added")
      SetCustomerDetail(values)
    },
  });


  const formik = useFormik({
    initialValues: {
      product_id: "",
      quantity: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.product_id.length === 0) {
        errors.product_id = "Enter your Product";
      }
      if (values.quantity.length === 0) {
        errors.quantity = "Enter your quantity";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setQuantitys({})
      formik.resetForm()
      cart(values)
    },
  });

  const cart = (data) => {
    const { quantity, product_id } = data;
    let same = order.find((item) => {
      return item.id === product_id;
    });
    if (!same) {
      let pName = product.find((item) => item._id === product_id);
      let value = {
        id: pName._id,
        product: pName.product,
        rate: pName.rate,
        quantity,
        total: pName.rate * quantity,
      }
      setOrder([...order, value])
    } else {
      toast.warn("already in cart")
    }

  }

  const handleRemove = (index) => {
    const values = [...order];
    values.splice(index, 1);
    setOrder(values);
  }

  useEffect(() => {
    totalAmount()
  }, [order])

  const totalAmount = async () => {
    const amount = () => {
      let value = order.length > 0 && order.map((item) => item.total).reduce((initialValue, currentValue) => initialValue + currentValue);
      return value;
    }
    const gst = (quantity, percent) => {
      let value = (quantity * percent) / 100;
      return value;
    };
    const discount = (quantity, percent) => {
      let value = (quantity * percent) / 100;
      return value;
    }
    let Amount = await amount();
    let Gst = await gst(Number(Amount), 18);
    let Discount = await discount(Number(Amount), 10);
    let payment = {
      Amount,
      Gst,
      Discount,
      Total: parseInt(Amount + Gst - Discount)
    }
    setPayment(payment);
  }

  const placeOrder = (customer, order, payment, paymenttype) => {
    let orderDetails;
    let x = username ? username : window.localStorage.getItem("name")
    let y = window.localStorage.getItem("userId")
    if (Object.keys(customer).length > 0) {
      if (order.length > 0) {
        if (paymenttype) {
          orderDetails = {
            customer,
            order,
            payment,
            paymenttype,
            billerName: x,
            billerId: y,
          }
          setButton(true)
          setOrders(orderDetails);
          setOrderz(orderDetails);
        } else {
          setPaymentError("Select your Payment Mode")
          toast.warn("Select your Payment Mode");
        }
      } else {
        toast.warn("Select Your Product Details")
      }
    } else {
      toast.warn("Enter Your Customer Details")
    }
  }

  const quantity = (id) => {
    let data = product.find((item) => item._id === id);
    setQuantitys(data);
  }

  return (
    <div className='order-page' >
      <h6>Order Page</h6>
      <div className="content">
        <div className="container">
          <div className=' row  mx-auto w-75'>
            <div className='col-sm-12 col-md-6' >
              <form onSubmit={(values) => { formiks.handleSubmit(values); }}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Order Date</label>
                  <input type="text" className="form-control shadow-none" id="exampleInputEmail1"
                    value={new Date().toLocaleDateString("de-DE")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="orderDate" readOnly />
                  {formiks.touched.orderDate && formiks.errors.orderDate ? (<div className="error"> {formiks.errors.orderDate}</div>) : null}
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Customer Name</label>
                  <input type="text" className="form-control shadow-none" id="exampleInputEmail1" placeholder="Enter Customer Name"
                    value={formiks.values.customerName}
                    onChange={formiks.handleChange}
                    onBlur={formiks.handleBlur}
                    name="customerName" />
                  {formiks.touched.customerName && formiks.errors.customerName ? (<div className="error"> {formiks.errors.customerName}</div>) : null}
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Mobile Number</label>
                  <input type="text" className="form-control shadow-none" id="exampleInputEmail1" placeholder="Enter Customer Mobile Number"
                    value={formiks.values.customerMobile}
                    onChange={formiks.handleChange}
                    onBlur={formiks.handleBlur}
                    name="customerMobile" />
                  {formiks.touched.customerMobile && formiks.errors.customerMobile ? (<div className="error"> {formiks.errors.customerMobile}</div>) : null}
                </div>
                <button type="submit" className="btn btn-success mt-3">  <span className='cz'><FontAwesomeIcon icon={faFloppyDisk} /></span>Save</button>
              </form>
            </div>
            <div className='col-sm-12 col-md-6' >
              <form onSubmit={(values) => { formik.handleSubmit(values); }}>
                <div className="form-group">
                  <label>Product</label>
                  <select className="form-select shadow-none" value={formik.values.product_id}
                    onChange={(e) => { quantity(e.target.value); formik.handleChange(e) }}
                    onBlur={formik.handleBlur}
                    name="product_id">
                    <option selected value="Default">Select a product</option>
                    {
                      product.length > 0 && product.map((item, index) => {
                        return <option key={index} value={item._id} >{item.product}</option>
                      })
                    }
                  </select>
                  {formik.touched.product_id && formik.errors.product_id ? (<div className="error"> {formik.errors.product_id}</div>) : null}
                </div>
                <div className="form-group">
                  <label >Available in Stock</label>
                  <input type="text" className="form-control shadow-none" value={Object.keys(quantitys).length && quantitys ? (quantitys.availableInStock !== 0 ? quantitys.availableInStock : "Out Of Stock") : "Select a Product"} readOnly />
                </div>
                {
                  quantitys.availableInStock !== 0 ? <div className="form-group">
                    <label >Quantity</label>
                    <input type="number" className="form-control shadow-none" placeholder="Enter your quantity" value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="quantity"
                      min={1}
                      max={quantitys.availableInStock} />
                    {formik.touched.quantity && formik.errors.quantity ? (<div className="error"> {formik.errors.quantity}</div>) : null}
                  </div> : null
                }
                <button type="submit" className="btn btn-success mt-3" disabled={quantitys.availableInStock === 0} >  <span className='cz'><FontAwesomeIcon icon={faPlus} /></span>Add</button>
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className=" table_responsive order-table">
          <h4>Make Product List</h4>
          <table className="table table-bordered  text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Rate</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                order.length > 0 && order.map((item, index) => {
                  return <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{item.product}</th>
                    <th>{item.rate}</th>
                    <th>{item.quantity}</th>
                    <th>{item.total}</th>
                    <th><button onClick={() => handleRemove(index)} className="btn btn-danger mt-3">  <span className='cz'><FontAwesomeIcon icon={faTrash} /></span>Delete</button></th>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
        <div className='w-50 mx-auto'>
          <div>
            <div className="form-group">
              <label for="exampleInputEmail1">Sub Total</label>
              <input type="text" className="form-control shadow-none" id="exampleInputEmail1" value={payment ? (payment.Amount === false ? `Rs : ${0}` : `Rs : ${payment.Amount}`) : null} readOnly />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">GST (18%)</label>
              <input type="text" className="form-control shadow-none" id="exampleInputEmail1" value={payment ? `Rs : ${payment.Gst}` : null} readOnly />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Discount (10%)</label>
              <input type="text" className="form-control shadow-none" id="exampleInputEmail1" value={payment ? `Rs : ${payment.Discount}` : null} readOnly />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Total Amount</label>
              <input type="text" className="form-control shadow-none" id="exampleInputEmail1" value={payment ? `Rs : ${payment.Total}` : null} readOnly />
            </div>
          </div>
          <div className="form-group">
            <label>Payment Type</label>
            <select className="form-select shadow-none" onChange={e => setPaymentType(e.target.value)}>
              <option selected value="Default">Select a Payment</option>
              <option value="Offline_payment" >Offline Payment</option>
              <option value="online_payment" >Online Payment</option>
            </select>
            {
              paymenterror ? (<div className="error">{paymenterror}</div>) : null
            }
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
          {
            button ?  <img
            src={load}
            alt="load"
            style={{width :  "2rem"}}
          /> : <button type="button" onClick={() => placeOrder(customerDetail, order, payment, paymentType)} className="btn btn-success">  <span className='cz'><FontAwesomeIcon icon={faCartFlatbedSuitcase} /></span>Place Order</button>
          }
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default OrderPage