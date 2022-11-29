import React, { useContext, useEffect, useState } from 'react'
import './ProfilePage.css'
import { useFormik } from 'formik';
import UserContext from '../Context/usercContext';
import axios from 'axios';
import { env } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePage() {
  const context = useContext(UserContext)
  const { setUsername } = context
  const [pic, setPic] = useState("");

  useEffect(() => {
    profileDetails()
  }, [])

  let image = pic;
  let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkSWLRxX42sG_oDs7OlqF2x2Vs88aEBqyWA&usqp=CAU";



  const profileDetails = async () => {
    try {
      let x = window.localStorage.getItem("userId")
      let value = await axios.get(`${env.api}/user/profileDetail/${x}`);
      formik.setValues({
        name: value.data.data.name,
        email: value.data.data.email,
        mobile: value.data.data.mobile,
        age: value.data.data.age,
        dateOfBirth: value.data.data.dateOfBirth,
        profileUrl: value.data.data.profileUrl
      })
      setUsername(value.data.data.name)
      window.localStorage.removeItem("name")
      window.localStorage.setItem("name", value.data.data.name)
      setPic(value.data.data.profileUrl);
    } catch (error) {
      console.log(error);
    }
  }
  const profileUpdate = async (values) => {
    try {
      let x = window.localStorage.getItem("userId")
      let data = await axios.post(`${env.api}/user/profilePage/${x}`, values)
      if (data.data.statusCode === 200) {
        profileDetails()
        toast.success("Update Successfully")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      age: "",
      dateOfBirth: "",
      profileUrl: ""
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length === 0) {
        errors.name = "Enter your Name";
      }
      if (values.email.length === 0) {
        errors.email = "Enter Your Email Id";
      }
      if (values.age.length === 0) {
        errors.age = "Enter Your Age";
      }
      if (values.dateOfBirth.length === 0) {
        errors.dateOfBirth = "Enter Your Date Of Birth";
      }
      if (values.profileUrl.length === 0) {
        errors.profileUrl = "Enter Your Profile Image";
      }

      function validateMobile(mobilenumber) {
        var regmm = "^([0|+[0-9]{1,5})?([7-9][0-9]{9})$";
        var regmob = new RegExp(regmm);
        if (values.mobile.length === 0) {
          return (errors.mobile = "Enter your mobile number");
        }
        if (regmob.test(mobilenumber)) {
          return errors;
        } else {
          return (errors.mobile = "Please provide a valid mobile number");
        }
      }
      validateMobile(values.mobile);
      return errors;
    },
    onSubmit: async (values) => {
      formik.resetForm();


      profileUpdate(values)
    },
  });

  const formik1 = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      conformPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.oldPassword.length === 0) {
        errors.oldPassword = "Enter your Old Password";
      }

      if (values.newPassword.length === 0) {
        errors.newPassword = "Enter your passowrd";
      } else if (values.newPassword.search(/[a-z]/i) < 0) {
        errors.newPassword = "Your password must contain at least one letter";
      } else if (values.newPassword.search(/[0-9]/) < 0) {
        errors.newPassword = "Your password must contain at least one digit";
      } else if (values.newPassword.length < 8) {
        errors.newPassword = "Your password must be at least 8 characters";
      }



      if (values.conformPassword !== values.newPassword) {
        errors.conformPassword = "Conform password does not match";
      } else if (values.conformPassword.length === 0) {
        errors.conformPassword = "Enter your conform password";
      }


      return errors;
    },
    onSubmit: async (values) => {
      formik1.resetForm()
      console.log(values);
    },
  });
  return (
    <div className="container w-75 mx-auto">
      <form onSubmit={(values) => { formik.handleSubmit(values) }}>
        <div className="row">
          <div className='col-sm-12 col-md-6 d-flex justify-content-center align-items-center'>
            <div className=''>
              <img src={image ? image : img} className="img-r" alt="img" width="250px" height="250px" />
            </div>
          </div>
          <div className='col-sm-12 col-md-6'>
            <div className="form-group mt-5">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" className="form-control shadow-none" id="exampleInputEmail1" placeholder=' Enter Your Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
              />
              {formik.touched.name && formik.errors.name ? (<div className="error"> {formik.errors.name}</div>) : null}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your Email Address'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                readOnly
              />
              {formik.touched.email && formik.errors.email ? (<div className="error"> {formik.errors.email}</div>) : null}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mobile Number</label>
              <input type="number" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your Mobile Number'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="mobile"
              />
              {formik.touched.mobile && formik.errors.mobile ? (<div className="error"> {formik.errors.mobile}</div>) : null}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Age</label>
              <input type="number" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your Age'
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="age"
                min={10}
              />
              {formik.touched.age && formik.errors.age ? (<div className="error"> {formik.errors.age}</div>) : null}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Date Of Birth</label>
              <input type="date" className="form-control shadow-none" id="exampleInputEmail1"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="dateOfBirth"
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (<div className="error"> {formik.errors.dateOfBirth}</div>) : null}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Update Profile Image</label>
              <input type="url" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your Update Profile Image'
                value={formik.values.profileUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="profileUrl"
              />
              {formik.touched.profileUrl && formik.errors.profileUrl ? (<div className="error"> {formik.errors.profileUrl}</div>) : null}
            </div>
            <button type="submit" className="btn btn-success mt-4 mb-3">  <span className='cz'><FontAwesomeIcon icon={faPenToSquare} /></span> Update</button>
          </div>
        </div>
      </form>
      <form onSubmit={(values) => { formik1.handleSubmit(values) }}>
        <div className=''>
          <div className="form-group">
            <label for="exampleInputEmail1">Old Password</label>
            <input type="password" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your Old Password'
              value={formik1.values.oldPassword}
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              name="oldPassword"
              readOnly
            />
            {formik1.touched.oldPassword && formik1.errors.oldPassword ? (<div className="error"> {formik1.errors.oldPassword}</div>) : null}
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">New Password</label>
            <input type="password" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your New Password'
              value={formik1.values.newPassword}
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              name="newPassword"
              readOnly
            />
            {formik1.touched.newPassword && formik1.errors.newPassword ? (<div className="error"> {formik1.errors.newPassword}</div>) : null}
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Conform Password</label>
            <input type="password" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter Your Conform Password'
              value={formik1.values.conformPassword}
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              name="conformPassword"
              readOnly
            />
            {formik1.touched.conformPassword && formik1.errors.conformPassword ? (<div className="error"> {formik1.errors.conformPassword}</div>) : null}
          </div>
          <button type="submit" className="btn btn-success mt-4"><span className='cz'><FontAwesomeIcon icon={faPenToSquare} /></span> Update</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default ProfilePage