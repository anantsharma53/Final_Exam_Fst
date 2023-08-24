

import "./MovieHeder.css"
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import StarRating from '../StarRating/StarRating'
export function MovieHeader({ movie }) {
    console.log(movie);

    return (
        <div className="detailContainer" style={{
            backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',  // Adjust the background size as needed
            backgroundPosition: 'center',
            // Adjust the background position as needed
        }}>
            <div className="detailsbox">
            <div className="details" >
              <div className="big-img">
                <img src={movie.image} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>Name : {movie.title}</h2>
                  <span>Id: {movie.id}</span>
                </div>
                <p>Language: {movie.language}</p>
                <p>Movie Duration: {movie.movie_length}</p>
                <p><StarRating rating={movie.rating} /></p>
                <p>Rating: {movie.rating}</p>
                <a href={`${movie.id}/ticketPlan`} class="btnBookTickets">Book Tickets</a>
              </div>
            </div> 
      </div>
        </div>
    );
}

