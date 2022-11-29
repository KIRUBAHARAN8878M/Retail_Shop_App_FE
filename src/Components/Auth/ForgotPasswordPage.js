import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { env } from "../../config";
import load from "../../asset/loading2.svg";

function ForgotPasswordPage() {
  const params = useParams();
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      conformPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.password.length === 0) {
        errors.password = "Enter your passowrd";
      } else if (values.password.search(/[a-z]/i) < 0) {
        errors.password = "Your password must contain at least one letter";
      } else if (values.password.search(/[0-9]/) < 0) {
        errors.password = "Your password must contain at least one digit";
      } else if (values.password.length < 8) {
        errors.password = "Your password must be at least 8 characters";
      }
      if (values.conformPassword !== values.password) {
        errors.conformPassword = "Conform password does not match";
      } else if (values.conformPassword.length === 0) {
        errors.conformPassword = "Enter your conform password";
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        delete values.conformPassword;
        values.id = params.id;
        values.token = params.token;
        setloading(true)
        let user = await axios.post(`${env.api}/user/password-reset-page`, values);

        if (user.data.statusCode === 200) {
          setloading(false)
          toast.success(user.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        if (user.data.statusCode === 401) {
          setloading(false)
          toast.warn(user.data.message);
          setTimeout(() => {
            navigate("/forgot-password");
          }, 4000);
        }

      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="containers">
      <form
        className="form"
        onSubmit={(values) => {
          formik.handleSubmit(values);
        }}
      >
        <h4 className="text-center mb-4">Password Reset Form</h4>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control shadow-none"
            placeholder="Enter you Password "
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error"> {formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label ">Conform Password</label>
          <input
            type="password"
            className="form-control shadow-none"
            placeholder="Enter you Conform Password"
            value={formik.values.conformPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="conformPassword"
          />
          {formik.touched.conformPassword && formik.errors.conformPassword ? (
            <div className="error"> {formik.errors.conformPassword}</div>
          ) : null}
        </div>
        <div className=" d-flex justify-content-center mt-4 mb-3">
          <button type="submit" className="btn btns" disabled={!formik.isValid}>
            {loading ? (
              <img
                src={load}
                alt="load"
                className="spinner"
              />
            ) : " Change Password "}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default ForgotPasswordPage