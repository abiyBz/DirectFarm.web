import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
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
          <p className="text-2xl font-bold text-blue-600">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Monthly Sales</h3>
          <p className="text-2xl font-bold text-green-600">$12,890</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Orders Processed</h3>
          <p className="text-2xl font-bold text-purple-600">856</p>
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
