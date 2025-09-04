import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4">TimeZone</h2>
          <p className="text-gray-400">
            Discover exclusive watch collections. Elegant, timeless, and perfect for every style.
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-orange-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-orange-500 transition">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-orange-500 transition">
                Cart
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p>Email: support@timezone.com</p>
          <p>Phone: +94 76 108 2274</p>
          <div className="flex space-x-4 mt-4">
            <Link to="#" className="hover:text-orange-500 transition"><img src="/facebook.png" alt="Facebook" /></Link>
            <Link to="#" className="hover:text-orange-500 transition"><img src="/instagram.png" alt="Instagram" /></Link>
            <Link to="#" className="hover:text-orange-500 transition"><img src="/linkedin.png" alt="LinkedIn" /></Link>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-500 text-sm">
        © 2025 TimeZone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
