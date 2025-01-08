import React from 'react';
import { useLanguage } from "../../Context/LanguageContext";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
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



const orders: Order[] = [
  { id: 'ORD123', date: '2024-01-10', status: 'Delivered', total: 250 },
  { id: 'ORD124', date: '2024-02-05', status: 'Pending', total: 100 },
  { id: 'ORD125', date: '2024-03-02', status: 'Cancelled', total: 50 },
];

const ProfilePage: React.FC = () => {
    const { language } = useLanguage();

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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">{language === "en" ? "Order ID" : "የትዕዛዝ መታወቂያ"}</th>
                  <th className="border p-2 text-left">{language === "en" ? "Date" : "ቀን "}</th>
                  <th className="border p-2 text-left">{language === "en" ? "Status" : "አሁናዊ ሁኔታ"}</th>
                  <th className="border p-2 text-left">{language === "en" ? "Total" : "ጠቅላላ ድምር"}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.date}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-md ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="border p-2">Br {order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
