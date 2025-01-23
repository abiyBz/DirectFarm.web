import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Admin/adminLayout";
import MainLayout from "./Layout/MainLayout";
import WarehouseLayout from "./Warehouse Manager/WarehouseLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect } from "react";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      {/* The Router is only placed here */}
      <Routes>
        {/* <Route path="*" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/warehouse" element={<WarehouseLayout />} /> */}
        
        {/* Use this to work on admin layouts */}
        <Route path="/main" element={<MainLayout />} />
        <Route path="*" element={<AdminLayout />} />
        <Route path="/warehouse" element={<WarehouseLayout />} />
       
        {/* Use this to work on warehouse layouts */}
        {/* <Route path="/main" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<WarehouseLayout />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
