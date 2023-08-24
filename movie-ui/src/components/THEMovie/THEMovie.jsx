
import React, { useState, useEffect } from "react";
import "./THEMovie.css";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function MovieThUpload({ setShowModal2 }) {
    const token = localStorage.getItem("token");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [movieDate, setMovieDate] = useState("");
    const [firstShow, setFirstShow] = useState("");
    const [secondShow, setSecondShow] = useState("");
    const [thirdShow, setThirdShow] = useState("");
    const [allmovies, setAllMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/movies/all/", {
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
                    window.location.href = "/login";
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => setAllMovies(data))
            .catch((error) => console.log(error));
    }, [token]);

    const handleMovieSelection = (value) => {
        setSelectedMovie(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create your theaterData object with the values from state
        const theaterData = {
            name,
            address,
            city,
            pincode,
            first_show: firstShow,
            second_show: secondShow,
            third_show: thirdShow,
            date: movieDate,
        };

        console.log(theaterData)

        fetch(`http://127.0.0.1:8000/api/movies/${selectedMovie}/add_theater/`, {
            method: "POST",
            body: JSON.stringify(theaterData),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    alert("Successful Uploaded");
                    setSelectedMovie('');
                    setName('');
                    setAddress('');
                    setCity('');
                    setPincode('');
                    setMovieDate('');
                    setFirstShow('');
                    setSecondShow('');
                    setThirdShow('');
                    navigate("/dashboard"); // Redirect to another page after successful upload
                } else if (res.status === 401) {
                    console.log("Unauthorized request");
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Upload Movie</h3>
                    </div>
                    <div>
                        <button onClick={() => setShowModal2(false)}>X</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="searchOption">
                        <select
                            name="selectedMovie"
                            value={selectedMovie}
                            onChange={(e) => handleMovieSelection(e.target.value)}
                        >
                            <option value="">Select Movie</option>
                            {allmovies.map((allmovie) => (
                                <option key={allmovie.id} value={allmovie.id}>
                                    {allmovie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Theater Name </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Name of the City</label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="movie_date">Movie Date</label>
                        <input
                            type="date"
                            name="movie_date"
                            value={movieDate}
                            onChange={(e) => setMovieDate(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_show">First Show Time</label>
                        <select
                            name="first_show"
                            value={firstShow}
                            onChange={(e) => setFirstShow(e.target.value)}
                            style={{ color: 'black' }}
                        >
                            <option style={{ color: 'black' }} value=''>Select Time</option>
                            <option style={{ color: 'black' }} value="09:00:00.000000">09:00 AM</option>
                            <option style={{ color: 'black' }} value="12:00:00.000000">12:00 PM</option>
                            <option style={{ color: 'black' }} value="15:00:00.000000">03:00 PM</option>
                            <option style={{ color: 'black' }} value="00:00:00.000000">No Show</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="second_show">Second Show Time</label>
                        <select
                            name="second_show"
                            value={secondShow}
                            onChange={(e) => setSecondShow(e.target.value)}
                            style={{ color: 'black' }}
                        >
                            <option style={{ color: 'black' }} value="">Select Time</option>
                            <option style={{ color: 'black' }} value="09:00:00.000000">09:00 AM</option>
                            <option style={{ color: 'black' }} value="12:00:00.000000">12:00 PM</option>
                            <option style={{ color: 'black' }} value="15:00:00.000000">03:00 PM</option>
                            <option style={{ color: 'black' }} value="00:00:00.000000">No Show</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="third_show">Third Show Time</label>
                        <select
                            name="third_show"
                            value={thirdShow}
                            onChange={(e) => setThirdShow(e.target.value)}
                            style={{ color: 'black' }}
                        >
                            <option style={{ color: 'black' }} value="">Select Time</option>
                            <option style={{ color: 'black' }} value="09:00:00.000000">09:00 AM</option>
                            <option style={{ color: 'black' }} value="12:00:00.000000">12:00 PM</option>
                            <option style={{ color: 'black' }} value="15:00:00.000000">03:00 PM</option>
                            <option style={{ color: 'black' }} value="00:00:00.000000">No Show</option>
                        </select>
                    </div>
                    <div className="footer">
                        <button onClick={() => setShowModal2(false)} id="cancelBtn">
                            Cancel
                        </button>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MovieThUpload;

