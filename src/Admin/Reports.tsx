import React, { useState } from "react";

type ReportData = {
  id: number;
  name: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
};

const initialReportData: ReportData[] = [
  { id: 1, name: "Invoice #1001", category: "Sales", amount: 500, status: "Completed", date: "2024-12-20" },
  { id: 2, name: "Invoice #1002", category: "Refund", amount: -200, status: "Cancelled", date: "2024-12-21" },
  { id: 3, name: "Invoice #1003", category: "Sales", amount: 300, status: "Pending", date: "2024-12-22" },
  { id: 4, name: "Invoice #1004", category: "Services", amount: 150, status: "Completed", date: "2024-12-23" },
];

const Report: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<ReportData[]>(initialReportData);

  const handleGenerateReport = () => {
    let data = initialReportData;

    if (startDate) {
      data = data.filter((item) => new Date(item.date) >= new Date(startDate));
    }

    if (endDate) {
      data = data.filter((item) => new Date(item.date) <= new Date(endDate));
    }

    if (statusFilter !== "All") {
      data = data.filter((item) => item.status === statusFilter);
    }

    setFilteredData(data);
  };

  const handleDownloadReport = () => {
    const csvContent = [
      ["ID", "Name", "Category", "Amount", "Status", "Date"],
      ...filteredData.map((item) => [
        item.id,
        item.name,
        item.category,
        item.amount,
        item.status,
        item.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Generate Report</h1>

      {/* Filter Section */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <label className="text-lg font-medium text-gray-700 w-32">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-lg font-medium text-gray-700 w-32">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-lg font-medium text-gray-700 w-32">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={handleGenerateReport}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Report
        </button>
      </div>

      {/* Report Table */}
      <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-left text-gray-700">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item.id}
              className={`${
                item.status === "Completed"
                  ? "bg-green-100"
                  : item.status === "Cancelled"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              } hover:bg-gray-200 transition-colors`}
            >
              <td className="px-4 py-3">{item.id}</td>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{item.category}</td>
              <td className="px-4 py-3">${item.amount}</td>
              <td className="px-4 py-3 capitalize">{item.status}</td>
              <td className="px-4 py-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download Button */}
      <button
        onClick={handleDownloadReport}
        className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Download Report
      </button>
    </div>
  );
};

export default Report;
