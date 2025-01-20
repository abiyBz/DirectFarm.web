// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// // interface OrderApiResponse {
// //   responseStatus: number;
// //   systemMessage: null;
// //   isFailed: boolean;
// //   message: string;
// //   data: Order[];
// // }

// // interface Order {
// //   id: string;
// //   customer: null;
// //   totalAmount: number;
// //   status: string;
// //   orderdate: string;
// //   paymentDate: string | null;
// //   productOrders: null;
// // }

// // const OrdersPage: React.FC = () => {
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const response = await axios.get<OrderApiResponse>('http://localhost:5122/api/Order/GetAllOrders', {
// //           headers: {
// //             'accept': 'text/plain'
// //           }
// //         });
// //         if (response.data.isFailed) {
// //           throw new Error(response.data.message || 'Failed to fetch orders');
// //         }
// //         setOrders(response.data.data);
// //       } catch (err: any) {
// //         setError(`Error fetching orders: ${err.message}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   // Data for charts
// //   const statusCount = orders.reduce((acc, order) => {
// //     acc[order.status] = (acc[order.status] || 0) + 1;
// //     return acc;
// //   }, {} as Record<string, number>);

// //   const statusData = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  
// //   const totalSalesData = orders.map(order => ({
// //     date: new Date(order.orderdate).toISOString().split('T')[0], // Convert to ISO date string for daily aggregation
// //     total: order.totalAmount
// //   })).reduce((acc, { date, total }) => {
// //     const existing = acc.find(d => d.date === date);
// //     if (existing) {
// //       existing.total += total;
// //     } else {
// //       acc.push({ date, total });
// //     }
// //     return acc;
// //   }, [] as { date: string, total: number }[]);

// //   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
// //   if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

// //   return (
// //     <div className="p-8 bg-gray-100 min-h-screen">
// //       <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Orders Overview</h1>

// //       <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Orders Processed: {orders.length}</h2>
// //         {/* Example of a Bar Chart for Order Status */}
// //         <div className="flex justify-center">
// //           <BarChart width={600} height={300} data={statusData}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Bar dataKey="value" fill="#8884d8" />
// //           </BarChart>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-lg shadow-lg p-6">
// //         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daily Sales</h2>
// //         {/* Example of a Pie Chart for Daily Sales */}
// //         <div className="flex justify-center">
// //           <PieChart width={400} height={400}>
// //             <Pie
// //               dataKey="total"
// //               isAnimationActive={false}
// //               data={totalSalesData}
// //               cx="50%"
// //               cy="50%"
// //               outerRadius={80}
// //               fill="#8884d8"
// //               label
// //             >
// //               {totalSalesData.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //               ))}
// //             </Pie>
// //             <Tooltip />
// //           </PieChart>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Array of colors for the Pie Chart
// // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// // export default OrdersPage;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// interface OrderApiResponse {
//   responseStatus: number;
//   systemMessage: null;
//   isFailed: boolean;
//   message: string;
//   data: Order[];
// }

// interface Order {
//   id: string;
//   customer: null;
//   totalAmount: number;
//   status: string;
//   orderdate: string;
//   paymentDate: string | null;
//   productOrders: null;
// }

// const OrdersPage: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get<OrderApiResponse>('http://localhost:5122/api/Order/GetAllOrders', {
//           headers: {
//             'accept': 'text/plain'
//           }
//         });
//         if (response.data.isFailed) {
//           throw new Error(response.data.message || 'Failed to fetch orders');
//         }
//         setOrders(response.data.data);
//       } catch (err: any) {
//         setError(`Error fetching orders: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Data for charts
//   const statusCount = orders.reduce((acc, order) => {
//     acc[order.status] = (acc[order.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const statusData = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  
//   const totalSalesData = orders.map(order => ({
//     date: new Date(order.orderdate).toISOString().split('T')[0], // Convert to ISO date string for daily aggregation
//     total: order.totalAmount
//   })).reduce((acc, { date, total }) => {
//     const existing = acc.find(d => d.date === date);
//     if (existing) {
//       existing.total += total;
//     } else {
//       acc.push({ date, total });
//     }
//     return acc;
//   }, [] as { date: string, total: number }[]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-3xl text-gray-600">Loading...</div>;
//   if (error) return <div className="text-red-600 text-center mt-8 text-2xl">Error: {error}</div>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center">Orders Dashboard</h1>

//       {/* Total Orders */}
//       <div className="bg-white rounded-lg shadow-2xl p-6 mb-8">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">Total Orders: <span className="text-blue-600">{orders.length}</span></h2>
//       </div>

//       {/* Status Chart */}
//       <div className="bg-gray-200 rounded-lg shadow-2xl p-6 mb-8">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Status Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={statusData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" stroke="#8884d8" />
//             <YAxis stroke="#8884d8" />
//             <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
//             <Legend wrapperStyle={{ paddingTop: "20px" }} />
//             <Bar dataKey="value" fill="#8884d8" name="Count" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Daily Sales Pie Chart */}
//       <div className="bg-gray-200 rounded-lg shadow-2xl p-6">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Daily Sales Overview</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie 
//               data={totalSalesData}
//               dataKey="total"
//               nameKey="date"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#82ca9d"
//               label
//             >
//               {totalSalesData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// };

// // Array of colors for the Pie Chart
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ED5565', '#DA4453', '#AAB2BD', '#6A6C75'];

// export default OrdersPage;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

// interface OrderApiResponse {
//   responseStatus: number;
//   systemMessage: null;
//   isFailed: boolean;
//   message: string;
//   data: Order[];
// }

// interface Order {
//   id: string;
//   customer: null;
//   totalAmount: number;
//   status: string;
//   orderdate: string;
//   paymentDate: string | null;
//   productOrders: null;
// }

// const Orders: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get<OrderApiResponse>('http://localhost:5122/api/Order/GetAllOrders', {
//           headers: {
//             'accept': 'text/plain'
//           }
//         });
//         if (response.data.isFailed) {
//           throw new Error(response.data.message || 'Failed to fetch orders');
//         }
//         setOrders(response.data.data);
//       } catch (err: any) {
//         setError(`Error fetching orders: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Data for charts
//   const statusCount = orders.reduce((acc, order) => {
//     acc[order.status] = (acc[order.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const statusData = Object.entries(statusCount).map(([name, value], index) => ({ name, value, fill: COLORS[index % COLORS.length] }));
  
//   const dailySalesData = orders.map(order => ({
//     date: new Date(order.orderdate).toISOString().split('T')[0], // Convert to ISO date string for daily aggregation
//     total: order.totalAmount
//   })).reduce((acc, { date, total }) => {
//     const existing = acc.find(d => d.date === date);
//     if (existing) {
//       existing.total += total;
//     } else {
//       acc.push({ date, total });
//     }
//     return acc;
//   }, [] as { date: string, total: number }[]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-3xl text-gray-600">Loading...</div>;
//   if (error) return <div className="text-red-600 text-center mt-8 text-2xl">Error: {error}</div>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center">Orders Dashboard</h1>

//       {/* Total Orders */}
//       <div className="bg-white rounded-lg shadow-2xl p-6 mb-8">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">Total Orders: <span className="text-blue-600">{orders.length}</span></h2>
//       </div>

//       {/* Sales vs Date Line Chart */}
//       <div className="bg-gray-200 rounded-lg shadow-2xl p-6 mb-8">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Sales Over Time</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={dailySalesData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//             <XAxis dataKey="date" stroke="#8884d8" />
//             <YAxis stroke="#8884d8" />
//             <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
//             <Legend />
//             <Line type="monotone" dataKey="total" stroke="#00C49F" activeDot={{ r: 8 }} name="Total Sales" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Status Chart */}
//       <div className="bg-gray-200 rounded-lg shadow-2xl p-6 mb-8">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Status Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={statusData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//             <XAxis dataKey="name" stroke="#8884d8" />
//             <YAxis stroke="#8884d8" />
//             <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
//             <Legend wrapperStyle={{ paddingTop: "20px" }} />
//             {statusData.map((entry, index) => (
//               <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} name={entry.name} />
//             ))}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Daily Sales Pie Chart */}
//       <div className="bg-gray-200 rounded-lg shadow-2xl p-6">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Daily Sales Overview</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie 
//               data={dailySalesData}
//               dataKey="total"
//               nameKey="date"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#82ca9d"
//               label
//             >
//               {dailySalesData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// };

// // Array of colors for the charts
// const COLORS = ['#00B7EB', '#4CAF50', '#FFC107', '#FF5722', '#9C27B0', '#00BCD4', '#FF4081', '#8BC34A', '#795548', '#2196F3'];
// export default Orders;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

interface OrderApiResponse {
  responseStatus: number;
  systemMessage: null;
  isFailed: boolean;
  message: string;
  data: Order[];
}

interface Order {
  id: string;
  customer: null;
  totalAmount: number;
  status: string;
  orderdate: string;
  paymentDate: string | null;
  productOrders: null;
}

interface ProductApiResponse {
  responseStatus: number;
  systemMessage: null;
  isFailed: boolean;
  message: string;
  data: Product[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  // Add other product properties here if needed
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Orders
        const ordersResponse = await axios.get<OrderApiResponse>('http://localhost:5122/api/Order/GetAllOrders', {
          headers: {
            'accept': 'text/plain'
          }
        });
        if (ordersResponse.data.isFailed) {
          throw new Error(ordersResponse.data.message || 'Failed to fetch orders');
        }
        setOrders(ordersResponse.data.data);

        // Fetch Products
        const productsResponse = await axios.get<ProductApiResponse>('http://localhost:5122/api/Product/GetAllProducts', {
          headers: {
            'accept': 'text/plain'
          }
        });
        if (productsResponse.data.isFailed) {
          throw new Error(productsResponse.data.message || 'Failed to fetch products');
        }
        setProducts(productsResponse.data.data);
      } catch (err: any) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for Order charts
  const statusCount = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCount).map(([name, value], index) => ({ name, value, fill: COLORS[index % COLORS.length] }));
  
  const dailySalesData = orders.map(order => ({
    date: new Date(order.orderdate).toISOString().split('T')[0], // Convert to ISO date string for daily aggregation
    total: order.totalAmount
  })).reduce((acc, { date, total }) => {
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.total += total;
    } else {
      acc.push({ date, total });
    }
    return acc;
  }, [] as { date: string, total: number }[]);

  // Data for Product Category Pie Chart
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCount).map(([name, value], index) => ({
    name,
    value,
    fill: COLORS[index % COLORS.length]
  }));

  if (loading) return <div className="flex justify-center items-center h-screen text-3xl text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-8 text-2xl">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center">Orders & Products Dashboard</h1>

      {/* Total Orders */}
      <div className="bg-white rounded-lg shadow-2xl p-6 mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Total Orders: <span className="text-blue-600">{orders.length}</span></h2>
      </div>

      {/* Sales vs Date Line Chart */}
      <div className="bg-gray-200 rounded-lg shadow-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Sales Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#00C49F" activeDot={{ r: 8 }} name="Total Sales" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Status Chart */}
      <div className="bg-gray-200 rounded-lg shadow-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="value" fill="#8884d8" name="Count" />
            </BarChart>
        </ResponsiveContainer>
    </div>

      {/* Product Categories Pie Chart */}
      <div className="bg-gray-200 rounded-lg shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Categories Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie 
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '4px' }} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

// Array of colors for the charts
const COLORS = ['#eb9100', '#4CAF50', '#FF0707', '#113837', '#9C27B0', '#00BCD4', '#FF4081', '#8BC34A', '#795548', '#2196F3'];

export default Orders;