import React from "react";
import {  useSelector } from 'react-redux';
import { Link} from "react-router-dom";
import '../App.css';
import NavBar from "./NavBar";


const Profile = () => {

    const user = useSelector(state => state.auth.user); 
    console.log("User:", user);
    const username = user ? user.username : '';
    const email = user ? user.email : '';
    const phone = user ? user.phone : '';

    return(
      <>
      <NavBar/>
      <section className="vh-100" style={{backgroundColor: "#f4f5f7;"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{borderRadius: ".5rem;"}}>
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom-5 text-center text-white"
                    style={{borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem;"}}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" className="img-fluid my-5" style={{width: "80px;"}} />
                    <h5>{username}</h5>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6> Profile Information</h6>
                      <hr className="mt-0 mb-4"/>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{phone}</p>
                        </div>
                      </div>
                      <Link to="/home" className="btn btn-dark">Back</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}

export default Profile;