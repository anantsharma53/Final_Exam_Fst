import './SignUp.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export function Signup() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  function handleSubmit() {
    console.log(user);
    fetch("http://127.0.0.1:8000/api/user/signup/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",

      },

    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("Successful SignUP")
          navigate("/signin");
        } else if (res.status === 401) {
          console.log("Unauthorized request");
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(user);
  }
  return (
    <div className="signupContainer">
      <div className="signupForm">
        <h2 className="welcomeText">WELCOME</h2>
        <h2 className="welcomeSubText">Movie Tickets</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile_number: '',
            username: ''
          }}
          validationSchema={Yup.object().shape({
            Name: Yup.string().required('First Name is required'),
            email: Yup.string().email('Email is invalid').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
            username: Yup.string().min(6, 'Username must be at least 6 characters').required('username is required'),
            mobile_number: Yup.number().required('Mobile Number is required'),
          })}
          onSubmit={fields => {
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
          }}
          render={({ errors, status, touched }) => (
            <div>
              <Form id="employee-form">
                <div className="mb-3 form-control-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Field name="name" type="text" onInput={(e) => {
                    user.name = e.target.value; //setUser(user);
                  }} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </div>
                <div className="mb-3 form-control-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field name="email" type="text" onInput={(e) => {
                    user.email = e.target.value;
                    setUser(user);
                  }} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="mb-3 form-control-group">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field name="Username" type="text" onInput={(e) => {
                    user.username = e.target.value;
                    setUser(user);
                  }} className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="mb-3 form-control-group">
                  <label htmlFor="username" className="form-label">Mobile Number</label>
                  <Field name="mobile_number" type="number" onInput={(e) => {
                    user.mobile_number = e.target.value;
                    setUser(user);
                  }} className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="mb-3 form-control-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="mb-3 form-control-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <Field name="confirmPassword" type="password" onInput={(e) => {
                    user.password = e.target.value;
                    setUser(user);
                  }} className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                </div>

                <div className="btn-wrapper">
                  {
                    user ? (<Link type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Register</Link>)
                      : (
                        <Link className="btn btn-primary mb-3" to="/login">
                          Login
                        </Link>)}
                </div>
              </Form>
              <span className="loginText" htmlFor="">
                Already have an account? &nbsp;&nbsp;
                <a className="loginLink" href="/signin">
                  Login{' '}
                </a>
              </span>

            </div>
          )}
        />

        {/* <div className="mb-3 form-control-group">
          <label className="form-label">Email</label>
          <input
            placeholder="Enter your Email"
            type="email"
            name="email"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">Confirm Password</label>
          <input
            placeholder="Password"
            type="password"
            name="confirmPassword"
            className="form-control"
          ></input>
        </div>
        <div className="btn-wrapper">
          <button className="btn btn-primary mb-3">Sign Up</button>
        </div>

        <span className="loginText" htmlFor="">
          Already have an account? &nbsp;&nbsp;
          <a className="loginLink" href="/signin">
            Login{' '}
          </a>
        </span> */}
      </div>
    </div>
  )
}
