// import React, { useState } from "react";

// interface CreateAdminProps {}

// const CreateAdmin: React.FC<CreateAdminProps> = () => {
//   // Form state
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [role, setRole] = useState<string>("Admin");
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   // Form submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate fields
//     if (!name || !email) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     // Simulate API call to create an admin
//     setTimeout(() => {
//       console.log("New admin created:", { name, email, role });
//       // After successful submission, reset form
//       setName("");
//       setEmail("");
//       setRole("Admin");
//       setIsSubmitting(false);
//       alert("Admin created successfully!");
//     }, 1000); // Simulate API delay
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-3xl font-semibold text-center mb-6">Create Admin</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div>
//           <label htmlFor="name" className="block text-lg font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 p-3 w-full border border-gray-300 rounded-md"
//             placeholder="Enter admin name"
//             required
//           />
//         </div>

//         {/* Email Input */}
//         <div>
//           <label htmlFor="email" className="block text-lg font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-3 w-full border border-gray-300 rounded-md"
//             placeholder="Enter admin email"
//             required
//           />
//         </div>

//         {/* Role Select */}
//         <div>
//           <label htmlFor="role" className="block text-lg font-medium text-gray-700">
//             Role
//           </label>
//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="mt-1 p-3 w-full border border-gray-300 rounded-md"
//           >
//             <option value="Admin">Admin</option>
//             <option value="Warehouse">Warehouse Manager</option>
//           </select>
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md disabled:opacity-50"
//           >
//             {isSubmitting ? "Creating..." : "Create Admin"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateAdmin;


import React, { useState } from "react";

interface CreateAdminProps {}

const CreateAdmin: React.FC<CreateAdminProps> = () => {
  // Form state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Admin");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!name || !email) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate API call to create an admin
    setTimeout(() => {
      console.log("New admin created:", { name, email, role });
      // After successful submission, reset form
      setName("");
      setEmail("");
      setRole("Admin");
      setIsSubmitting(false);
      alert("Admin created successfully!");
    }, 1000); // Simulate API delay
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Admin</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter admin name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter admin email"
            required
          />
        </div>

        {/* Role Select */}
        <div>
          <label htmlFor="role" className="block text-lg font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Admin">Admin</option>
            <option value="Warehouse">Warehouse Manager</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gray-600 text-black font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
