import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Dashboard.css'
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MovieUpload from "../MovieUpload/MovieUpload";
import TheaterUpdate from '../TheaterUpdate/TheaterUpdate';
import MovieThUpload from "../THEMovie/THEMovie";
import Home from "../Home/Home";
import ShowTicket from "../ShowTicket/ShowTickets";
import Profile from "../Profile/Profile";
import SeatUpload from "../SeatUpload/THEMovie/SeatUpload";
import UpdateSeat from "../UpdateSeat/UpdateSeat";
import UpdateMovie from "../UpdateMovie/UpdateMovie";
import AdminShowTicket from "../AdminShowTickets/AdminShowTickets";
import { Signin } from "../SIgnIn/SignIn";

function Dashboard() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user_details'));
    const isSuperUser = user && user.is_superuser;
    const token = localStorage.getItem('token')
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [deletes, setDeletes] = useState(0);

    function movieList(pageNumber) {
        const user = JSON.parse(localStorage.getItem('user_details'));
        const isSuperUser = user && user.is_superuser;
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`http://127.0.0.1:8000/api/movies/list?page=${pageNumber}`,
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
                    console.log(resultsArray)
                    setMovie(resultsArray);
                    const numPages = jsonResponse.num_pages;
                    setTotalPages(numPages);
                    // const resultsArray = jsonResponse.results.results;
                    // setUsers(resultsArray);
                    // const numPages = jsonResponse.results.num_pages;
                    // setTotalPages(numPages);
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
    function DeleteMovie(id) {
        fetch(`http://127.0.0.1:8000/api/movies/del/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.status === 204) {
                    setDeletes(prevDeletes => prevDeletes + 1);
                    movieList(currentPage);
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



    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        localStorage.setItem("currentPage", pageNumber);
    }
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        setCurrentPage(storedPage ? parseInt(storedPage) : 1);
        movieList(currentPage);
    }, [currentPage, deletes, showModal6]);

    console.log(movie);

    const openModal = () => {
        setShowModal(true);
    };
    const openModal2 = () => {
        setShowModal2(true);
    };
    const openModal3 = () => {
        setShowModal3(true);
    };
    const openModal4 = () => {
        setShowModal4(true);
    };
    const openModal5 = () => {
        setShowModal5(true);
    };
    const openModal6 = () => {
        setShowModal6(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };


    return (
        <>

            {isSuperUser && token? (
                <div>
                    <Navbar />

                    <div className="dashboardContainerss">
                        <div className="buttonContainer">
                            <button type="button" className="openModalBtn" onClick={openModal}>
                                Upload Movie
                            </button>
                            <button type="button" className="openModalBtn" onClick={openModal6}>
                                Update Movie
                            </button>
                            <button type="button" className="openModalBtn" onClick={openModal2}>
                                Add Theater to Movie
                            </button>
                            <button type="button" className="openModalBtn" onClick={openModal4}>
                                Update Theater Details
                            </button>
                            <button type="button" className="openModalBtn" onClick={openModal3}>
                                Add Seats to the Theater
                            </button>
                            <button type="button" className="openModalBtn" onClick={openModal5}>
                                Update Seat Status
                            </button>

                        </div>
                        <div className="main">
                            <Profile />
                            <div class="">
                                {isSuperUser &&
                                    (<div >
                                        <div class="row ">
                                            <div class="main-box clearfix ">
                                                <div class="table-responsive">
                                                    <div class="header1">
                                                        Movies Details
                                                    </div>
                                                    <table class="table user-list tablecolour">
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center"><span>Sl No</span></th>
                                                                <th class="text-center"><span>ID </span></th>
                                                                <th class="text-center"><span>Name</span></th>
                                                                <th class="text-center"><span>Director</span></th>
                                                                <th class="text-center"><span>Category(genre)</span></th>
                                                                <th class="text-center"><span>Language</span></th>
                                                                <th class="text-center"><span>Rating</span></th>
                                                                <th class="text-center"><span>Duration in mins</span></th>
                                                                <th class="text-center"><span>Poster</span></th>
                                                                <th class="text-center"><span>Actions</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {movie
                                                                &&
                                                                movie.map((movies, index) => (

                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{movies.id}</td>
                                                                        <td>{movies.title}</td>
                                                                        <td>{movies.director}</td>
                                                                        <td>{movies.genre}</td>
                                                                        <td>{movies.language}</td>
                                                                        <td>{movies.rating}</td>
                                                                        <td>{movies.movie_length}</td>
                                                                        <td>
                                                                            <img src={movies.image} alt="" />

                                                                        </td>

                                                                        <a href="#" class="table-link" onClick={() => DeleteMovie(movies.id)}>
                                                                            <span class="fa-stack">
                                                                                <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                                                                                    style={{ width: '50px', height: '50px' }} />
                                                                            </span>
                                                                        </a>
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
                                                <div class="header3">
                                        All Booking Details
                                    </div>
                                    <AdminShowTicket />
                                            </div>

                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>

                        {showModal && <MovieUpload setShowModal={setShowModal} />}
                        {showModal2 && <MovieThUpload setShowModal2={setShowModal2} />}
                        {showModal3 && <SeatUpload setShowModal3={setShowModal3} />}
                        {showModal4 && <TheaterUpdate setShowModal4={setShowModal4} />}
                        {showModal5 && <UpdateSeat setShowModal5={setShowModal5} />}
                        {showModal6 && <UpdateMovie setShowModal6={setShowModal6} />}
                
                        <div className="main">
                            <div className="profileBoxadmin">
                            </div>
                            

                        </div>
                        {/* <img src="https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg" /> */}
                    </div>

                </div>) :
                
                (
                <>
                {token?(
                    <>
                    <Navbar />
                    <div className="dashboardContainerss" >
                        <div className="main1">
                            <Profile />
                            <ShowTicket />
                        </div>
                    </div>
                    </>
                ):(
                    <Signin/>
                )}
                
                </>

                )
            }


        </>

    );
}
export default Dashboard;