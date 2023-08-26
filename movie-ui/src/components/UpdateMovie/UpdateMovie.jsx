import React, { useState, useEffect } from "react";
import "./UpdateMovie.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
function UpdateMovie({ setShowModal6 }) {
    const token = localStorage.getItem('token')
    const [movie, setMovie] = useState({});
    const [allmovies, setAllMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/movies/all/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status !== 200) {
                    // Token expired, perform the redirect here
                    window.location.href = "/signin";
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => setAllMovies(data))
            .catch((error) => console.log(error));
    }, [token]);
    function handleSubmit() {
        console.log(movie);
        fetch(`http://127.0.0.1:8000/api/movies/del/${selectedMovie}/`, {
            method: "PUT",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            },

        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    document.getElementById("movie-form").reset();
                    alert("Successful Updated")
                    // navigate("/login");
                } else if (res.status === 400) {
                    console.log("Unauthorized request");
                    navigate("/signin");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(movie);
    }
    const handleMovieSelection = (value) => {
        setSelectedMovie(value);
    };
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Update Movie</h3>
                    </div>
                    <div>
                        <button onClick={() => { setShowModal6(false); }}>
                            X
                        </button>
                    </div>
                </div>
                <div className="searchOption">
                        <select
                            name="selectedMovie"
                            value={selectedMovie}
                            onChange={(e) => handleMovieSelection(e.target.value)}
                        >
                            <option value="">Select Movie</option>
                            {allmovies.map((allmovie) => (
                                <option key={allmovie.id} value={allmovie.id}>
                                    {allmovie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                <Formik
                    initialValues={{
                        title: '',
                        director: '',
                        genre: '',
                        language: '',
                        rating: '',
                        movie_length: '',
                        image: ''
                    }}
                    render={({ errors, status, touched }) => (

                        <Form id='movie-form'>
                            <div className="form-group">
                                <label htmlFor="image">Movie Poster Image Link</label>
                                <Field name="image" type="text" placeholder="Leave it Blank if not require" 
                                onInput={(e) => {
                                    movie.image = e.target.value;
                                    setMovie(movie)
                                }} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="image" component="div" className="invalid-feedback" />

                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Field name="title" type="text" placeholder="Leave it Blank if not require"
                                onInput={(e) => {
                                    movie.title = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="director" >Name of Director</label>
                                <Field name="director" type="text" placeholder="Leave it Blank if not require"
                                onInput={(e) => {
                                    movie.director = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Category</label>
                                <Field name="genre" type="text"placeholder="Leave it Blank if not require"
                                 onInput={(e) => {
                                    movie.genre = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="language">Language</label>
                                <Field name="language" type="text"placeholder="Leave it Blank if not require"
                                 onInput={(e) => {
                                    movie.language = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <Field name="rating" type="text"placeholder="Leave it Blank if not require"
                                    onInput={(e) => {
                                        movie.rating = e.target.value;
                                        setMovie(movie)
                                    }} className='form-control' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="movie_length">Movie Length in mins</label>
                                <Field name="movie_length" type="number" placeholder="Leave it Blank if not require"
                                onInput={(e) => {
                                    movie.movie_length = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />
                            </div>

                            <div className="footer">
                                <button
                                    onClick={() => {
                                        setShowModal6(false);
                                    }}
                                    id="cancelBtn"
                                >
                                    Cancel
                                </button>
                                {movie ?
                                    (<button type="submit" onClick={handleSubmit}>Continue</button>) : (<button type="submit" disabled>Continue</button>)}
                            </div>


                        </Form>

                    )}
                />
            </div>
        </div>
    );
}

export default UpdateMovie;