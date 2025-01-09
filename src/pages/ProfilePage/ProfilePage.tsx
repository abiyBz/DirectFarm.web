import React, { useEffect, useState } from 'react';
import { useLanguage } from "../../Context/LanguageContext";
import axios from 'axios';

interface OrderResponse {
    id: string;                   // Order ID
    customer: null;              // Assuming customer details are not provided in this response
    totalAmount: number;         // Total amount for the order
    status: string;              // Current status of the order (e.g., "pending", "delivered", "success")
    orderdate: string;           // Date when the order was placed (ISO date string)
    paymentDate: string | null;  // Date when payment was made (ISO date string or null)
    productOrders: null;         // Assuming product orders are not provided in this response
}

interface ApiResponse {
    responseStatus: number;
    systemMessage: string | null;
    isFailed: boolean;
    message: string;
    data: OrderResponse[];       // Array of orders
}

const authToken = localStorage.getItem('authToken');
let customer = null;

if (authToken) {
  try {
    const parsedToken = JSON.parse(authToken); // Parse the string to JSON
    customer = parsedToken.data?.customer; // Safely access customer
  } catch (error) {
    console.error('Failed to parse authToken:', error);
  }
}

const user = customer
  ? { 
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      joined: customer.registrationDate,
    }
  : {
      name: '',
      email: '',
      phone: '',
      address: '',
      joined: '',
    };

const ProfilePage: React.FC = () => {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (customer && customer.id) { 
        const cust = user.id; // Ensure customer ID is available
        try {
          console.log('Fetching orders for customer ID:', cust); // Debugging statement
          const orderresponse = await axios.post<ApiResponse>(`http://localhost:5122/api/Customer/GetCustomerOrders`, { id: cust });
          
          console.log(orderresponse);

          if (!orderresponse.data.isFailed) {
            console.log('Fetched Orders:', orderresponse.data.data); // Log fetched orders
            setOrders(orderresponse.data.data); // Set orders with the data array from response
          } else {
            setError(orderresponse.data.message || 'Failed to fetch orders.');
          }
        } catch (err) {
          console.error('Error fetching orders:', err);
          setError('Failed to fetch orders. Please try again later.');
        }
      } else {
        setError('No customer ID found.');
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="bg-gray-100 min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* User Information Section */}
        <div className="bg-gray-900 text-white">
          <h1 className="text-3xl font-semibold text-white">{language === "en" ? "Profile" : "መገለጫ"}</h1>
          <p className="text-md font-bold text-center">{language === "en" ? "Manage your account and orders" : "መለያዎን እና ትዕዛዞችን ያስተዳድሩ"}</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "en" ? "User Information" : "የተጠቃሚ መረጃ"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>{language === "en" ? "Name:" : "ስም:"}</strong> {user.name}</p>
              <p><strong>{language === "en" ? "Email:" : "ኢሜል አድራሻ:"}</strong> {user.email}</p>
            </div>
            <div>
              <p><strong>{language === "en" ? "Phone:" : "ስልክ:"}</strong> {user.phone}</p>
              <p><strong>{language === "en" ? "Address:" : "አድራሻ:"}</strong> {user.address}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            {language === "en" ? "Member since:" : "አባል:"} {user.joined}
          </p>
        </div>

        <hr />

        {/* Order History Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "en" ? "Order History" : "የትዕዛዝ ታሪክ"}</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">{language === "en" ? "Order ID" : "የትዕዛዝ መታወቂያ"}</th>
                  <th className="border p-2 text-left">{language === "en" ? "Date" : "ቀን"}</th>
                  <th className="border p-2 text-left">{language === "en" ? "Status" : "አሁናዊ ሁኔታ"}</th>
                  <th className="border p-2 text-left">{language === "en" ? "Total Amount" : "ጠቅላላ ድምር"}</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="border p-2">{order.id}</td>
                      <td className="border p-2">{new Date(order.orderdate).toLocaleDateString()}</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 text-sm font-medium rounded-md ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'Success' // New condition for Success
                              ? 'bg-green-200 text-green-800' // Light green for Success
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="border p-2">Br {order.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="border p-2 text-center">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
