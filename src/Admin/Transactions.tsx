import React, { useState } from "react";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
  date: string;
};

const initialTransactions: Transaction[] = [
  { id: 1, description: "Payment to Vendor", amount: 200, status: "Success", date: "2024-12-20" },
  { id: 2, description: "Refund to Customer", amount: 100, status: "Failed", date: "2024-12-21" },
  { id: 3, description: "Subscription Renewal", amount: 50, status: "Pending", date: "2024-12-22" },
  { id: 4, description: "Bank Transfer", amount: 300, status: "Success", date: "2024-12-23" },
];

const Transaction: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState<string>("All");

  const filteredTransactions = transactions.filter((transaction) =>
    filter === "All" ? true : transaction.status === filter
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Transactions</h1>

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg font-medium text-gray-700">Filter by Status: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Transaction Table */}
      <table className="min-w-full table-auto bg-gray-50 rounded-lg shadow-sm text-black">
        <thead className="bg-gray-100 text-left text-black">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              className={`${
                transaction.status === "Success"
                  ? "bg-green-100"
                  : transaction.status === "Failed"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              } hover:bg-gray-200 transition-colors`}
            >
              <td className="px-4 py-3">{transaction.id}</td>
              <td className="px-4 py-3">{transaction.description}</td>
              <td className="px-4 py-3">${transaction.amount}</td>
              <td className="px-4 py-3 capitalize">{transaction.status}</td>
              <td className="px-4 py-3">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
