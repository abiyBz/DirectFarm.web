import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Admin/adminLayout";
import MainLayout from "./Layout/MainLayout";

const App: React.FC = () => {
  return (
    <Router> 
      {/* The Router is only placed here */}
      <Routes>
        <Route path="*" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
