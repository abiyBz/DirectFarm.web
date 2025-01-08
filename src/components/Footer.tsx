/*import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>© 2024 DirectFarm. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
*/



import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-950 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p className="text-sm">
              We are dedicated to providing the best quality products to our customers, ensuring satisfaction and reliability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-gray-400">Home</a></li>
              <li><a href="/all-products" className="hover:text-gray-400">Products</a></li>
              <li><a href="/about" className="hover:text-gray-400">About</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>Email: support@example.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Main St, Cityville</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
