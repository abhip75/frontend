import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../store/authSlice";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";


const NavBar = () => {

    const dispatch = useDispatch();
    const navigate= useNavigate();
  

    const user = useSelector(state => state.auth.user); 
    console.log("User:", user);
    const username = user ? user.username : '';
   

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout Successful", {
            position: "bottom-right",
        });
        navigate('/')
      };

    
    return (

        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <div className="dropdown">
                            {username && (
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {username}
                            </Link>
                            )}
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/favourite">My Favorite</Link></li>
                                <li><Link className="dropdown-item" to="#">My WatchList</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </form>

                    </div>
                </div>
            </nav>
        </>
            
        
    )
}

export default NavBar;