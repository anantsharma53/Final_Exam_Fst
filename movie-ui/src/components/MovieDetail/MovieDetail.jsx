import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from '../StarRating/StarRating';
import Navbar from '../Navbar/Navbar';
import "./MovieDetail.css";
import Loader from "../Loader/Loader";
import Footer from "../Footer/Footer";

export function MovieDetail() {
    const [movie, setMovie] = useState({});
    const [theater, setTheater] = useState([]);
    const [theatersAvailable, setTheatersAvailable] = useState(true);
    const { id } = useParams();
    console.log('id', id)
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
    console.log('movie', movie)
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
                backgroundImage: 'url("https://i.pinimg.com/originals/be/65/5f/be655f0bfa4b853e0ac2482168715e55.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}>
                <div style={{
                    marginTop: '15px',
                    border: '0px solid #ddd', // Add a border for a clean look
                    //  backgroundColor: 'black',
                    borderRadius: '15px',
                    //  width:'100%'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div >
                            <img src={movie.image} alt="" className="img-fluid rounded" style={{ width: '400px', height: '500px' }} />
                        </div>
                        <div style={{ width: '50px' }}></div>
                        <div>
                            <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color:'white' }}>
                                Name: {movie.title}
                            </h3>
                            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' , color:'white'}}>
                                Language: {movie.language}
                            </p>
                            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' , color:'white'}}>
                                Duration: {movie.movie_length} mins
                            </p>
                            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' , color:'white'}}>
                                Rating: {movie.rating}
                            </p>
                            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' , color:'white'}}>
                                <StarRating rating={movie.rating} />
                            </p>
                        </div>

                    </div>
                    {/* <h3 className="mt-3">Theater Details</h3> */}

                </div>
                {
                    theater.length !== 0 ? (
                        <>
                            {theater && theater.map((movietheater, index) => (
                                <>
                                    <div
                                        style={{
                                            marginTop: '15px',
                                            border: '0px solid #ddd', // Add a border for a clean look
                                            backgroundColor: 'black',
                                            borderRadius: '15px',
                                            marginLeft: '20%',
                                            marginRight: '20%',
                                            opacity: '0.9',
                                            marginBottom: '30px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div>
                                                <p style={{ color: 'white', fontSize: '40px' }}>Screening: {movietheater.name}</p>
                                                <p style={{ color: 'white', fontSize: '20px' }}>Address: {movietheater.address}</p>
                                            </div>
                                            <div style={{ width: '50px' }}></div>
                                            <div>
                                                <p style={{ color: 'white', fontSize: '40px' }}>{formatDate(movietheater.movie_timing)}</p>
                                                <p style={{ color: 'white', fontSize: '20px' }}>Show Time: {formatTime(movietheater.movie_timing)}</p>
                                            </div>
                                            <div style={{ width: '50px' }}></div>
                                            <div>
                                                <div className="row">
                                                    <a href={`${movietheater.id}/bookticket`} className="btn btn-secondary ">Book Tickets</a>
                                                    <Link to='/' className="btn btn-secondary mt-3">Go Back or Reschedule</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            ))}
                             
                        </>
                    ) : (
                        <>
                           <div
                                        style={{
                                            marginTop: '15px',
                                            border: '0px solid #ddd', // Add a border for a clean look
                                            backgroundColor: 'black',
                                            borderRadius: '15px',
                                            marginLeft: '20%',
                                            marginRight: '20%',
                                            opacity: '0.9',
                                            marginBottom: '30px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div>
                                                <p style={{ color: 'white', fontSize: '40px' }}>Screening: Theater not Aviable </p>
                                                
                                            </div>
                                            <div style={{ width: '50px' }}></div>
                                            <div style={{ width: '50px' }}></div>
                                            <div>
                                                <div className="row">
                                                    
                                                    <Link to='/' className="btn btn-secondary mt-3">Go Back or Reschedule</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                            
                        </>
                    )
                }
            </div>
            <Footer/> 
        </div>
    );
}
