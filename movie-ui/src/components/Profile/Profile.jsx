import React from 'react';
import { useState } from 'react';
import './Profile.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Modal, Button, Form } from 'react-bootstrap';
function Profile(props) {

  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: userDetails.name,
    username: userDetails.username,
    email: userDetails.email,
    mobile_number: userDetails.mobile_number,
  });

  const handleUpdateClick = () => {
    // Show the modal when the button is clicked

    setIsUpdateFormVisible(!isUpdateFormVisible);
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

    setIsUpdateFormVisible(false);
    // You can also update the user details in localStorage or make an API call here
    localStorage.setItem("user_details", JSON.stringify(formData));
  };
  return (
    <div className='profile-header'>
      <div className='profileBox'>
        <div className='profile-details'>
          <div>
            <img style={{ width: '180px', borderRadius: '10px' }}
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
              alt='Generic placeholder image'
              fluid />
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

      <div>
        {isUpdateFormVisible && (
          <form class="profileUpdateBox" onSubmit={handleFormSubmit}>
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
            <button type="submit" className="btnupdate">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}
export default Profile;
