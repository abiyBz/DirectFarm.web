// import React from "react";
// import { Link } from "react-router-dom";
// import "./Warehouse.css";

// const Sidebar: React.FC = () => {
//   return (
//     <div className="bg-green-950 text-white w-64 min-h-screen p-6">
//       {/* Sidebar Header */}
//       <img
//         src="../logo-bg-removed.png"
//         alt="Logo"
//         className="w-12 h-12 object-contain"
//       />
//       <Link to="/">
//         <p className="font-semibold text-green-500">DIRECT FARM</p>
//       </Link>
//       <h2 className="text-2xl font-bold mb-8">Warehouse</h2>

//       {/* Sidebar Links */}
//       <ul className="space-y-6">
//         {/* Dashboard Link */}
//         <li>
//           <Link
//             to="/"
//             className="text-lg text-gray-300 hover:text-white transition duration-200"
//           >
//             Dashboard
//           </Link>
//         </li>
//         {/* Inventory Management Link */}
//         <li>
//           <Link
//             to="/inventory"
//             className="text-lg text-gray-300 hover:text-white transition duration-200"
//           >
//             Product Listings
//           </Link>
//         </li>
//         <li>
//           {/* Farmer registraion */}
//           <Link
//             to="/registerfarmer"
//             className="text-lg text-gray-300 hover:text-white transition duration-200"
//           >
//             Farmer Registration
//           </Link>
//         </li>
//         {/* Deliveries Link */}
//         <li>
//           <Link
//             to="/delivery"
//             className="text-lg text-gray-300 hover:text-white transition duration-200"
//           >
//             Deliveries
//           </Link>
//         </li>
//         {/* Warehouse Reports Link */}
//         <li>
//           <Link
//             to="/warehousereport"
//             className="text-lg text-gray-300 hover:text-white transition duration-200"
//           >
//             Warehouse Reports
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { logout, loginSuccess } from "../redux/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

const Sidebar: React.FC = () => {
  //const [isManagerLoggedIn, setIsManagerLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("managerLoggedIn");
    if (loginStatus) {
      dispatch(loginSuccess(loginStatus));
      navigate("/WarehouseLogin");
    }
  }, [dispatch]);

  const handleLogout = () => {
    sessionStorage.removeItem("managerLoggedIn");
    dispatch(logout());
    navigate("/"); // Adjust this path based on your routing structure
  };

  return (
    <>
      {isLoggedIn && (
        <div
          className="bg-gray-800 text-white h-screen w-60 fixed top-0 left-0 overflow-y-auto transition-transform transform ease-in-out duration-300 z-50"
          id="sidebar"
        >
          {/* Sidebar Header */}
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
              <img
                src="../logo-bg-removed.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="font-semibold text-white">DIRECT FARM</span>
            </Link>
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

            {/* Toggle Button for Mobile */}
            <button
              className="md:hidden text-white p-2 bg-transparent border-none"
              aria-label="Toggle Sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">WareHouse</h2>

          {/* Sidebar Navigation */}
          <nav className="mt-6">
            <ul className="space-y-2">
              {[
                { path: "/", label: "Dashboard" },
                { path: "/delivery", label: "Delivery" },
                { path: "/inventory", label: "WareHouse" },
                { path: "/registerfarmer", label: "Farmer Registration" },
                { path: "/warehousereport", label: "Warehouse Reports" },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md hover:bg-white hover:text-green-800 transition-colors duration-200 ${
                        isActive ? "bg-white text-green-800 font-black" : ""
                      }`
                    }
                  >
                    <span className="text-lg">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
