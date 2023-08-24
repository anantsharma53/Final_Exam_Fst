import './Navbar.css'
import { useEffect,useState} from "react";
import { Link } from 'react-router-dom';
 function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
  }, [loggedIn]);
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('user_details');
    localStorage.removeItem("tokenExpiration");
    setLoggedIn(false);
    
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-bg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="
          https://icon-library.com/images/movie-icon/movie-icon-2.jpg
          "style={{height:'60px',width:'100px'}}
          alt="Movies Logo"
          ></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/dashboard">
                Dashboard
              </a>
            {/* <Link to='/dashboard' className="nav-link active" aria-current="page">Dashboard</Link> */}
            </li>
            
          </ul>
          {loggedIn?<Link to ='/signin' className="btn btn-primary float-end" onClick={onLogoutHandler}>Log Out </Link>
          :<Link to ='/signin'className="btn btn-primary float-end" >
            Join Us
          </Link>}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
