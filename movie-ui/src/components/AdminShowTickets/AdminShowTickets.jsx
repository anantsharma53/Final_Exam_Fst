import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import './AdminShowTickets.css'
import Profile from "../Profile/Profile";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
function AdminShowTicket() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user_details'));
    const isSuperUser = user && user.is_superuser;
    const token = localStorage.getItem('token')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const[deletes,setDeletes]=useState(0)
    const [data, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    function bookingList(pageNumber) {
        const user = JSON.parse(localStorage.getItem('user_details'));
        const isSuperUser = user && user.is_superuser;
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`http://127.0.0.1:8000/api/movies/allseatbooking/?page=${pageNumber}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                }

            )
                .then((res) => res.json())
                .then((jsonResponse) => {
                    const resultsArray = jsonResponse.results;
                    setLoading(false)
                    console.log(resultsArray)
                    setMovie(resultsArray);
                    const numPages = jsonResponse.num_pages;
                    setTotalPages(numPages);

                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                    navigate('/signin')
                });
        }
        else {
            navigate('/signin')
        }

    }
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        localStorage.setItem("currentPage", pageNumber);
    }
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        setCurrentPage(storedPage ? parseInt(storedPage) : 1);
        bookingList(currentPage);
    }, [currentPage, deletes,]);  
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
                    bookingList(currentPage);
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
                                
                                    <div class="table-responsive">
                                    {/* <h2>Booking Details</h2> */}
                                        <table className=" table user-list tablecolour">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Tickets Reference No</th>
                                                    <th className="text-center">User ID</th>
                                                    <th className="text-center">Movie Details</th>
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
                                                        <td className="text-center">{booking.user}</td>
                                                        <td className="text-center">
                                                            <span className="tktbox">
                                                                <p>Movie Title: {booking.movie.title}</p>
                                                                <p>Director: {booking.movie.director}</p>
                                                            </span>
                                                        </td>
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
                                        <div class="pagination-container">
                                                        <ul class="pagination ">
                                                            <li class="page-item ">
                                                                {
                                                                    currentPage > 1 ? <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                                    >
                                                                        Previous
                                                                    </button> :
                                                                        <button
                                                                            className="page-link disabled"

                                                                        >
                                                                            Previous
                                                                        </button>
                                                                }
                                                            </li>
                                                            {/* <li><a href="#"><i class="fa fa-chevron-left"></i></a></li> */}
                                                            {Array.from({ length: totalPages }, (_, index) => (
                                                                <li class="page-item"
                                                                    key={index + 1}
                                                                    onClick={() => handlePageChange(index + 1)}
                                                                    disabled={currentPage === index + 1}
                                                                >
                                                                    <button class="page-link">{index + 1}</button>
                                                                </li>
                                                            ))}
                                                            <li class="page-item ">
                                                                {
                                                                    currentPage < totalPages ? <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                                    >
                                                                        Next
                                                                    </button> :
                                                                        <button className="page-link disabled" >
                                                                            Next
                                                                        </button>
                                                                }
                                                            </li>

                                                        </ul>
                                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    }
               
        </>
    );
}
export default AdminShowTicket