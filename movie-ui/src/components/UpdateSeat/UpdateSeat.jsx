
import React, { useState, useEffect } from "react";
import "./UpdateSeat.css"
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function UpdateSeat({ setShowModal5 }) {
    const token = localStorage.getItem("token");
    const [selectedTheater, setSelectedTheater] = useState();
    const [selectedSeat, setSelectedSeat] = useState();
    const [selectedTheaterDel, setSelectedTheaterDel] = useState();
    const [selectedSeatDel, setSelectedSeatDel] = useState();
    const [seatNumber, setSeatNumber] = useState();
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [alltheater, setAlltheater] = useState([]);
    const [allseat, setAllseat] = useState([]);
    const [deletes, setDeletes] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/theater/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status !== 200) {
                    // Token expired, perform the redirect here
                    window.location.href = "/signin";
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => setAlltheater(data))
            .catch((error) => console.log(error));
    }, [token]);
    console.log(alltheater);
    console.log(selectedTheater)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/movies/theater/${selectedTheater}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status !== 200) {
                    // Token expired, perform the redirect here
                    // window.location.href = "/signin";
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => setAllseat(data.seats))
            .catch((error) => console.log(error));
    }, [selectedTheater,deletes]);

    console.log(allseat);
    console.log(selectedSeat)

    const handleSeatSelection = (value) => {
        setSelectedSeat(value);
        setSelectedSeatDel(value);
    };
    const handleTheaterSelection = (value) => {
        setSelectedTheater(value);
        setSelectedTheaterDel(value);
    }
    const handleSeatSelection1 = (value) => {
        
        setSelectedSeatDel(value);
    };
    const handleTheaterSelection1 = (value) => {
        
        setSelectedTheaterDel(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create your theaterData object with the values from state
        const theaterData = {
            theater: selectedTheater,
            // movie: selectedSeat,    
            seat_number: seatNumber,
            is_reserved: false,
            category: category,
            price: price
        };

        console.log(theaterData)

        fetch(`http://127.0.0.1:8000/api/seats/${selectedSeat}/`, {
            method: "PUT",
            body: JSON.stringify(theaterData),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    setSelectedSeat('');
                    setSelectedTheater('');
                    setSeatNumber('');
                    setPrice('');
                    setCategory('');

                    // navigate("/dashboard"); // Redirect to another page after successful upload
                } else if (res.status === 401) {
                    console.log("Unauthorized request");
                    navigate("/signin");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    function DeleteSeat() {
        fetch(`http://127.0.0.1:8000/api/seats/${selectedSeat}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.status === 204) {
                    setDeletes(prevDeletes => prevDeletes + 1);
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
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Update Seat Delete Seat</h3>
                    </div>

                    <div>
                        <button onClick={() => setShowModal5(false)}>X</button>
                    </div>
                </div>
                <h3>Select Theater and Seat No only <br />to Unreserved</h3>
                <form onSubmit={handleSubmit}>

                    <div className="searchOption">
                        <select
                            name="selectedTheater"
                            value={selectedTheater}
                            onChange={(e) => handleTheaterSelection(e.target.value)}
                        >
                            <option value="">Select Theater</option>
                            {alltheater.map((alltheater) => (
                                <option key={alltheater.id} value={alltheater.id}>
                                    {alltheater.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="searchOption">
                        <select
                            name="selectedSeat"
                            value={selectedSeat}
                            onChange={(e) => handleSeatSelection(e.target.value)}
                        >
                            <option value="">Select Movie</option>
                            {allseat.map((allseat) => (
                                <option key={allseat.id} value={allseat.id}>
                                    {allseat.seat_number}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="third_show">Category</label>
                        <select
                            name="third_show"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ color: 'black' }}
                        >
                            <option style={{ color: 'black' }} value="">Select Category</option>
                            <option style={{ color: 'black' }} value="Silver">Silver</option>
                            <option style={{ color: 'black' }} value="gold">Gold</option>
                            <option style={{ color: 'black' }} value="platinum">Platinum</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Seat Number </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Leave it Blank if not require"
                            value={seatNumber}
                            onChange={(e) => setSeatNumber(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Leave it Blank if not require"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                        />
                    </div>


                    <div className="footer">
                        <button onClick={() => setShowModal5(false)} id="cancelBtn">
                            Cancel
                        </button>
                        <button type="submit">Continue</button>
                    </div>
                    <div className="titleCloseBtn">
                        <div>
                            <h3>Delete Seat</h3>
                        </div>
                    </div>
                    <h3>Select Theater and Seat No only <br />to Delete</h3>
                        <div className="footer">
                        <div>
                            <button id="cancelBtn" onClick={() => DeleteSeat()}>Delete</button>
                        </div>
                        </div>
                </form>
            </div>
        </div>
    );
}


export default UpdateSeat;

