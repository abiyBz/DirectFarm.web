import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from '../../redux/authSlice';
import { logout } from '../../redux/authSlice';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  // Check local storage for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(loginSuccess(token)); // Update Redux state if token exists
      navigate("/"); // Redirect if already logged in
      
    }
  }, [dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5122/api/Customer/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.isFailed) {
        setError(data.message || "Login failed.");
        return;
      }

      localStorage.setItem('authToken', JSON.stringify(data)); // Store token
      dispatch(loginSuccess(data.data.accessToken)); // Update Redux state with token
      //alert(data.data.customer.email);
      navigate("/");

    } catch {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800">Log In</h1>
        <p className="mt-2 text-center text-gray-600">Welcome back! Log in to continue.</p>
        {error && (<p className="mt-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">{error}</p>)}

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
