import React, { useContext } from 'react'
import './OrderSuccess.css';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../Context/usercContext';
function OrderSuccess() {
  const context = useContext(UserContext);
  const { getInvoice } = context;
  let navigate = useNavigate();
  let params = useParams()

  return (
    <>
      <div className='ffs'>
        <div className="cardss">
          <div className='ssk'>
            <span className="checkmark">✓</span>
          </div>
          <h1 className='h1'>Success</h1>
          <button className='ww' onClick={() => {
            getInvoice(params.id)
          }} > View Invoice</button>
          <button className='ww' onClick={() => {
            navigate('/user-portal')
          }}>Add New Order</button>
        </div>
      </div>
    </>
  )
}

export default OrderSuccess