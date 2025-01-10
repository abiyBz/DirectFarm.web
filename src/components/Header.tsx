import React, {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import MiniCart from "./MiniCart";
import { logout } from '../redux/authSlice';
import { loginSuccess } from "../redux/authSlice";
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

 useEffect(() => {
     const token = localStorage.getItem('authToken');
     if (token) {
       dispatch(loginSuccess(token)); // Update Redux state if token exists
        // Redirect if already logged in
       
     }
   });



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('authToken');
    
    // Dispatch logout action to Redux
    dispatch(logout());
    
    // Navigate to login page
    navigate("/"); // Adjust this path based on your routing structure
  };

  const handleButtonClick = () => {
    navigate('/login'); // Replace '/new-page' with your desired route
};
  

  return (
    <header className="shadow-md bg-white">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2 px-4 flex items-center justify-between">
      {!isLoggedIn && (
        <div>
            <span>
          {language === "en" 
            ? "Up to 20% Discount for new customers, " 
            : "ለአዳዲስ ደንበኞች እስከ 20% ቅናሽ  "}
        </span>
        <Link to="/signup" className="underline hover:text-yellow-300">
          {language === "en" 
            ? " Sign Up Now to Redeem!" 
            : "  ለመውሰድ አሁን ይመዝገቡ"}
        </Link>
        </div>
      )}
        
        <select
          className="bg-white text-black rounded-md px-2 py-1 border border-gray-300"
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "am")}
        >
          <option value="en">English</option>
          <option value="am">አማርኛ (Amharic)</option>
        </select>
      </div>

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between py-4 px-6 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="../logo-bg-removed.png" 
            alt="Logo" 
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-xl font-bold text-gray-800">DIRECT FARM</h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 items-center text-gray-700">
          <li>
            <Link 
              to="/" 
              className="hover:text-green-600 transition-colors"
            >
              {language === "en" ? "Home" : "መነሻ"}
            </Link>
          </li>
          <li>
            <Link 
              to="/all-products" 
              className="hover:text-green-600 transition-colors"
            >
              {language === "en" 
                ? "View All Products" 
                : "ሁሉንም ምርቶች ይመልከቱ"}
            </Link>
          </li>
          <li>
          {isLoggedIn ? (
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    {language === "en" ? "Log Out" : "ውጣ"}
                </button>
            ) : (
                <button 
                    onClick={handleButtonClick} 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    {language === "en" ? "Sign-In" : "ግባ/ተመዝገብ"}
                </button>
            )}
          </li>
          {isLoggedIn && (
        <div>
        <Link 
              to="/profilepage" 
              className="hover:text-green-600 transition-colors"
            >
              👤
            </Link>  
        
        </div>
      )}
          
        </ul>

        {/* Mobile Menu Icon */}
          <MiniCart />
          
      </nav>
    </header>
  );
};

export default Header;
