
import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import SearchPanel from '../SearchPannel/SearchPannel';
import MovieCard from '../MovieCard/MovieCard'
// import { Banner } from "../Banner/Banner";
// import { MovieCard } from "../MovieCard/MovieCard";
// import { SearchPanel } from "../SearchPanel/SearchPanel";
import { Link } from "react-router-dom";

import './Home.css'
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
          title:searchName,
          
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
      
      const handleGenreChange=(value)=>{
        setSearchGenre(value)
      } 
      const handleLanguageChange=(value)=>{
        setSearchLanguage(value)
      } 
      const handleNameChange=(value)=>{
        setSearchName(value)
        
      } 

    
      console.log(searchName)
    return (
        <>
          <Navbar />
            <div className="homeContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center'  // Adjust the background position as needed
            }}>

                <div className="banner">
                    <h1 className="header1">
                        GET <span className="header2">MOVIE</span> TICKETS</h1>
                    <p>
                        Buy movie tickets in advance, find movie times watch trailers,
                    </p>
                    <p>
                        read movie reviews and much more
                    </p>
                </div>
                {<SearchPanel
                    onNameChange={handleNameChange}
                    onLanguageChange={handleLanguageChange}
                    onGenreChange={handleGenreChange}
                

                />}
                <div className="row">
                {
                    movies.map(m=>
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
        </>


    );
}
export default Home
