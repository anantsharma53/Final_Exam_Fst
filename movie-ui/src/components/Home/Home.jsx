
import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import SearchPanel from '../SearchPannel/SearchPannel';
import MovieCard from '../MovieCard/MovieCard'
// import { Banner } from "../Banner/Banner";
// import { MovieCard } from "../MovieCard/MovieCard";
// import { SearchPanel } from "../SearchPanel/SearchPanel";
import 'bootstrap/dist/js/bootstrap.min.js';

import { Link } from "react-router-dom";

import './Home.css'
import Footer from "../Footer/Footer";
export function Home() {

  const [movies, setMovies] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('');



  useEffect(() => {
    const baseUrl = 'http://127.0.0.1:8000/api/movies/all/';
    const queryParams = {
      genre: searchGenre,
      language: searchLanguage,
      title: searchName,

    };

    // Construct the URL with query parameters only if they are provided
    const url = new URL(baseUrl);
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

    // Make the API request using fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [searchName, searchGenre, searchLanguage]);

  const handleGenreChange = (value) => {
    setSearchGenre(value)
  }
  const handleLanguageChange = (value) => {
    setSearchLanguage(value)
  }
  const handleNameChange = (value) => {
    setSearchName(value)

  }


  console.log(searchName)
  return (
    <>
      <Navbar />
      <div className="homeContainer" style={{
        backgroundImage: 'url("https://i.pinimg.com/originals/be/65/5f/be655f0bfa4b853e0ac2482168715e55.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',  // Adjust the background size as needed
        backgroundPosition: 'center',
        height: '100%'  // Adjust the background position as needed
      }}>
        
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            {movies.map((movie, index) => (
              <li
                key={index}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={index === 0 ? 'active' : ''}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
          <p className="header1">
                    
                </p>
            {movies.map((movie, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                
                <img className="d-block w-100" src={movie.image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '600px', borderRadius: '10px' }} />
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>


        {/* <div className="banner">
          <h1 className="header1">
            GET <span className="header2">MOVIE</span> TICKETS</h1>
       
        </div> */}
        {<SearchPanel
          onNameChange={handleNameChange}
          onLanguageChange={handleLanguageChange}
          onGenreChange={handleGenreChange}


        />}
        <div className="row" style={{margin:'0px'}}>
          {
            movies.map(m =>
              <div key={m.id} className="col-md-3">
                {console.log(m.id)}
                <Link to={`movie/${m.id}`}>
                  <MovieCard key={m.id} movie={m} />
                </Link>
              </div>
            )
          }
        </div>
        
      </div>
      <Footer/>
    </>


  );
}
export default Home
