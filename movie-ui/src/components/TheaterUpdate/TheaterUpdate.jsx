
import React, { useState, useEffect } from "react";
import "./TheaterUpdate.css";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function TheaterUpdate({ setShowModal4 }) {
    const token = localStorage.getItem("token");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [allmovies, setAllMovies] = useState([]);
    const [movieDate, setMovieDate] = useState('');
    const [movieTime, setMovieTime] = useState('');
    const [selectedTheater, setSelectedTheater] = useState();
    const [alltheater, setAlltheater] = useState([]);
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
                    window.location.href = "/signin";
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
    const handleTheaterSelection=(value)=>{
        setSelectedTheater(value);
    }
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
            movie:selectedMovie
        };

        console.log(theaterData)

        fetch(`http://127.0.0.1:8000/api/movies/${selectedTheater}/theater/`, {
            method: "PUT",
            body: JSON.stringify(theaterData),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 204) {
                    alert("Successful Updated")
                    setSelectedMovie('');
                    setName('');
                    setAddress('');
                    setCity('');
                    setPincode('');
                    setMovieDate('');
                    setMovieDate('');
                    setMovieTime('');

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
                        <h3>Update Theater Details</h3>
                    </div>
                    <div>
                        <button onClick={() => setShowModal4(false)}>X</button>
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
                    <div className="form-group">
                        <label htmlFor="name">Theater Name </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Leave it Blank if not require"
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
                            placeholder="Leave it Blank if not require"
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
                            placeholder="Leave it Blank if not require"
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
                            placeholder="Leave it Blank if not require"
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
                            placeholder="Leave it Blank if not require"
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
                            placeholder="Leave it Blank if not require"
                            value={movieTime}
                            onChange={handleTimeChange}
                            required
                        />
                    </div>

                    <div className="footer">
                        <button onClick={() => setShowModal4(false)} id="cancelBtn">
                            Cancel
                        </button>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TheaterUpdate;

