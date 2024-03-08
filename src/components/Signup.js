import React,{useState} from "react";
import { toast } from "react-toastify";
import { signupUser } from "../store/authSlice";
import {  useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';


const Signup = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(signupUser(formData));
            toast.success("Signup successful!");
            navigate("/"); 
        } catch (error) {
            toast.error("Signup failed. Please try again.");
        }
    };


    return(

        <>
              <section className="vh-100 bg-image">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handleSubmit}>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="username" name="username" className="form-control form-control-lg" placeholder="Username" value={formData.name} onChange={handleChange} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="email" name="email" className="form-control form-control-lg" placeholder="Email" value={formData.email} onChange={handleChange} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" name="password" className="form-control form-control-lg" placeholder="Password" value={formData.password} onChange={handleChange} />
                                            </div>


                                            <div className="form-outline mb-4">
                                                <input type="text" id="phone" name="phone" className="form-control form-control-lg" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                                            </div>


                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/"
                                                className="fw-bold text-body"><u>Login here</u></Link></p>

                                        </form>

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

export default Signup;