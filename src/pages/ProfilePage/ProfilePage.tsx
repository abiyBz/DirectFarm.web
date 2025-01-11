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

const ProfilePage: React.FC = () => {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // User state to hold customer information

  


  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      try {
        const parsedToken = JSON.parse(authToken);
        const customer = parsedToken.data?.customer;

        if (customer) {
          setUser({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            joined: customer.registrationDate,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to parse authToken:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []); // This effect runs once on mount

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.id) {
        try {
          console.log('Fetching orders for customer ID:', user.id); // Debugging statement
          const orderresponse = await axios.post<ApiResponse>(`http://localhost:5122/api/Customer/GetCustomerOrders`, { id: user.id });
          
          
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
        setOrders([]); // Clear orders if no user is found
      }
    };

    fetchOrders();
  }, [user]); // Dependency array includes user to refetch orders when it changes

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
              <p><strong>{language === "en" ? "Name:" : "ስም:"}</strong> {user?.name || 'N/A'}</p>
              <p><strong>{language === "en" ? "Email:" : "ኢሜል አድራሻ:"}</strong> {user?.email || 'N/A'}</p>
            </div>
            <div>
              <p><strong>{language === "en" ? "Phone:" : "ስልክ:"}</strong> {user?.phone || 'N/A'}</p>
              <p><strong>{language === "en" ? "Address:" : "አድራሻ:"}</strong> {user?.address || 'N/A'}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            {language === "en" ? "Member since:" : "አባል:"} {user?.joined || 'N/A'}
          </p>
        </div>

        <hr />

        {/* Order History Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === "en" ? "Order History" : "የትዕዛዝ ታሪክ"}</h2>
          
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
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'success' 
                              ? 'bg-green-200 text-green-800' 
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

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 text-red-600 font-semibold">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
