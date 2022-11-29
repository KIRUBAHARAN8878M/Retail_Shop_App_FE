import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import Search from '../../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewCategory() {

  let navigate = useNavigate();
  const context = useContext(AdminContext);
  const { category, deleteCategory, getCategory } = context
  const handleEdit = (id) => {
    navigate(`/home/category/edit-category/${id}`)
  }
  const handledelete = async (id) => {
    console.log(id);
    await deleteCategory(id)
  }
  return (
    <div>
      <div className="comman_header">Home/Category</div>
      <div className="d-flex justify-content-end me-2">
        <NavLink to="/home/category/add-category">
          <button type="button" className="btn btn-success">
          <span className='cz' ><FontAwesomeIcon icon={ faPlus}/></span> Add Category
          </button>
        </NavLink>
      </div>
      <div className="comman ">
        <div className="comman_head">
          <h6>Category </h6>
        </div>
        <div className="d-flex justify-content-end mt-5 m-3">
          <div className="form-inline d-flex" >
            <Search data={getCategory} lable={"Category"} />
          </div>
        </div>
        <div className="m-3 table_responsive order-table mx-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                category.length > 0 && category.map((item, index) => {
                  return <tr key={index}>
                    <td >{index + 1}</td>
                    <td>{item.category}</td>
                    <td>
                      <button type="button" className="btn btn-success" onClick={() => {
                        handleEdit(item._id)
                      }}>
                        <span className='cz' ><FontAwesomeIcon icon={ faPenToSquare}/></span> Edit
                      </button>
                      <button type="button" className="btn btn-secondary ms-2" onClick={() => {
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewCategory