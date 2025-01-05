import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage/HomePage";
import GrainsPage from "../pages/GrainsPage/GrainsPage";
import "./MainLayout.css";
import FieldCropsPage from "../pages/FieldCropsPage/FieldCropsPage";
import DairyProductsPage from "../pages/DairyProductsPage/DairyProductsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import LoginPage from "../pages/LoginPage/LogInPage";
import SignUpPage from "../pages/SignUp/SignUp";
import Features from "../components/Features";
import { LanguageProvider } from "../Context/LanguageContext";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";

const MainLayout: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grains" element={<GrainsPage />} />
          <Route path="/field-crops" element={<FieldCropsPage />} />
          <Route path="/dairy-products" element={<DairyProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/all-products" element={<AllProductsPage />} />
        </Routes>
        <Features />
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default MainLayout;
