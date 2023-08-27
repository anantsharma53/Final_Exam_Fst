import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import './ShowTicket.css'
import Profile from "../Profile/Profile";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
function ShowTicket() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const[deletes,setDeletes]=useState(0)
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/movies/seatbooking/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        })
            .then((response) => response.json())
            .then((data) => {
                // Update the state with the fetched data
                setData(data);
                // setMovie(data.movie)
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                navigate('/signin')
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            });

    }, [deletes]);
    function DeleteTicket(id) {
        
        console.log(id)
        fetch(`http://127.0.0.1:8000/api/movies/seatbooking/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => {
                
                if (response.status === 200) {
                    setDeletes(prevDeletes => prevDeletes + 1);
                    console.error('deleting done:', response.status);
                } else {
                    // Handle other response statuses here
                    console.error('Error deleting movie:', response.status);
                }
            })
            .catch(error => {
                console.error('Error deleting movie:', error);
            });
    }
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    }

    const formatTime = (dateTimeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    return (
        <>
           
                    

                    {loading ?
                        <Loader /> :
                        <>
                        
                        <div className="usertickets">
                            
                            <div class="row ">
                           
                                <div class="main-box clearfix ">
                                <div class="header3">
                                        Booking Details and Tickets
                                    </div>
                                    <div class="table-responsive">
                                    {/* <h2>Booking Details</h2> */}
                                        <table className=" table user-list tablecolour">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Tickets Reference No</th>
                                                    <th className="text-center">Movie Details</th>
                                                    <th className="text-center">Theater/Screen ID</th>
                                                    <th className="text-center">Seat Details</th>
                                                    <th className="text-center">Total Bill</th>
                                                    <th className="text-center">Booing Date And Time</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {data.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td className="text-center">{booking.id}</td>
                                                        <td className="text-center">
                                                            <span className="tktbox">
                                                                <p>Movie Title: {booking.movie.title}</p>
                                                                <p>Director: {booking.movie.director}</p>
                                                            </span>
                                                        </td>
                                                        <td className="text-center">
                                                        {booking.seats.map((seat, index) => (
                                                                <span>Screening ID-{seat.theater}<br></br></span>
                                                                ))}</td>
                                                        <td className="text-center">
                                                            {booking.seats.map((seat, index) => (
                                                                <span key={index}>{seat.seat_number}<br /></span>
                                                            ))}
                                                        </td>
                                                        <td className="text-center">Rs{booking.total_cost}/-</td>
                                                        <td className="text-center">{formatDate(booking.created_at)}</td>
                                                        <td className="tktbox">
                                                            <button type="button" class="btn btn-success">Print</button>
                                                            <button type="button" class="btn btn-danger" onClick={() => DeleteTicket(booking.id)}>Cancel</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    }
               
        </>
    );
}
export default ShowTicket;