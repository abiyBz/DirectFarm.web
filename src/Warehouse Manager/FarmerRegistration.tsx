import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const FarmerRegistration: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("managerLoggedIn");
    if (!loginStatus) {
      navigate("/WarehouseLogin"); // Redirect if already logged in
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "active", // Default status is 'active'
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = { name: "", phone: "", location: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      isValid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final check before submission
    if (!validateForm()) {
      setError("Fill in the fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5122/api/Farmer/SaveFarmer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.isFailed) {
        setError(data.message || "Registration failed.");
        alert(error);
        return;
      }

      alert("Farmer Registered");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Farmer Registration
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email (optional) */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Email (optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 shadow-md transform hover:-translate-y-px"
          >
            Register Farmer
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerRegistration;
