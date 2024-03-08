
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { removeFromFavorites, fetchFavorites } from "../store/favouriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import "../favoriteDetails.css";
import { toast } from "react-toastify";

const Favourite = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies.favorites);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]);

  

  const handleRemoveFromFavorites = (movieId) => {
    if (user && user._id) {
      
      dispatch(removeFromFavorites({ userId: user._id, movieId }));
      toast.success('Removed from favorites');
    } else {
        toast.error('Please log in to remove from favorites');
    }
  };

  if (!Array.isArray(favorites)) {
    return <div>Loading...</div>;
  } 

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>My Favourites</h3>
              </div>
              <div className="card-body">
                {Array.isArray(favorites) && favorites.length === 0 ? (
                  <h3 className="text-center">No favourites added</h3>
                ) : (
                  <div className="favorite-container">
                    {favorites.map((movie) => (
                      <div key={movie.id} className="favorite-item">
                        <div className="fav-image-container">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                            alt={movie.title}
                            className="favorite-image "
                          />
                        </div>
                        <div className="text-container">
                          <h2>{movie.title} {movie.release_date ? `(${movie.release_date.substring(0,4)})` : ''}</h2>
                          <i className="tagline text-muted">{movie.tagline}</i>
                          <p className="overview-text mt-2">{movie.overview}</p>
                        </div>
                        <div className="trash-icon" onClick={() => handleRemoveFromFavorites(user._id, movie.movieId)}>
                          <FaTrash />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
