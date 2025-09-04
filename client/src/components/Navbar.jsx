import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context

function Navbar() {
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth(); // ✅ get login status & logout function
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center h-16 px-4 justify-between">
        <div className="flex items-center space-x-10"> 
          <h1 className="text-2xl text-orange-500 font-bold">TimeZone</h1>
          <ul className="hidden md:flex space-x-6 font-medium">
            <li>
              <NavLink to="/" className={({ isActive }) =>
                `relative pb-1 transition-colors duration-300 ${
                  isActive 
                    ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                    : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                }`
              }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) =>
                `relative pb-1 transition-colors duration-300 ${
                  isActive 
                    ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                    : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                }`
              }>
                Products
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-10 font-medium">
          <ul className="hidden md:flex space-x-6">
            {!isLoggedIn ? (
              <button className="
                bg-orange-500 px-4 py-1 rounded 
                hover:bg-orange-700 
                active:scale-105 active:ring-2 active:ring-orange-400 active:ring-offset-2 
                transition-all duration-200
              ">
                <NavLink to="/login" className="text-white no-underline">
                  Log In
                </NavLink>
              </button>
            ) : (
              <button
                onClick={logout} // ✅ logout function
                className="
                  bg-red-500 px-4 py-1 rounded 
                  hover:bg-red-700 
                  active:scale-105 active:ring-2 active:ring-red-400 active:ring-offset-2 
                  transition-all duration-200
                "
              >
                Logout
              </button>
            )}

            <NavLink to="/cart" className={({ isActive }) =>
              `relative pb-1 transition-colors duration-300 ${
                isActive 
                  ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                  : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              }`
            }>
              <img src="/cart2.ico" alt="Cart" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </ul>

          {/* Mobile menu toggle */}
          <button
            className='md:hidden text-2xl'
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-gray-800 shadow-md p-4 space-y-3">
          <li><Link to="/" className="block">Home</Link></li>
          <li><Link to="/products" className="block">Products</Link></li>
          {!isLoggedIn ? (
            <li><Link to="/login" className="block">Log In</Link></li>
          ) : (
            <li><button onClick={logout} className="w-full text-left text-red-500">Logout</button></li>
          )}
          <li><Link to="/cart" className="block">Cart</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
