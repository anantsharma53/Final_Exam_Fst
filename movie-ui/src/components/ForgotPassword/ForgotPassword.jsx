import './ForgotPassword.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export function ForgotUser() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  function handleSubmit() {
    console.log(user);
    fetch("http://127.0.0.1:8000/api/user/reset/", {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",

      },

    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Successful password change")
          navigate("/signin");
        } else if (res.status === 500) {
          alert("Check your Details")
          // navigate("/signin");
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
      <div>
          <Link className="center-image" to='/'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Firefox_Home_-_logo.png"
              style={{ width: '80px' }} alt="logo" />
          </Link>
        </div>
        <h2 className="welcomeText">Movie Tickets </h2>
        <h2 className="welcomeSubText">Password Reset</h2>
        <Formik
          initialValues={{
            email: '',
            confirmPassword: '',
            username: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Email is invalid').required('Email is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
            username: Yup.string().min(6, 'Username must be at least 6 characters').required('username is required'),
          })}
          onSubmit={fields => {
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
          }}
          render={({ errors, status, touched }) => (
            <div>
              <Form id="employee-form">
                
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
                    user ? (<Link type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Submit</Link>)
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
      </div>
    </div>
  )
}
