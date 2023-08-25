import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from '../StarRating/StarRating';
import Navbar from '../Navbar/Navbar';
import "./MovieDetail.css";
import Loader from "../Loader/Loader";

export function MovieDetail() {
    const [movie, setMovie] = useState({});
    const [theater, setTheater] = useState([]);
    const [theaterAviable, setTheaterAv] = useState(false);
    const { id } = useParams();

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

    useEffect(() => {
        const getTheater = () => {
            fetch(`http://127.0.0.1:8000/api/theater/details/${id}/`)
                .then(res => {
                    if (res.status === 404) {
                        setTheaterAv(false);
                        return null;
                    }
                    return res.json();
                })
                .then(json => {
                    if (json !== null && json.length === 0) {
                        setTheaterAv(false);
                    } else {
                        setTheaterAv(true);
                        setTheater(json.theaters);
                    }
                })
                .catch(error => {
                    console.error("Error fetching theater data:", error);
                    setTheaterAv(false);
                });
        }
        getTheater();
    }, [id]);

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
            }}>
                {
                    theaterAviable ? (
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
                        </div></>
                    )
                }
            </div>
        </div>
    );
}
// import Navbar from '../Navbar/Navbar';
// import { MovieHeader } from "../MovieHeader/MovieHeader";
// import "./MovieDetail.css";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import StarRating from '../StarRating/StarRating'
// export function MovieDetail() {

//     const [movie, setMovie] = useState([]);
//     const [theater, setTheater] = useState([]);
//     const [theaterAv, setTheaterAv] = useState(false);
//     const { id } = useParams();
//     // console.log(id)
//     useEffect(() => {

//         const getProduct = () => {

//             fetch(`http://127.0.0.1:8000/api/movie/${id}`)
//                 .then(res => res.json())
//                 .then(json => {
//                     setMovie(json);

//                 })

//         }
//         getProduct();

//     }, []);
//     useEffect(() => {
//         const getTheater = () => {
//             fetch(`http://127.0.0.1:8000/api/theater/${id}/`)
//                 .then(res => res.json())
//                 .then(json => {
//                     if (json.length === 0) {
//                         setTheaterAv(false);
//                     } else {
//                         setTheaterAv(true);
//                         setTheater(json.theaters);
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error fetching theater data:", error);
//                 });
//         }

//         getTheater();
//     }, []);
//     console.log(theater)
//     console.log(movie)
// const formatDate=(dateString)=>{
//     const option={year:"numeric",month:"long",day:"numeric"};
//     // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
//     return new Date(dateString).toLocaleDateString("en-US",option);
// }
// const formatTime = (dateTimeString) => {
//     const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
//     return new Date(dateTimeString).toLocaleString('en-US', options);
// };

//     return (
//         <div>
//             <Navbar />
//             {/* <MovieHeader movie={movie} /> */}
//             <div className="detailContainer" style={{
//                 backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundSize: 'cover',  // Adjust the background size as needed
//                 backgroundPosition: 'center',
//                 // Adjust the background position as needed
//             }}>
//                 <div className="big-img">
//                             <img src={movie.image} alt="" />
//                         </div>
//                 <div className="detailsbox">
//                     <div className="details" >
                        
//                         {
//                             theaterAv ? (
//                                 <>
//                                  {theater
//                                         &&
//                                         theater.map((movietheater, index) => (
//                                             <div className="box">
//                                             <div className="row">
//                                                 <h2>Name : {movie.title}</h2>
//                                                 <h3>Screening: {movietheater.name}</h3>
//                                                 <span>Address: {movietheater.address}</span>
//                                             </div>
//                                             <div className='row'>
//                                                 <span>Show avilabe from: {formatDate(movietheater.movie_timing)}</span>
//                                                 <span>show Time: {formatTime(movietheater.movie_timing)}</span>
                                                
    
//                                             </div>
//                                             <p>Language: {movie.language}</p>
//                                             <p>Movie Duration: {movie.movie_length}</p>
//                                             <p><StarRating rating={movie.rating} /></p>
//                                             <p>Rating: {movie.rating}</p>
//                                             <a href={`${movietheater.id}/bookticket`} className="btnBookTickets">Book Tickets</a>
//                                             <Link to='/' class="btnBookTickets">Go Back or Reshedule</Link>
//                                         </div>



//                                         ))}
                                   
//                                 </>
//                             )
//                                 : (<>
//                                     <div className="box">
//                                         <div className="row">
//                                             <h2>Name : {movie.title}</h2>
//                                             <h3>Theater information not available.</h3>
//                                         </div>
//                                         <p>Language: {movie.language}</p>
//                                         <p>Movie Duration: {movie.movie_length}</p>
//                                         <p><StarRating rating={movie.rating} /></p>
//                                         <p>Rating: {movie.rating}</p>
                                        
//                                         <Link to='/' class="btnBookTickets">Go Back or Reshedule</Link>
//                                     </div>

//                                 </>
//                                 )
//                         }


//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }