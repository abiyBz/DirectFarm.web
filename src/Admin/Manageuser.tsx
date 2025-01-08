import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const ManageUsers: React.FC = () => {
  // Sample users data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Warehouse Manager", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "inactive" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "User", status: "active" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com", role: "User", status: "inactive" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Function to toggle user status
  const toggleUserStatus = (userId: number) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    );
    setUsers(updatedUsers);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowercasedTerm) || user.id.toString().includes(lowercasedTerm)
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Manage Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-6"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-600">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      className={`px-4 py-2 rounded-md text-white font-semibold ${
                        user.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
