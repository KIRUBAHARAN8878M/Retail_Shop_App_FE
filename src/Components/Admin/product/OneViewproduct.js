import React, { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBackward } from '@fortawesome/free-solid-svg-icons'

function OneViewproduct() {
  const params = useParams();
  const context = useContext(AdminContext);
  const { products } = context
  let viewProducts = products.find((item) => item._id === params.id);

  let image = viewProducts.productImage;
  let img = "https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
  return (
    <div className="container">
      <div className="comman_header">Home/Products/View products</div>
      <div className="comman">
        <div className="comman_head">
          <h6>View Products </h6>
        </div>
        <div >
          <form>
            <div className="container">
              <div className="row">
                <div className=' col-sm-12 col-md-6  mx-auto d-flex justify-content-center align-items-center'>
                  <div >
                    <img src={image ? image : img} className="rounded" alt="img" width="300px" height="300px" />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6  '>
                  <div className="form-group">
                    <label>Brand</label>
                    <input type="text" className="form-control shadow-none" value={viewProducts.brand} readonly />
                  </div>
                  <div className="form-group">
                    <label className='ki'>Category</label>
                    <input type="text" className="form-control shadow-none" value={viewProducts.category} readonly />
                  </div>
                  <div className="form-group">
                    <label >Product</label>
                    <input type="text" className="form-control shadow-none" value={viewProducts.product} readonly />
                  </div>
                  <div className="form-group">
                    <label >Rate</label>
                    <input type="text" className="form-control shadow-none" value={viewProducts.rate} readonly />
                  </div>
                  <div className="form-group">
                    <label >Quantity</label>
                    <input type="text" className="form-control shadow-none" value={viewProducts.quantity} readonly />
                  </div >
                  <NavLink to='/home/products'> <button type="submit" className="btn btn-secondary mt-3 ms-3"> <span className='cz' ><FontAwesomeIcon icon={ faBackward}/></span> Back</button></NavLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OneViewproduct