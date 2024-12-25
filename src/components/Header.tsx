import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useLanguage } from "../Context/LanguageContext";

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
      <div className="logo">
      <img src="../assets/farmer-with-hat-and-rake-logo-free-vector-removebg.png" alt="Logo" className="logoo" />
        <h1 className="Title"> DIRECT FARM </h1>
      </div>
      <nav className="navbar">
        <ul className='nav-list'>
          <li>
            <Link to="/">{language === "en" ? "Home" : "መነሻ"}</Link>
          </li>
          <li>
            <Link to="/grains">{language === "en" ? "Grains" : "ጥራጥሬ"}</Link>
          </li>
          <li>
            <Link to="/field-crops">{language === "en" ? "Vegetable" : "አትክልት"}</Link>
          </li>
          <li>
            <Link to="/dairy-products">{language === "en" ? "Fruits" : "ፍራፍሬ"}</Link>
          </li>
          <li>
            <Link to="/">{language === "en" ? "Coffee" : "ቡና"}</Link>
          </li>
          <li>
            <Link to="/grains">{language === "en" ? "Grains" : "ጥራጥሬ"}</Link>
          </li>
          <li>
            <Link to="/field-crops">{language === "en" ? "Field Crops" : "የእርሻ ሰብል"}</Link>
          </li>
          <li>
            <Link to="/dairy-products">{language === "en" ? "Dairy Products" : "የወተት ተዋጽኦዎች"}</Link>
          </li>
        </ul>
      </nav>
      
    </header>
  );
};

export default Header;
