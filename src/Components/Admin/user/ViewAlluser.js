import axios from 'axios'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { env } from '../../../config'
import AdminContext from '../../Context/adminContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewAlluser() {
  let context = useContext(AdminContext)
  const { user, getUser } = context


  const handleChange = async (id, e) => {
    try {
      console.log(id);
      let value = await axios.put(`${env.api}/user/change-user/${id}`, { e });
      const { data } = value;
      if (data.statusCode === 200) {
        getUser();
        toast.success(data.message);
      }else{
        toast.warn(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const finder = async (id) => {
  //   let data = await order.filter((item) => item.billerId === id)
  //   return data.length
  // }
  // finder("637074c3b41982a0cea124c5")
  return (
    <div>
      <div className="comman_header">Home/Users</div>
      <div className="comman">
        <div className="comman_head">
          <h6>Users </h6>
        </div>
        <div className="d-flex justify-content-end mt-5 m-3 ">
          <form className="form-inline d-flex">
            <input
              className="form-control mr-sm-2 me-2 shadow-none"
              type="search"
              placeholder="Search"
              readOnly
            />
            <button className="btn btn-outline-success  my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="m-3 table_responsive">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Roll</th>
                {/* <th scope="col">No Of orders to put a bill</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                user.length > 0 && user.map((item, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td> <select className="form-select shadow-none" onChange={(e) => handleChange(item._id, e.target.value)} value={item.isAdmin}>
                      <option selected value="admin">Admin</option>
                      <option selected value="user">User</option>
                      <option selected value="none">None</option>
                    </select></td>
                    {/* {noOfOrder(item._id)} */}

                    {/* <td value={finder(item._id)}></td> */}
                    <td> <NavLink to={`/home/users/user/${item._id}`}> <button type="submit" className="btn btn-success ms-3"> <span className='cz' ><FontAwesomeIcon icon={ faEye}/></span> View</button> </NavLink> </td>
                  </tr>
                })
              }
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ViewAlluser
