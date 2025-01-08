import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from "./pages/HomePage";
// import GrainsPage from "./pages/GrainsPage";
// import FieldCropsPage from "./pages/FieldCropsPage";
// import DairyProductsPage from "./pages/DairyProductsPage";
// import ProductPage from "./pages/ProductPage";
// import LoginPage from "./pages/LogInPage";
// import SignUpPage from "./pages/SignUp";
// import Features from "./components/Features";
// import { LanguageProvider } from "./Context/LanguageContext";
// import AllProductsPage from "./pages/AllProductsPage";
import AdminLayout from "./Admin/adminLayout";


const App: React.FC = () => {
  return (
    // <LanguageProvider>
      // <Router>
      //   {/* <Header /> */}
      //     <Routes>
      //       <Route path="/" element={<HomePage />} />
      //       <Route path="/grains" element={<GrainsPage />} />
      //       <Route path="/field-crops" element={<FieldCropsPage />} />
      //       <Route path="/dairy-products" element={<DairyProductsPage />} />
      //       <Route path="/login" element={<LoginPage />} />
      //       <Route path="/signup" element={<SignUpPage />} />
      //       <Route path="/product/:id" element={<ProductPage />} />
      //       <Route path="/all-products" element={<AllProductsPage />} /> 
      //       <Route path="/admin" element={<AdminLayout/>} />
      //     </Routes>
      //   {/* <Features /> */}
      //   {/* <Footer /> */}
      // </Router>
      <AdminLayout/>
    // </LanguageProvider>
  );
};

export default App;
