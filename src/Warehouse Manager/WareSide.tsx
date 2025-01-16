import React from "react";
import { Link } from "react-router-dom";
import "./Warehouse.css"

const Sidebar: React.FC = () => {
  return (
    <div className="bg-green-950 text-white w-64 min-h-screen p-6">
      {/* Sidebar Header */}
      <img 
                        src="../logo-bg-removed.png" 
                        alt="Logo" 
                        className="w-12 h-12 object-contain"
                      />
                      <Link to="/">
                        <p className="font-semibold text-green-500">DIRECT FARM</p>
                      </Link>
      <h2 className="text-2xl font-bold mb-8">DirectFarm Warehouse</h2>

      {/* Sidebar Links */}
      <ul className="space-y-6">
        {/* Dashboard Link */}
        <li>
          <Link
            to="/"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Dashboard
          </Link>
        </li>
        {/* Inventory Management Link */}
        <li>
          <Link
            to="/inventory"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Product Listings
          </Link>
        </li>
        <li>
        {/* Farmer registraion */}
          <Link
            to="/registerfarmer"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Farmer Registration
          </Link>
        </li>

        {/* Deliveries Link */}
        <li>
          <Link
            to="/delivery"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Deliveries
          </Link>
        </li>
        {/* Warehouse Reports Link */}
        <li>
          <Link
            to="/warehousereport"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Warehouse Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
