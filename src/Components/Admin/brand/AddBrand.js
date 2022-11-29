import { useFormik } from "formik";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AdminContext from "../../Context/adminContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


function AddBrand() {
  const context = useContext(AdminContext);
  const { addBrand } = context;
  const formik = useFormik({
    initialValues: {
      brand: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.brand.length === 0) {
        errors.brand = "Enter your Brand";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await addBrand(values);
    },
  });
  return (
    <div>
      <div className="comman_header mt-3 ">Home/Brand/Add Brand</div>

      <div className="comman ">
        <div className="comman_head">
          <h6>Add Brand </h6>
        </div>

        <div className="d-flex justify-content-center m-5">
          <form
            onSubmit={(values) => {
              formik.handleSubmit(values);
            }}
          >
            <label htmlFor="exampleInputEmail1" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control shadow-none"
              id="exampleInputEmail1"
              v
              placeholder="Enter your brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="brand"
            />
            {formik.touched.brand && formik.errors.brand ? (
              <div className="error"> {formik.errors.brand}</div>
            ) : null}
            <button type="submit" className="btn btn-success mt-3">
            <span className='cz' ><FontAwesomeIcon icon={ faFloppyDisk}/></span> Save
            </button>
            <NavLink to="/home/brand">
              <button type="submit" className="btn btn-secondary  mt-3 ms-3">
              <span className='cz' ><FontAwesomeIcon icon={faXmark}/></span> Cancel
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBrand;
