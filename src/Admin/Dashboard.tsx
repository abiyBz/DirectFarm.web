// import React from "react";

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// interface DashboardProps {}

// const Dashboard: React.FC<DashboardProps> = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

//       {/* Sales Summary Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800">Sales Summary</h2>
//         <p className="text-gray-600 mb-4">Overview of Latest Month</p>
//         <div className="bg-gray-100 p-6 rounded-lg">
//           <p className="text-center text-gray-400">Chart Placeholder (e.g., Sales Trends)</p>
//         </div>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
//           <p className="text-2xl font-bold text-blue-600">1,245</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">Monthly Sales</h3>
//           <p className="text-2xl font-bold text-green-600">$12,890</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">Orders Processed</h3>
//           <p className="text-2xl font-bold text-purple-600">856</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">New Registrations</h3>
//           <p className="text-2xl font-bold text-orange-600">245</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Custom type for the API response structure
// interface CustomerApiResponse {
//   responseStatus: number;
//   systemMessage: {
//     culture: string;
//     messageType: number;
//     type: string;
//     message: string;
//     messageCode: string;
//     systemMessageCode: string;
//     hasDetail: boolean;
//     moduleCode: string;
//     exceptionMessage: string;
//   } | null;
//   isFailed: boolean;
//   message: string;
//   data: Customer[];
// }

// interface Customer {
//   id: string;
//   // Add other customer properties here if needed
// }

// interface DashboardProps {}

// const Dashboard: React.FC<DashboardProps> = () => {
//   const [totalUsers, setTotalUsers] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTotalUsers = async () => {
//       try {
//         const response = await axios.get<CustomerApiResponse>('http://localhost:5122/api/Customer/GetAllCustomers');
//         if (response.data.isFailed) {
//           throw new Error(response.data.message || 'Failed to fetch users');
//         }
//         // Assuming 'data' in the response is an array of customers
//         setTotalUsers(response.data.data.length);
//       } catch (err: any) {
//         setError(`Error fetching users: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTotalUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-gray-50 min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

//       {/* Sales Summary Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800">Sales Summary</h2>
//         <p className="text-gray-600 mb-4">Overview of Latest Month</p>
//         <div className="bg-gray-100 p-6 rounded-lg">
//           <p className="text-center text-gray-400">Chart Placeholder (e.g., Sales Trends)</p>
//         </div>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
//           <p className="text-2xl font-bold text-blue-600">{totalUsers !== null ? totalUsers : 'N/A'}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">Monthly Sales</h3>
//           <p className="text-2xl font-bold text-green-600">$12,890</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">Orders Processed</h3>
//           <p className="text-2xl font-bold text-purple-600">856</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold text-gray-800">New Registrations</h3>
//           <p className="text-2xl font-bold text-orange-600">245</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Custom type for the API response structure for orders
interface OrderApiResponse {
  responseStatus: number;
  systemMessage: {
    culture: string;
    messageType: number;
    type: string;
    message: string;
    messageCode: string;
    systemMessageCode: string;
    hasDetail: boolean;
    moduleCode: string;
    exceptionMessage: string;
  } | null;
  isFailed: boolean;
  message: string;
  data: Order[];
}

interface Order {
  id: string;
  // Add other order properties here if needed
}

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook to enable navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const usersResponse = await axios.get<CustomerApiResponse>('http://localhost:5122/api/Customer/GetAllCustomers');
        if (usersResponse.data.isFailed) {
          throw new Error(usersResponse.data.message || 'Failed to fetch users');
        }
        setTotalUsers(usersResponse.data.data.length);

        // Fetch total orders
        const ordersResponse = await axios.get<OrderApiResponse>('http://localhost:5122/api/Order/GetAllOrders');
        if (ordersResponse.data.isFailed) {
          throw new Error(ordersResponse.data.message || 'Failed to fetch orders');
        }
        setTotalOrders(ordersResponse.data.data.length);
      } catch (err: any) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Sales Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Sales Summary</h2>
        <p className="text-gray-600 mb-4">Overview of Latest Month</p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-center text-gray-400">Chart Placeholder (e.g., Sales Trends)</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{totalUsers !== null ? totalUsers : 'N/A'}</p>
        </div>
        <div 
          className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-100"
          onClick={() => navigate('/orders')} // Navigate to an 'orders' page when clicked
        >
          <h3 className="text-xl font-semibold text-gray-800">Orders Processed</h3>
          <p className="text-2xl font-bold text-purple-600">{totalOrders !== null ? totalOrders : 'N/A'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Monthly Sales</h3>
          <p className="text-2xl font-bold text-green-600">$12,890</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">New Registrations</h3>
          <p className="text-2xl font-bold text-orange-600">245</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;