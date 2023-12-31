
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
    const [movietimeing, setMovietiming] = useState("");
    const [allmovies, setAllMovies] = useState([]);
    const [movieDate, setMovieDate] = useState('');
    const [movieTime, setMovieTime] = useState('');
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
        const formattedMovieTiming = `${movieDate}T${movieTime}:00Z`;
        // Create your theaterData object with the values from state
        const theaterData = {
            name: name,
            address: address,
            city: city,
            pincode: pincode,
            movie_timing: formattedMovieTiming,
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
                    setMovietiming('');

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
    const handleDateChange = (e) => {
        setMovieDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setMovieTime(e.target.value);
    };
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Add Theater Details</h3>
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
                        <label htmlFor="movie-date">Movie Date:</label>
                        <input
                            type="date"
                            id="movie-date"
                            name="movie-date"
                            value={movieDate}
                            onChange={handleDateChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="movie-time">Movie Time:</label>
                        <input
                            type="time"
                            id="movie-time"
                            name="movie-time"
                            value={movieTime}
                            onChange={handleTimeChange}
                            required
                        />
                    </div>

                    <div className="footers">
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

