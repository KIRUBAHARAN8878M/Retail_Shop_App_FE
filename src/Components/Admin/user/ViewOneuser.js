import React, { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBackward } from '@fortawesome/free-solid-svg-icons'

function ViewOneuser() {
  let context = useContext(AdminContext)
  let params = useParams();
  const { order } = context

  let data = order.filter((item) => item.billerId === params.id)

  return (
    <div>
      <div className='w-100 bg-danger p-2'>Order History</div>
      <div>
        <div className="m-3 table_responsive">
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
                data.length > 0 && data ? (
                  data.length > 0 && data.map((item, index) => {
                    return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.customer.orderDate}</td>
                      <td>{item.customer.customerName}</td>
                      <td>{item.customer.customerMobile}</td>
                      <td>{item.paymenttype}</td>
                      <td>{item.order.map((item, index) => {
                        return <  >
                          <span> <span className='error'>Product Name</span> :  {item.product}</span><br />
                          <span>  <span className='error'>Quantity</span> :  {item.quantity} </span><br />
                          <span> <span className='error'>Rate</span> : Rs : -  {item.rate}</span><br />
                          <span> <span className='error'>Total</span> : Rs : -  {item.total}</span><br />
                          <hr className=' p-1' />
                        </>
                      })}</td>
                      <td><span> <span className='error'>Product Amount</span> : Rs : - {item.payment.Amount}</span><br />
                        <span> <span className='error'>Discount</span> : Rs : - {item.payment.Discount}</span><br />
                        <span> <span className='error'>GST</span> :Rs : -  {item.payment.Gst}</span><br />
                        <hr />
                        <span> <span className='error'>Total</span> : Rs : - {item.payment.Total}</span><br />
                      </td>
                    </tr>
                  })
                ) : (<tr> <h5>No Record Found</h5></tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
      <NavLink to='/home/users'> <button type="submit" className="btn btn-success ms-3"> <span className='cz' ><FontAwesomeIcon icon={ faBackward}/></span> Back</button> </NavLink>
    </div>
  )
}

export default ViewOneuser