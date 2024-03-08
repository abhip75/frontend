import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../store/authSlice';
import { Link } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(loginUser(formData))
      .then((result) => {
       
        if (result.payload) {
          
          toast.success("Login Successful", {
            position: "bottom-left",
        });
          navigate('/home');
        } else {
          
          
          const errorMessage = result.error.message;
          if (errorMessage === 'Invalid password') {
            toast.error('Wrong password');
          } else if (errorMessage === 'User not found') {
            toast.error('Wrong email');
          } else {
            toast.error('Login failed');
          }
        }
      });
  };
  
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input type="email" id="email" name="email" className="form-control form-control-lg" value={formData.email} onChange={handleChange} required placeholder='Email'/>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="password" name="password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} required placeholder='Password'/>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  </form>
                </div>
                <div>
                  <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
