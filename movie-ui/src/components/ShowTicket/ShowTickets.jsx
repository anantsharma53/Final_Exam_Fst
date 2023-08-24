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

    }, [token]);
 
    return (
        <>
            <Navbar />
            <div className="homeContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center'  // Adjust the background position as needed
            }}>
                <div className="userprofile">
                    <Profile />
                </div>

                {loading ?
                    <Loader /> :
                    <div className="usertickets">

                        <div>
                            <table className=" table user-list tablecolour">
                                <thead>
                                    <tr>
                                        <th className="text-center">Tickets Reference No</th>
                                        <th className="text-center">Movie Details</th>
                                        <th className="text-center">Seat Details</th>
                                        <th className="text-center">Total Bill</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {data.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="text-center">{booking.id}</td>
                                            <td className="text-center">
                                                <span>
                                                    Movie Title: {booking.movie.title}<br />
                                                    Director: {booking.movie.director}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {booking.seats.map((seat, index) => (
                                                    <span key={index}>{seat.seat_number}<br /></span>
                                                ))}
                                            </td>
                                            <td className="text-center">Rs{booking.total_cost}/-</td>
                                            <td className="text-center">
                                                <button className="btn btn-primary">View Details</button>
                                                <button className="btn btn-primary">Print Tickets</button>
                                                <button className="btn btn-primary">Cancel Booking</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
export default ShowTicket;