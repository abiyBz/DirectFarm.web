import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Warehouse.css";
import WareSide from "./WareSide"
import Delivery from "./Delivery";
import LoginInPage from "./LogInPage";
import Inventory from "./Inventory";
import WareDashboard from "./WareDashboard"
import FarmerRegistration from "./FarmerRegistration";
import WarehouseReport from "./WarehouseReport";

const WarehouseLayout: React.FC = () => {
    return (
 
          <div style={{display:"flex", flexDirection: "column"}}>
          

          <div className="parent-container">
          <WareSide/>
          <Routes>

            <Route path="/" element={<WareDashboard />} /> 
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/registerfarmer" element={<FarmerRegistration />} />
            <Route path="/warehousereport" element={<WarehouseReport />} />
          </Routes>
        
          </div>
          </div>

            );
          };
          
          export default WarehouseLayout;