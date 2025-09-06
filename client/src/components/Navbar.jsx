import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useUser } from "../context/UserContext";
import config from '../config';

function Navbar() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, setUser } = useUser();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Fetch user info from backend OIDC session
  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/profile`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const isAuthenticated = !!user;

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center h-16 px-4 justify-between">
        <div className="flex items-center space-x-10">
          <h1 className="text-2xl text-orange-500 font-bold">TimeZone</h1>
          <ul className="hidden md:flex space-x-6 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-300 ${
                    isActive
                      ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                      : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-300 ${
                    isActive
                      ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                      : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-300 ${
                    isActive
                      ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                      : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  }`
                }
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-10 font-medium">
          <ul className="hidden md:flex space-x-6">
            {!isAuthenticated && (
              <a href="">
                <button className="bg-orange-500 px-4 py-1 rounded hover:bg-orange-700 active:scale-105 active:ring-2 active:ring-orange-400 active:ring-offset-2 transition-all duration-200">
                  Log In
                </button>
              </a>
            )}
            {/* Desktop Profile Dropdown */}
            {isAuthenticated && (
              <li className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setShowProfile(!showProfile)} // toggle popup on click
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {showProfile && (
                  <div className="absolute top-10 right-0 bg-gray-800 p-3 rounded shadow-md w-96  text-center text-white z-50">
                    {/* Close button */}
                    <button
                      onClick={() => setShowProfile(false)}
                      className="absolute top-1 right-2 text-gray-300 hover:text-white"
                    >
                      ✕
                    </button>

                    {/* User Info */}
                    <p className="text-sm font-medium mb-2">Hi ! {user.name}</p>
                    <p className="text-xs text-gray-300 truncate mb-3">
                      {user.email}
                    </p>

                    {/* Logout button */}
                    <a
                      href={`${config.BASE_URL}/logout`}
                      className="mt-2 w-full bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white text-sm block text-center"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </li>
            )}

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative pb-1 transition-colors duration-300 ${
                  isActive
                    ? "text-orange-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-100 after:transition-transform after:duration-300"
                    : "hover:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-500 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                }`
              }
            >
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
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 shadow-md p-4 space-y-3">
          <li>
            <Link to="/" className="block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="block">
              Products
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile" className="block">
                  Profile
                </Link>
              </li>
              <li>
                <a
                  href={`${config.BASE_URL}/logout`}
                  className="w-full text-left text-red-500 block"
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <a
                href={`${config.BASE_URL}/login`}
                className="w-full text-left text-orange-500 block"
              >
                Log In
              </a>
            </li>
          )}
          <li>
            <Link to="/cart" className="block">
              Cart
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
