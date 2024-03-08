import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../movieDetails.css";
import NavBar from "./NavBar";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/favouriteSlice'; 
import { selectFavorites } from '../store/favouriteSlice'; 

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const user = useSelector(state => state.auth.user);




  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  
  const isFavorite = favorites && Array.isArray(favorites) && favorites.some((fav) => fav.id === movie?.id);


  // Function to handle adding movie to favorites
  const handleAddToFavorites = () => {
    
    if (user) {
      dispatch(addToFavorites({
        userId: user.userId, 
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        movieRunTime: movie.runtime, 
        releaseDate: movie.release_date,
        tagLine: movie.tagline,
        overview: movie.overview 
      }));
      toast.success('Added to favorites');
    } else {
      
      toast.error('Please log in to add to favorites');
    }
  };

  // Function to handle removing movie from favorites
  const handleRemoveFromFavorites = () => {
    
    if (user) {
      dispatch(removeFromFavorites({
        userId: user.userId, 
        movieId: movie.id
      }));
      toast.success('Removed from favorites');
    } else {
      
      toast.error('Please log in to remove from favorites');
    }
  };
  return (
    <>
    <NavBar/>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Movie Details</h3>
            </div>
            <div className="card-body">
              {movie ? (
                <div className="movie-details-container">
                  <div className="image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                     {movie.id && ( 
                      <div className="heart-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to add in favorites" onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}>
                        <FaHeart color={isFavorite ? 'red' : 'gray'} />
                      </div>
                    )}
                  </div>
                  <div className="content-container">
                    <h2>{movie.title} ({(movie.release_date).substring(0,4)})</h2>
                    <i className="tagline text-muted">{movie.tagline}</i>
                    <p className="overview-text mt-2">{movie.overview}</p>
                    
                  </div>
                </div>
                ) : (
                  <p>Loading...</p>
                )}
            </div>
          </div>
        </div>
      </div>
  </div>
  </>
  );
};

export default MovieDetails;
