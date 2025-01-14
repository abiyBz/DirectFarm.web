// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar: React.FC = () => {
//   return (
//     <div className="sidebar">
//       <h2>DirectFarm Admin</h2>
//       <Link to="/">Dashboard</Link>
//       <Link to="/manage-users">Manage Users</Link>
//       <Link to="/transactions">Monitor Transactions</Link>
//       <Link to="/reports">Generate Reports</Link>
//       <Link to="/product-listings">Manage Product Listings</Link>
//       <Link to="/createadmin">Create Admin</Link>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";

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
      <h2 className="text-2xl font-bold mb-8">DirectFarm Admin</h2>

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
        {/* manage users Link */}
        <li>
          <Link
            to="/manage-users"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Manage Users
          </Link>
        </li>
        <li>
        {/* transactions */}
          <Link
            to="/transactions"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Monitor Transactions
          </Link>
        </li>

        {/* Product Listings Link */}
        <li>
          <Link
            to="/product-listings"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Manage Product Listings
          </Link>
        </li>
        {/* Admin Reports Link */}
        <li>
          <Link
            to="/reports"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Generate Reports
          </Link>
        </li>
                {/* Create admin Link */}
                <li>
          <Link
            to="/createadmin"
            className="text-lg text-gray-300 hover:text-white transition duration-200"
          >
            Create Admin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

