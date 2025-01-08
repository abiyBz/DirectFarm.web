import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './LoginAdmin'; // Your admin page component
import "./adminpage.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import ManageUsers from "./Manageuser";
import Transactions from "./Transactions";
import Reports from "./Reports";
import ProductListing from "./Productlistings";
import CreateAdmin from "./CreateAdmin";
const AdminLayout: React.FC = () => {
    return (
 
          <div style={{display:"flex", flexDirection: "column"}}>
          

          <div className="parent-container">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/product-listings" element={<ProductListing />} />
            <Route path="/admin" element={<Login />} /> 
            <Route path="/createadmin" element={<CreateAdmin />} /> 
          </Routes>
          </div>
          </div>

            );
          };
          
          export default AdminLayout;