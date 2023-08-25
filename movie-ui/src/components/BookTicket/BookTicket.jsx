import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import './BookTicket.css'
import SeatLayout from '../SeatLayout/SeatLayout';
import Loader from '../Loader/Loader';

export function BookTicket() {
    const { id } = useParams()
    console.log(id)
    const [theater, setCinemas] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/movies/theater/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setLoading(true)
                setCinemas(data)
                console.log(data)
            })
    }, [])

    console.log(theater)
    const formatTime = (dateTimeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    }; 
    const formatDate = (dateTimeString) => {
        const options = { day: 'numeric',year: 'numeric', month: 'long' };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };
    return (
        <div className="plan"
            style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center',  // Adjust the background position as needed
                height: '100vh'
            }}
        >
            <Navbar />
            {loading ?
                (<div className="container">
                    <div className="panel">

                        <div className="timings">
                            <div className="left">
                                <div className="name">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-heart"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                    </svg>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {theater.name}
                                </div>

                            </div>
                            <div className="right">
                                <div className="timeBox">
                                <p className="time">Start Date: {formatDate(theater.movie_timing)}</p>
                                        <p className="time">Show Time: {formatTime(theater.movie_timing)}</p>

                                    {/* <Link
                                        className="link"
                                        to={'/movie/seatPlan/' + theater.id}
                                    >
                                        <p className="time">Start Date: {formatDate(theater.movie_timing)}</p>
                                        <p className="time">Show Time: {formatTime(theater.movie_timing)}</p>
                                    </Link> */}

                                </div>
                            </div>
                        </div>


                        <div className="seatPlan">
                            <p className="screenHeader">
                                <hr className="topLine" />
                                <h2>SCREEN</h2>
                                <hr />
                            </p>
                            <img
                                width="50%"
                                src="http://pixner.net/boleto/demo/assets/images/movie/screen-thumb.png"
                            ></img>
                            <p className="silverPlus">
                                <hr className="topLine" />
                                <h4>SLIVER PLUS</h4>
                                <hr />
                            </p>
                            <SeatLayout theaterdetails={theater} />
                            {/* <SeatLayout />

                        <BookingSummary /> */}
                        </div>



                    </div>
                    

                </div>)
                : (<Loader/>)
            }

        </div>
    )
}
