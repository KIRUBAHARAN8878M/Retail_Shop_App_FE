import { useFormik } from "formik";
import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import AdminContext from "../../Context/adminContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
function EditBrand() {
  const params = useParams();
  const { brand, editBrand } = useContext(AdminContext);
  let viewBrand = brand.find((item) => item._id === params.id);

  const formik = useFormik({
    initialValues: {
      brand: viewBrand.brand,
    },
    validate: (values) => {
      const errors = {};
      if (values.brand.length === 0) {
        errors.brand = "Enter your Brand";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await editBrand(values, viewBrand._id);
    },
  });
  return (
    <div>
      <div className="comman_header mt-3 ">Home/Brand/Edit Brand</div>

      <div className="comman ">
        <div className="comman_head">
          <h6>Edit Brand </h6>
        </div>
        <div className="d-flex justify-content-center m-5">
          <form
            onSubmit={(values) => {
              formik.handleSubmit(values);
            }} >
            <label htmlFor="exampleInputEmail1" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control shadow-none"
              id="exampleInputEmail1"
              placeholder="Enter your brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="brand" />
            {formik.touched.brand && formik.errors.brand ? (
              <div className="error"> {formik.errors.brand}</div>
            ) : null}
            <button type="submit" className="btn btn-success mt-3">
            <span className='cz' ><FontAwesomeIcon icon={ faFloppyDisk}/></span> Save
            </button>
            <NavLink to="/home/brand">
              <button type="submit" className="btn btn-secondary  mt-3 ms-3">
              <span className='cz' ><FontAwesomeIcon icon={faXmark}/></span>  Cancel
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBrand;
