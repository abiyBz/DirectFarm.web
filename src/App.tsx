import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Admin/adminLayout";
import MainLayout from "./Layout/MainLayout";
import WarehouseLayout from "./Warehouse Manager/WarehouseLayout";

const App: React.FC = () => {
  return (
    <Router> 
      {/* The Router is only placed here */}
      <Routes>
        <Route path="*" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/warehouse" element={<WarehouseLayout />} />
        {/* 
        Use this to work on admin layouts
        <Route path="/main" element={<MainLayout />} />
        <Route path="*" element={<AdminLayout />} />
        <Route path="/warehouse" element={<WarehouseLayout />} />
        */}
        {/* 
        Use this to work on warehouse layouts
        <Route path="/main" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<WarehouseLayout />} />
        */}
      </Routes>
    </Router>
  );
};

export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminLayout from "./Admin/adminLayout";
// import MainLayout from "./Layout/MainLayout";
// import WarehouseLayout from "./Warehouse Manager/WarehouseLayout";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Main Layout */}
//         <Route path="*" element={<MainLayout />} />

//         {/* Admin Layout with nested routes */}
//         <Route path="/admin/*" element={<AdminLayout />} />

//         {/* Warehouse Layout with nested routes */}
//         <Route path="/warehouse/*" element={<WarehouseLayout />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Layouts
// import AdminLayout from "./Admin/adminLayout";
// import MainLayout from "./Layout/MainLayout";
// import WarehouseLayout from "./Warehouse Manager/WarehouseLayout";

// // Pages for AdminLayout
// import Dashboard from "./Admin/Dashboard";
// import ManageUsers from "./Admin/Manageuser";
// import Transactions from "./Admin/Transactions";
// import Reports from "./Admin/Reports";
// import ProductListing from "./Admin/Productlistings";
// import CreateAdmin from "./Admin/CreateAdmin";

// // Pages for WarehouseLayout
// import WareDashboard from "./Warehouse Manager/WareDashboard";
// import Inventory from "./Warehouse Manager/Inventory";
// import Delivery from "./Warehouse Manager/Delivery";
// import FarmerRegistration from "./Warehouse Manager/FarmerRegistration";
// import WarehouseReport from "./Warehouse Manager/WarehouseReport";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Main Layout (unchanged) */}
//         <Route path="*" element={<MainLayout />} />

//         {/* Admin Layout */}
//         <Route path="/admin/*" element={<AdminLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="manage-users" element={<ManageUsers />} />
//           <Route path="transactions" element={<Transactions />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="product-listings" element={<ProductListing />} />
//           <Route path="createadmin" element={<CreateAdmin />} />
//         </Route>

//         {/* Warehouse Layout */}
//         <Route path="/warehouse/*" element={<WarehouseLayout />}>
//           <Route index element={<WareDashboard />} />
//           <Route path="inventory" element={<Inventory />} />
//           <Route path="delivery" element={<Delivery />} />
//           <Route path="registerfarmer" element={<FarmerRegistration />} />
//           <Route path="warehousereport" element={<WarehouseReport />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
