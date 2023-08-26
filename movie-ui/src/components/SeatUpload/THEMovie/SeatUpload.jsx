
import React, { useState, useEffect } from "react";
import "./SeatUpload.css";
import { useNavigate } from "react-router-dom";

function SeatUpload({ setShowModal3 }) {
    const token = localStorage.getItem("token");
    const [selectedTheater, setSelectedTheater] = useState();
    const[movieId,setMovieId] = useState()
    const [selectedMovie, setSelectedMovie] = useState();
    const [seatNumber, setSeatNumber] = useState();

    const [category, setCategory] = useState();
    const [price, setPrice] = useState(0.0);
    const [alltheater, setAlltheater] = useState([]);
    const [allmovies, setAllMovies] = useState({});
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
    console.log('alltheater',alltheater);
    const handleMovieSelection = (value) => {
        setSelectedMovie(value);
    };
    const handleTheaterSelection=(value)=>{
        setSelectedTheater(value);
        console.log('value', value);
        const selectedTheater = alltheater.find((theater) => theater.id === parseInt(value));
        console.log('selected', selectedTheater)
    fetch(`http://127.0.0.1:8000/api/movie/${selectedTheater.movie}/`, {
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
            .then((data) => setAllMovies(data))
            .catch((error) => console.log(error));
    }
    console.log(allmovies)

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create your theaterData object with the values from state
        const theaterData = {
            theater: selectedTheater,  
            movie: selectedMovie,    
            seat_number: seatNumber,
            is_reserved: false,
            category: category,
            price: price
        };

        console.log(theaterData)

        fetch(`http://127.0.0.1:8000/api/seats/`, {
            method: "POST",
            body: JSON.stringify(theaterData),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    setSelectedMovie('');
                    setSelectedTheater('');
                    setSeatNumber('');
                    setPrice('');
                    setCategory('');
                    
                    
                } else if (res.status === 401) {
                    console.log("Unauthorized request");
                    navigate("/signin");
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
                        <h3>Add Seat To The Theater</h3>
                    </div>
                    <div>
                        <button onClick={() => setShowModal3(false)}>X</button>
                    </div>
                </div>
               
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
                            name="selectedMovie"
                            value={selectedMovie}
                            onChange={(e) => handleMovieSelection(e.target.value)}
                        >
                            <option value="">Select Movie</option>
                            <option key={allmovies.id} value={allmovies.id}>
                                    {allmovies.title}
                                </option>
                           
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
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    
                    
                    <div className="footer">
                        <button onClick={() => setShowModal3(false)} id="cancelBtn">
                            Cancel
                        </button>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SeatUpload;

