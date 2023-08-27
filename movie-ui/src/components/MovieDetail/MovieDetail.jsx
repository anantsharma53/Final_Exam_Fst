import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from '../StarRating/StarRating';
import Navbar from '../Navbar/Navbar';
import "./MovieDetail.css";
import Loader from "../Loader/Loader";

export function MovieDetail() {
    const [movie, setMovie] = useState({});
    const [theater, setTheater] = useState([]);
    const [theatersAvailable, setTheatersAvailable] = useState(true);
    const { id } = useParams();
    console.log('id',id)
    useEffect(() => {
        const getProduct = () => {
            fetch(`http://127.0.0.1:8000/api/movie/${id}`)
                .then(res => res.json())
                .then(json => {
                    setMovie(json);
                })
                .catch(error => {
                    console.error("Error fetching movie data:", error);
                });
        }
        getProduct();
    }, [id]);
    console.log('movie',movie)
    useEffect(() => {
        console.log(movie.id)
        // Define the API URL
        const apiUrl = `http://127.0.0.1:8000/api/theater/details/${id}/`;
    
        // Fetch the data from the API
        fetch(apiUrl)
          .then((response) => {
            if (response.status === 404) {
              // Handle 404 response by updating the state
              setTheatersAvailable(false);
              return {}; // Return an empty object to prevent JSON parsing error
            }
            return response.json(); // Parse the JSON response
          })
          .then((data) => {
            if (theatersAvailable) {
              console.log(data);
              setTheater(data.theaters);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
          
      }, [id, theatersAvailable]);
console.log(theater)
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    }

    const formatTime = (dateTimeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    return (
        <div>
            <Navbar />
            <div className="detailContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height:'100%'
            }}>
                {
                    theater.length!==0 ? (
                        <>
                            {theater && theater.map((movietheater, index) => (
                                <div className="container my-0" key={index}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="big-img">
                                                <img src={movie.image} alt="" className="img-fluid rounded" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="detailsbox p-4">
                                                <div className="box mb-4 p-3 border rounded">
                                                    <h3>Name: {movie.title}</h3>
                                                    <p>Language: {movie.language}</p>
                                                    <p>Duration: {movie.movie_length} mins</p>
                                                    <p><StarRating rating={movie.rating} /></p>
                                                    <h3 className="mt-3">Theater Details</h3>
                                                    <p>Screening: {movietheater.name}</p>
                                                    <p>Address: {movietheater.address}</p>
                                                    <div className='row'>
                                                        <div className="col-md-6">
                                                            <p>Show available from: {formatDate(movietheater.movie_timing)}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p>Show Time: {formatTime(movietheater.movie_timing)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                    <a href={`${movietheater.id}/bookticket`} className="btn btn-secondary mt-3">Book Tickets</a>
                                                    <Link to='/' className="btn btn-secondary mt-3">Go Back or Reschedule</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                        {/* <Loader/> */}
                        <div className="container my-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="big-img">
                                        <img src={movie.image} alt="" className="img-fluid rounded" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="detailsbox p-4">
                                        <div className="box mb-4 p-3 border rounded">
                                            <h2 className="mb-3">Movie Details</h2>
                                            <h3>Name: {movie.title}</h3>
                                            <p>Language: {movie.language}</p>
                                            <p>Duration: {movie.movie_length} mins</p>
                                            <p><StarRating rating={movie.rating} /></p>
                                            <h3 className="mt-4">Theater Information</h3>
                                            <p>Theater information not available.</p>
                                            <Link to='/' className="btn btn-secondary mt-3">Go Back or Reschedule</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="blankbox">

                        </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
