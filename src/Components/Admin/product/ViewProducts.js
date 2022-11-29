import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import Search from '../../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare,faTrash,faPlus ,faEye} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewProducts() {
  let navigate = useNavigate();
  const context = useContext(AdminContext);
  const { products, deleteProduct, getproducts } = context;
  const handleEdit = (id) => {
    navigate(`/home/products/edit-product/${id}`)
  }
  const handledelete = async (id) => {
    await deleteProduct(id)
  }
  const handleView = (id) => {
    navigate(`/home/products/oneProducts-view/${id}`)
  }
  return (
    <>
      <div className="comman_header">Home/Products</div>
      <div className="d-flex justify-content-end me-2">
        <NavLink to="/home/products/add-products"><button type="button" className="btn btn-success"><span className='cz' ><FontAwesomeIcon icon={ faPlus}/></span> Add Products</button></NavLink>

      </div>
      <div className="comman">
        <div className="comman_head">
          <h6>Products </h6>
        </div>
        <div className="d-flex justify-content-end mt-5 m-3 ">
          <Search data={getproducts} lable={"product,Brand,category,Rate,Quantity"} />
        </div>
        <div className="m-3 table_responsive  mx-auto ff">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
                <th scope="col">Product</th>
                <th scope="col">Rate</th>
                <th scope="col">Quantity</th>
                <th scope="col">Picture</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length > 0 && products.map((item, index) => {
                  return <tr key={index}>
                    <td >{index + 1}</td>
                    <td>{item.brand}</td>
                    <td>{item.category}</td>
                    <td>{item.product}</td>
                    <td>{item.rate}</td>
                    <td>{item.quantity}</td>
                    <td><img src={item.productImage} alt={item.product} className="product-img" /> </td>
                    <td>
                      <button type="button" className="btn btn-success mt-1" onClick={() => {
                        handleView(item._id)
                      }}>
                       <span className='cz' ><FontAwesomeIcon icon={ faEye}/></span> View
                      </button>
                      <button type="button" className="btn btn-warning ms-2 mt-1" onClick={() => {
                        handleEdit(item._id)
                      }}>
                       <span className='cz' ><FontAwesomeIcon icon={ faPenToSquare}/></span> Edit
                      </button>
                      <button type="button" className="btn btn-secondary ms-2 mt-1" onClick={() => {
                        handledelete(item._id)
                      }}>
                      <span className='cz' ><FontAwesomeIcon icon={ faTrash}/></span>  Delete
                      </button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  )

}

export default ViewProducts