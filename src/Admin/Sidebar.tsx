import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-60 fixed top-0 left-0 overflow-y-auto transition-transform transform ease-in-out duration-300 z-50" id="sidebar">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        <Link to="/login" className="flex items-center space-x-4">
          <img 
            src="../logo-bg-removed.png"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="font-semibold text-white">DIRECT FARM</span>
        </Link>
        {/* Toggle Button for Mobile */}
        <button className="md:hidden text-white p-2 bg-transparent border-none" aria-label="Toggle Sidebar">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <h2 className="text-3xl font-bold text-center mb-4">ADMIN</h2>

      {/* Sidebar Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/manage-users", label: "Manage Farmers" },
            { path: "/OrderStatus", label: "Monitor Order Status" },
            { path: "/product-listings", label: "Manage Products" },
            { path: "/reports", label: "Generate Reports" },
            { path: "/createadmin", label: "Register New Manager" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center p-2 rounded-md hover:bg-white hover:text-green-800 transition-colors duration-200 ${isActive ? 'bg-white text-green-800 font-black' : ''}`
                }
              >
                <span className="text-lg">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;