import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

function EditProducts() {
  const params = useParams();
  const context = useContext(AdminContext);
  const { products, editProduct, brand, category } = context
  let viewProducts = products.find((item) => item._id === params.id);

  const formik = useFormik({
    initialValues: {
      brand: viewProducts.brand,
      category: viewProducts.category,
      product: viewProducts.product,
      rate: viewProducts.rate,
      quantity: viewProducts.quantity,
      productImage: viewProducts.productImage
    },
    validate: (values) => {
      const errors = {};
      if (values.brand.length === 0) {
        errors.brand = "Enter your Brand";
      }
      if (values.category.length === 0) {
        errors.category = "Enter your Category";
      }
      if (values.product.length === 0) {
        errors.product = "Enter your Product";
      }
      if (values.rate.length === 0) {
        errors.rate = "Enter your rate";
      }
      if (values.quantity.length === 0) {
        errors.quantity = "Enter your quantity";
      }
      if (values.productImage.length === 0) {
        errors.productImage = "Enter your Product Image URL";
      }
      return errors;
    },

    onSubmit: async (values) => {
      // values.availableInStock = values.quantity;
      await editProduct(values, viewProducts._id);
    },
  });
  let image = viewProducts.productImage;
  let img = "https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
  return (
    <>
      <div className="container">
        <div className="comman_header">Home/Products/Edit products</div>
        <div className="comman">
          <div className="comman_head">
            <h6> Edit Products </h6>
          </div>
          <div className=' '>
            <form onSubmit={(values) => {
              formik.handleSubmit(values);
            }}>
              <div className="container">
                <div className="row">
                  <div className=' col-sm-12 col-md-6 mx-auto d-flex justify-content-center align-items-center'>
                    <div className="">
                      <img src={image ? image : img} className="rounded" alt="img" width="300px" height="300px" />
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-6 mx-auto'>
                    <div className="form-group">
                      <label>Brand</label>
                      <select className="form-select shadow-none" id="" value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="brand">
                        <option selected value="Default">Enter a Brand</option>
                        {
                          brand.length > 0 && brand.map((item, index) => {
                            return <option key={index} value={item.brand}>{item.brand}</option>
                          })
                        }
                      </select>
                      {formik.touched.brand && formik.errors.brand ? (
                        <div className="error"> {formik.errors.brand}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className='ki'>Category</label>
                      <select className="form-select shadow-none" id="" value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="category">
                        <option selected value="Default">Enter a category</option>
                        {
                          category.length > 0 && category.map((item, index) => {
                            return <option key={index} value={item.category}>{item.category}</option>
                          })
                        }

                      </select>
                      {formik.touched.category && formik.errors.category ? (
                        <div className="error"> {formik.errors.category}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label >Product</label>
                      <input type="text" className="form-control shadow-none" placeholder="Enter your product name" value={formik.values.product}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="product" />
                      {formik.touched.product && formik.errors.product ? (
                        <div className="error"> {formik.errors.product}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label >Rate</label>
                      <input type="number" className="form-control shadow-none" placeholder="Enter your amount" value={formik.values.rate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="rate" />
                      {formik.touched.rate && formik.errors.rate ? (
                        <div className="error"> {formik.errors.rate}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label >Quantity</label>
                      <input type="number" className="form-control shadow-none" placeholder="Enter your quantity" value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="quantity"
                        min={viewProducts.quantity} />
                      {console.log(viewProducts.quantity)}
                      {formik.touched.quantity && formik.errors.quantity ? (
                        <div className="error"> {formik.errors.quantity}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label > Product Image</label>
                      <input type="url" className="form-control shadow-none" placeholder="Enter your image url" value={formik.values.productImage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="productImage" />
                      {formik.touched.productImage && formik.errors.productImage ? (
                        <div className="error"> {formik.errors.productImage}</div>
                      ) : null}
                    </div>
                    <button type="submit" className="btn btn-success mt-3"><span className='cz' ><FontAwesomeIcon icon={ faFloppyDisk}/></span> Save</button>
                    <NavLink to='/home/products'> <button type="submit" className="btn btn-secondary mt-3 ms-3"><span className='cz' ><FontAwesomeIcon icon={ faXmark}/></span> cancel</button></NavLink>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProducts