/*import React, { useState } from "react";
import "./adminpage.css";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Login Successful!");
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h1>Log In</h1>
        <p>Welcome back! Log in to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
*/




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './adminpage.css';


const LogInPage: React.FC = () => {

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label> Email</label>
            <input type="email" placeholder= "Enter your email" required />
          </div>
          <div className="input-group">
            <label> Password </label>
            <input type="password" placeholder= "Enter your password"  required />
          </div>
          <button type="submit" className="auth-btn"> Login </button>
        </form>
        
      </div>
    </div>
  );
};

export default LogInPage;