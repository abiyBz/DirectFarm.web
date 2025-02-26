import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice"; // Adjust import based on your project structure

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

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
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateName = (name: string) => {
    if (!/^[a-zA-Z ]*$/.test(name)) {
      return "Only alphabets are allowed.";
    }
    if (name.trim().length < 2) {
      return "Minimum 2 characters required.";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "Invalid email format.";
    }
    return "";
  };

  const validatePhone = (phone: string) => {
    // Remove leading +251 if present and convert to local format starting with 0
    const cleanedPhone = phone
      .replace(/^\+251/, "0")
      .replace(/[\s\-\(\)]/g, "");

    // Validate Ethiopian phone number format
    if (!/^(09[1-9]\d{7})$/.test(cleanedPhone)) {
      return "Invalid Ethiopian phone number format.";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFormErrors({ ...formErrors, firstName: validateName(value) });
        break;
      case "lastName":
        setFormErrors({ ...formErrors, lastName: validateName(value) });
        break;
      case "email":
        setFormErrors({ ...formErrors, email: validateEmail(value) });
        break;
      case "phone":
        setFormErrors({ ...formErrors, phone: validatePhone(value) });
        break;
      case "password":
        setFormErrors({ ...formErrors, password: validatePassword(value) });
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });

    // Check for password confirmation mismatch in real-time
    if (name === "password") {
      if (value !== confirmPassword) {
        setError("Passwords do not match.");
      } else {
        setError(null); // Clear error if passwords match
      }
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    // Final validation check before submission
    const errors = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
    };

    if (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.phone ||
      errors.password ||
      formData.password !== confirmPassword
    ) {
      setFormErrors({
        firstName: errors.firstName,
        lastName: errors.lastName,
        email: errors.email,
        phone: errors.phone,
        address: "", // Keep address empty if not validated
        password: errors.password,
      });
      setError("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5122/api/Customer/Register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.isFailed) {
        if (data.message.includes("StatusCode: 409")) {
          setError("Email already in use!");
        } else {
          setError(data.message || "Sign-up failed.");
          return;
        }
      }

      if (!data.isFailed) {
        sessionStorage.setItem("authToken", JSON.stringify(data)); // Store token
        dispatch(loginSuccess(data.token)); // Update Redux state with token

        navigate("/");
      }
      // Assuming the API returns a token on successful registration
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
              <p className="mt-2 text-center text-gray-600">
                Create your account to get started!
              </p>

              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-lg">
                  {error && (
                    <p className="mt-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
                      {error}
                    </p>
                  )}
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="mt-2 text-sm text-red-600">
                        {formErrors.firstName}
                      </p>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="mt-2 text-sm text-red-600">
                        {formErrors.lastName}
                      </p>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {formErrors.email}
                      </p>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      name="phone"
                      placeholder="+251 XXX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-2 text-sm text-red-600">
                        {formErrors.phone}
                      </p>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="password"
                      placeholder="Password (8+ characters, uppercase, lowercase, number, symbol)"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {formErrors.password}
                      </p>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25 21 12m0 0 -3.75 3.75M21 12H3"
                        />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                      {" "}
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
