import React, { useContext } from 'react'
import "./Brand.css";
import { NavLink, useNavigate } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import Search from '../../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewBrand() {
  let navigate = useNavigate();
  const context = useContext(AdminContext);
  const { brand, deleteBrand, getBrand } = context
  const handleEdit = (id) => {
    navigate(`/home/brand/edit-brand/${id}`)
  }
  const handledelete = async (id) => {
    await deleteBrand(id)
  }
  return (

    <div>
      <div className="comman_header">Home/Brand</div>

      <div className="comman p-2 ">
        <div className="d-flex justify-content-end ">

        </div>
        <div className="d-flex  justify-content-between mt-3">
          <div>
            <Search data={getBrand} lable={"Brand"} />
          </div>
          <div></div>
          <div>    <NavLink to="/home/brand/add-brand">
            <button type="button" className="btn btn-success">
              <span className='cz' ><FontAwesomeIcon icon={faPlus} /></span>  Add Brand
            </button>
          </NavLink>
          </div>
        </div>
        <div className="m-3 table_responsive text-center  mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Brand Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                brand.length > 0 && brand.map((item, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.brand}</td>
                    <td>
                      <button type="button" className="btn btn-success" onClick={() => {
                        handleEdit(item._id)
                      }}>
                        <span className='cz' ><FontAwesomeIcon icon={faPenToSquare} /></span> Edit
                      </button>
                      <button type="button" className="btn btn-secondary ms-2" onClick={() => {
                        handledelete(item._id)
                      }}>
                        <span className='cz' ><FontAwesomeIcon icon={faTrash} /></span> Delete
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

export default ViewBrand