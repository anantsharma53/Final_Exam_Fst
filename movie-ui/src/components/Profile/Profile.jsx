import React from 'react';
import { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from "react-router-dom";
function Profile(props) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [user, setUser] = useState()

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${userDetails.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setUser(data);

      })
      .catch((error) => {
        navigate('/signin')
        console.error('Error fetching data:', error);
        //setLoading(false); // Set loading to false in case of an error
      });

  }, []);
  console.log(user)

  const [formData, setFormData] = useState({
    name: userDetails.name,
    username: userDetails.username,
    email: userDetails.email,
    mobile_number: userDetails.mobile_number,
    password: userDetails.newpassword
  });
  const handleUpdateClick = () => {

    // Show the modal when the button is clicked

    setIsUpdateFormVisible(!isUpdateFormVisible);
  };
  const handleDeleteClick = () => {

    // Show the modal when the button is clicked

    setIsDeleteVisible(!isDeleteVisible);
  };

  const handleCloseModal = () => {
    // Close the modal when needed
    setIsUpdateFormVisible(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here (e.g., send updated data to the server)
    // Then, close the modal and update user details
    fetch(`http://127.0.0.1:8000/api/user/${user.id}/`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },

    })
      .then((res) => {
        console.log(res);
        if (res.status === 202) {
          alert("DETAILS UPDATE PLEASE RELOGIN")
          navigate('/signin')
        } else if (res.status === 401) {
          console.log("Unauthorized request");

        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log();

    setIsUpdateFormVisible(false);
    // localStorage.setItem("user_details", JSON.stringify(formData));
  };
  function UserDelete() {
    fetch(`http://127.0.0.1:8000/api/user/${user.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    })
        .then(response => {
            
            if (response.status === 204) {
                navigate('/')
                localStorage.removeItem("token");
                localStorage.removeItem('user_details');
                localStorage.removeItem("tokenExpiration");
                console.error('deleting done:', response.status);
            } else {
                // Handle other response statuses here
                console.error('Error deleting movie:', response.status);
            }
        })
        .catch(error => {
            console.error('Error deleting movie:', error);
        });
}
  return (
    <div className='profile-header'>
      <div className='profileBox'>
        <div className='profile-details'>
          <div className='imgdel'>
            <img style={{ width: '180px', borderRadius: '10px' }}
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
              alt='Generic placeholder image'
              fluid />
            <button className="btndelete" onClick={handleDeleteClick}>Delete My Account</button>
          </div>
          <div>
            <p>Name: {userDetails.name}</p>
            <p>Username: {userDetails.username}</p>
            <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
              style={{ backgroundColor: '#efefef' }}>
              <div>
                <p className="small text-muted mb-1">Email: {userDetails.email}</p>
              </div>
            </div>
            <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
              style={{ backgroundColor: '#efefef' }}>
              <div>
                <p className="small text-muted mb-1">Mobile No: {userDetails.mobile_number}</p>
              </div>
            </div>
            <button className="btnupdate" onClick={handleUpdateClick}>Update Detail</button>
          </div>
        </div>
      </div>

      <div className=''>
        {isUpdateFormVisible && (
          <form class="profileUpdateBox" onSubmit={handleFormSubmit}>
            <div className='profileUpdat-details'>
              <div className="mb-3 formDisplay">
                <div>
                  <label htmlFor="name" >Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="mb-3 formDisplay">
                <div>
                  <label htmlFor="username" >Username</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="mb-3 formDisplay">
                <div>
                  <label htmlFor="email" >Email</label>
                </div>
                <div>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="mb-3 formDisplay">
                <div>
                  <label htmlFor="mobile_number" >Mobile Number</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile_number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleFormChange}
                  />
                </div>

              </div>
              <div className="mb-3 formDisplay">
                <div>
                  <label htmlFor="password" >New Password</label>
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>

              </div>
              <button type="submit" className="btnupdate">Save Changes</button>
            </div>

          </form>
        )}
      </div>
      <div className=''>
        {isDeleteVisible && (
          <div class="profileDELETEBox">
            <h2>ARE YOU SURE TO DELETE YOUR ACCOUNT !!!!</h2>
            {/* <h2>You will Naver Retrive your account</h2> */}
            <img src='https://png.pngtree.com/png-clipart/20201208/original/pngtree-cartoon-creative-hand-drawn-emoticon-pack-picture-goodbye-png-image_5506250.jpg'
              style={{ width: '150px', height: '150px' }}
            />
            <div className="mb-3 formDisplay">

              <button className="btnupdate" onClick={UserDelete}>YES</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
