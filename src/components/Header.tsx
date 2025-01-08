import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useLanguage } from "../Context/LanguageContext";
import MiniCart from "./MiniCart";

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="top-bar">
        <span>{language === "en" ? "Up to 20% Discount for new customers" : "ለአዳዲስ ደንበኞች እስከ 20% ቅናሽ"}</span>
        <Link to="/signup" className="signup">
          {language === "en" ? "Sign Up Now to Redeem!" : "ለመውሰድ አሁን ይመዝገቡ"}
        </Link>
        <select
        className="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "am")}
      >
        <option value="en">English</option>
        <option value="am">አማርኛ (Amharic)</option>
      </select>
      </div>
      <nav className="navbar">
        <div className="logo">
            <img src="../logo-bg-removed.png" alt="Logo" className="logoo" />
            <h1 className="Title"> DIRECT FARM </h1>
        </div>
        <ul className='nav-list'>
          <li>
            <Link to="/">{language === "en" ? "Home" : "መነሻ"}</Link>
          </li>
          <li>
            <Link to="/all-products">{language === "en"
                  ? "View All Products"
                  : "ሁሉንም ምርቶች ይመልከቱ"}</Link>
          </li>
          <li>
            <button className='auth-button'>
              <Link to="/login">{language === "en" 
                  ? "Login/Sign-Up" : "ግባ/ተመዝገብ"}</Link>
            </button>
          </li>
        </ul>
        <MiniCart />
      </nav>
    </header>
  );
};

export default Header;