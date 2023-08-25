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
                                    Screening :
                                    {theater.name}
                                </div>

                            </div>
                            <div className="right">
                                <div className="timeBox">
                                <p className="time">Realise Date: {formatDate(theater.movie_timing)}</p>
                                <p className="time">Show Time: {formatTime(theater.movie_timing)}</p>


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
                                <h2>Plan You Seats</h2>
                                <hr />
                            </p>
                            <SeatLayout theaterdetails={theater} />
                            <div style={{height:"30px"}}>
                           
                        </div>
                            
                        </div>
                        



                    </div>
                    

                </div>)
                : (<Loader/>)
            }

        </div>
    )
}
