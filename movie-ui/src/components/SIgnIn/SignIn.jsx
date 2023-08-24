import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignIn.css";

export function Signin() {
  let navigate = useNavigate();
  //const dispatch=useDispatch();
  let location = useLocation();

  //const[userName,setUserName]=useState([]);

  console.log(location.pathname);
  const [user, setFormData] = useState({
    username: '',
    password: '',
  });
  function handleSubmit() {

    fetch("http://127.0.0.1:8000/api/user/signin/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",

      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse response as JSON
        } else if (res.status === 400) {
          console.log("Unauthorized request");
          alert("Login Error");
          throw new Error("Unauthorized request");
        } else {
          console.log("Something went wrong");
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        const { user, access } = data;
        localStorage.setItem("token", data.access);
        localStorage.setItem("tokenExpiration", data.access);
        localStorage.setItem("user_details", JSON.stringify(user));
        alert("Sucess");
        const users = JSON.parse(localStorage.getItem('user_details'));
        const isSuperUser = users && users.is_superuser;
        if(isSuperUser)
        {
          navigate('/dashboard')}
        else{
          navigate("/");
        }
        
      })
      .catch((err) => {
        alert("Check your Username Or Password");
        console.log(err);
      });
  }
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...user, [name]: value });
    console.log(user);
  }


  return (

    <div className="signinContainer">
      <div className="signinForm">
        <div>
          <Link className="center-image" to='/'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Firefox_Home_-_logo.png"
              style={{ width: '80px' }} alt="logo" />
          </Link>
        </div>
        <h2 className="welcomeText">Go Back</h2>
        <h2 className="welcomeSubText">Login Details</h2>
        <div className="mb-3 form-control-group">
          <label className="form-label">
            Username
          </label>
          <input type="email" id="username" className="form-control"
            placeholder="username" name="username" onChange={handleChange} value={user.username} />

        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">
            Password
          </label>
          <input type="password" placeholder="password" name="password" id="password" onChange={handleChange} value={user.password} className="form-control" />


        </div>

        <div className="linkWrapper mb-3">
          <span>
            <input type="checkbox" ></input> &nbsp;
            <a href="" className="form-label">
              Remember Password
            </a>
          </span>
          <a href="" className="form-label">
            Forgot Password
          </a>
        </div>
        <div className="btn-wrapper">
          <button className="btn btn-primary mb-3" type="button" onClick={handleSubmit}>
            Sign In</button>


        </div>

        <span className="loginText" htmlFor="">
          Don't have an account?  &nbsp;&nbsp;
          <Link to="/signup" className="loginLink" >
            SignUp Now  </Link>
        </span>


      </div>

    </div>
  );

}