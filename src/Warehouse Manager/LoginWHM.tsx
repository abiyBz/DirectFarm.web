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