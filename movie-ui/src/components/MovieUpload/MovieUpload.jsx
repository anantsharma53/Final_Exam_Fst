import React from "react";
import "./MovieUpload.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function MovieUpload({ setShowModal }) {
    const token = localStorage.getItem('token')
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();
    function handleSubmit() {
        console.log(movie);
        fetch("http://127.0.0.1:8000/api/movies/", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            },

        })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    document.getElementById("movie-form").reset();
                    alert("Successful Uploaded")
                    // navigate("/login");
                } else if (res.status === 401) {
                    console.log("Unauthorized request");
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(movie);
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Upload Movie</h3>
                    </div>
                    <div>
                        <button onClick={() => { setShowModal(false); }}>
                            X
                        </button>
                    </div>
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
                    // onSubmit={fields => {
                    //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    // }}
                    render={({ errors, status, touched }) => (

                        <Form id='movie-form'>
                            <div className="form-group">
                                <label htmlFor="image">Movie Poster Image Link</label>
                                <Field name="image" type="text" onInput={(e) => {
                                    movie.image = e.target.value;
                                    setMovie(movie)
                                }} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="image" component="div" className="invalid-feedback" />

                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Field name="title" type="text" onInput={(e) => {
                                    movie.title = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="director" >Name of Director</label>
                                <Field name="director" type="text" onInput={(e) => {
                                    movie.director = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Category</label>
                                <Field name="genre" type="text" onInput={(e) => {
                                    movie.genre = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="language">Language</label>
                                <Field name="language" type="text" onInput={(e) => {
                                    movie.language = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />

                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <Field name="rating" type="text"
                                    onInput={(e) => {
                                        movie.rating = e.target.value;
                                        setMovie(movie)
                                    }} className='form-control' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="movie_length">Movie Length in mins</label>
                                <Field name="movie_length" type="number" onInput={(e) => {
                                    movie.movie_length = e.target.value;
                                    setMovie(movie)
                                }} className='form-control' />
                            </div>

                            <div className="footer">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
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

export default MovieUpload;