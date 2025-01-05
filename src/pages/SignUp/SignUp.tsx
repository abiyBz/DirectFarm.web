import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../redux/authSlice'; // Adjust import based on your project structure

const SignUpPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check for password confirmation mismatch in real-time
    if (name === "password" || name === "confirmPassword") {
      if (value !== confirmPassword && name === "password") {
        setError("Passwords do not match.");
      } else if (value !== formData.password && name === "confirmPassword") {
        setError("Passwords do not match.");
      } else {
        setError(null); // Clear error if passwords match
      }
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Check for password confirmation mismatch in real-time
    if (value !== formData.password) {
      setError("Passwords do not match.");
    } else {
      setError(null); // Clear error if passwords match
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final check before submission
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5122/api/Customer/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.isFailed) {
        setError(data.message || "Sign-up failed.");
        return;
      }

      // Assuming the API returns a token on successful registration
      localStorage.setItem('authToken', JSON.stringify(data)); // Store token
      dispatch(loginSuccess(data.token)); // Update Redux state with token
      
      navigate("/");

    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <p className="mt-2 text-center text-gray-600">Create your account to get started!</p>
        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-blue-500 hover:underline"> Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
