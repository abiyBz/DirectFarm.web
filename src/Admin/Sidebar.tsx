import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>DirectFarm Admin</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/manage-users">Manage Users</Link>
      <Link to="/transactions">Monitor Transactions</Link>
      <Link to="/reports">Generate Reports</Link>
      <Link to="/product-listings">Manage Product Listings</Link>
      <Link to="/createadmin">Create Admin</Link>
    </div>
  );
};

export default Sidebar;

