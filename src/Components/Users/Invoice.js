
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/usercContext';

import './Invoice.css';

function Invoice() {
    const context = useContext(UserContext);
    let navigate = useNavigate();
    const { data } = context;
    const { order_id, customer, order, payment, payment_id, paymenttype } = data;
    const { customerMobile, customerName, orderDate } = customer
    return (
        <>
            <div className="container ">
                <div className="page-header">
                    <h1>Invoice   </h1>
                </div>
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-6  body-main sss">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className=" col-sm-8 col-md-8 col-xl-9">
                                        <img className="img" alt="Invoce Template" src="http://pngimg.com/uploads/shopping_cart/shopping_cart_PNG59.png" />
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-xl-3 text-right">
                                        <h4 style={{ olor: "#F81D2D" }}><strong>Kiruba</strong></h4>
                                        <p className='size'>New Street, Kumbakonam</p>
                                        <p className='size'>1833-244-124</p>
                                        <p className='size'>kirubaharan8878m@gmail.com</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h2>INVOICE</h2>
                                        <h5>Order id : {order_id}</h5>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h5>Description</h5></th>
                                                <th><h5>Rate</h5></th>
                                                <th><h5>Quantity</h5></th>
                                                <th><h5>Amount</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.length > 0 && order.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td className="col-md-9">{item.product}</td>
                                                        <td className="col-md-9">{item.rate}</td>
                                                        <td className="col-md-9">{item.quantity}</td>
                                                        <td className="col-md-3">{item.total} </td>
                                                    </tr>
                                                })
                                            }
                                            <tr>
                                                <td className="text-right">

                                                    <p>
                                                        <strong>Total Amount </strong>
                                                    </p>
                                                    <p>
                                                        <strong> GST 18% </strong>
                                                    </p>
                                                    <p>
                                                        <strong>Discount  10%</strong>
                                                    </p>
                                                    <p>
                                                        <strong>Payable Amount</strong>
                                                    </p>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td>

                                                    <p>
                                                        <strong>{payment.Amount} </strong>
                                                    </p>
                                                    <p>
                                                        <strong> {payment.Gst}</strong>
                                                    </p>
                                                    <p>
                                                        <strong> {payment.Discount}</strong>
                                                    </p>
                                                    <p>
                                                        <strong>{payment.Total} </strong>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr style={{ color: "#F81D2D" }}>
                                                <td className="text-right"><h4><strong className='dd'>Total:</strong></h4></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-left"><h4><strong className='dd'> {payment.Total} </strong></h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <div className="constainer">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <p className='size'><b>Customer : </b>{customerName}</p>
                                             <p className='size'><b>Mobile Number : </b>{customerMobile}</p>
                                                <p className='size'><b>Payment Mode : </b>{paymenttype}</p>
                                                {
                                                    paymenttype === "Offline_payment" ? null : (<p className='size'><b>Payment id : </b>{payment_id}</p>)
                                                }
                                                <p className='size'><b>Date : </b>{orderDate}</p>
                                            </div>
                                            <div className="col-md-2">
                                                <p><b>Signature</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <button className='ww' onClick={() => {
                    window.print()
                }}> Print Invoice</button>
                <button className='ww' onClick={() => {
                    navigate('/user-portal')
                }}>Add New Order</button>
            </div>
        </>
    )
}

export default Invoice