import Navbar from '../Navbar/Navbar';
import { MovieHeader } from "../MovieHeader/MovieHeader";
import "./MovieDetail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from '../StarRating/StarRating'
export function MovieDetail() {

    const [movie, setMovie] = useState([]);
    const [theater, setTheater] = useState([]);
    const [theaterAv, setTheaterAv] = useState(false);
    const { id } = useParams();
    // console.log(id)
    useEffect(() => {

        const getProduct = () => {

            fetch(`http://127.0.0.1:8000/api/movie/${id}`)
                .then(res => res.json())
                .then(json => {
                    setMovie(json);

                })

        }
        getProduct();

    }, []);
    useEffect(() => {
        const getTheater = () => {
            fetch(`http://127.0.0.1:8000/api/theater/${id}/`)
                .then(res => res.json())
                .then(json => {
                    if (json.length === 0) {
                        setTheaterAv(false);
                    } else {
                        setTheaterAv(true);
                        setTheater(json.theaters);
                    }
                })
                .catch(error => {
                    console.error("Error fetching theater data:", error);
                });
        }

        getTheater();
    }, []);
    console.log(theater)
    console.log(movie)
const formatDate=(dateString)=>{
    const option={year:"numeric",month:"long",day:"numeric"};
    // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return new Date(dateString).toLocaleDateString("en-US",option);
}
const formatTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
};

    return (
        <div>
            <Navbar />
            {/* <MovieHeader movie={movie} /> */}
            <div className="detailContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center',
                // Adjust the background position as needed
            }}>
                <div className="big-img">
                            <img src={movie.image} alt="" />
                        </div>
                <div className="detailsbox">
                    <div className="details" >
                        
                        {
                            theaterAv ? (
                                <>
                                 {theater
                                        &&
                                        theater.map((movietheater, index) => (
                                            <div className="box">
                                            <div className="row">
                                                <h2>Name : {movie.title}</h2>
                                                <h3>Screening: {movietheater.name}</h3>
                                                <span>Address: {movietheater.address}</span>
                                            </div>
                                            <div className='row'>
                                                <span>Show avilabe from: {formatDate(movietheater.movie_timing)}</span>
                                                <span>show Time: {formatTime(movietheater.movie_timing)}</span>
                                                {/* <span>Second Show: {theater.second_show}</span>
                                                <span>Third Show: {theater.third_show}</span> */}
    
                                            </div>
                                            <p>Language: {movie.language}</p>
                                            <p>Movie Duration: {movie.movie_length}</p>
                                            <p><StarRating rating={movie.rating} /></p>
                                            <p>Rating: {movie.rating}</p>
                                            <a href={`${movie.id}/bookticket`} className="btnBookTickets">Book Tickets</a>
                                            <Link to='/' class="btnBookTickets">Go Back or Reshedule</Link>
                                        </div>



                                        ))}
                                   
                                </>
                            )
                                : (<>
                                    <div className="box">
                                        <div className="row">
                                            <h2>Name : {movie.title}</h2>
                                            <h3>Theater information not available.</h3>
                                        </div>
                                        <p>Language: {movie.language}</p>
                                        <p>Movie Duration: {movie.movie_length}</p>
                                        <p><StarRating rating={movie.rating} /></p>
                                        <p>Rating: {movie.rating}</p>
                                        
                                        <Link to='/' class="btnBookTickets">Go Back or Reshedule</Link>
                                    </div>

                                </>
                                )
                        }


                    </div>
                </div>
            </div>

        </div>
    )
}