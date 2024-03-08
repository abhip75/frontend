
import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import TrendingPage from "./TrendingPage";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.REACT_APP_API_KEY}`
            );
            const movie = response.data.results[0]; 
            if (movie) {
                navigate(`/moviedetails/${movie.id}`); 
            } else {
                console.log("No movie found");
            }
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return(
        <>
            <NavBar/>

            <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                <div className="d-flex align-items-center">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search Movies.." 
                                value={searchQuery} 
                                onChange={handleChange} 
                            />
                            <button 
                                className="btn btn-outline-success" 
                                type="button" 
                                onClick={handleSearch}
                            >
                                <FaSearch />
                            </button>
                        </div>
                </div>
            </div>

            <div className="row mt-5">
                <TrendingPage />
            </div>
            </div>
        </>
    )
}

export default Home;