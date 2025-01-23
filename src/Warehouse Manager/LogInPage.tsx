// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const LogInPage: React.FC = () => {

//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add your authentication logic here

//     // Redirect to the add product page on successful login
//     navigate('/addproduct');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Warehouse Manager Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LogInPage;


















import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual authentication logic here
    const fakeUser = { email: 'manager@example.com' };
    
    // Update sessionStorage and Redux state
    sessionStorage.setItem('managerLoggedIn', 'true');
    dispatch(loginSuccess(fakeUser));
    
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Warehouse Manager Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;