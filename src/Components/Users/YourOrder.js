import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { env } from '../../config';
import './YourOrder.css'
function YourOrder() {
    const [order, setOrder] = useState([])

    const getOrder = async (id) => {
        try {
            let value = await axios.get(`${env.api}/orders/your-order/${id}`);
            const { data } = value;
            setOrder(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let x = window.localStorage.getItem("userId")
        getOrder(x)
    }, [])

    console.log(order);
    return (
        <div>
            <div className='p-3'>
                <h2>My Order : -</h2>
            </div>
            <div className="m-3 table_responsive qqq">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th>Customer Name</th>
                <th>Customer Mobile</th>
                <th>Payment Mode</th>
                <th scope="col">order</th>
                <th scope="col">Amount</th>
                {/* <th scope="col">No Of orders to put a bill</th> */}
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {
                order.length > 0 && order ?  (
                  order.length > 0 && order.map((item,index)=>{
                    return <tr key={index}>
                            <td>{index +1}</td>
                            <td>{item.customer.orderDate}</td>
                            <td>{item.customer.customerName}</td>
                            <td>{item.customer.customerMobile}</td>
                            <td>{item.paymenttype}</td>
                            
                            <td>{item.order.map((item,index)=>{
                                return<  >
                                <span> <span className='error'>Product Name</span> :  {item.product}</span><br />
                                <span>  <span className='error'>Quantity</span> :  {item.quantity} </span><br />
                                <span> <span className='error'>Rate</span> : Rs : -  {item.rate}</span><br />
                                <span> <span className='error'>Total</span> : Rs : -  {item.total}</span><br />
                                <hr className=' p-1'/>
                                </>
                            })}</td>
                            <td><span> <span className='error'>Product Amount</span> : Rs : -  {item.payment.Amount}</span><br />
                            <span> <span className='error'>Discount</span> : Rs : - {item.payment.Discount}</span><br />
                            <span> <span className='error'>GST</span> : Rs : - {item.payment.Gst}</span><br />
                            <hr />
                            <span> <span className='error'>Total</span> : Rs : - {item.payment.Total}</span><br />
                            
                            </td>
                    </tr>
                  })
                 ) : (<tr> <h5>No Record Found</h5></tr> )
              }
           
           
            </tbody>
          </table>
        </div>
        </div>
    )
}

export default YourOrder