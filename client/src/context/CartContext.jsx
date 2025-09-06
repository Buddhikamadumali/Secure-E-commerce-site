import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import config from "../config";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();

  // Helper to map backend cart items to frontend-friendly format
  const mapCartItems = (items) =>
    (items || []).map((item) => ({
      id: item?.product?._id || "",
      name: item?.product?.name || "",
      price: item?.product?.price || 0,
      image: item?.product?.image || "",
      quantity: item?.quantity || 0,
    }));

  // Fetch logged-in user and cart
  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const cartRes = await axios.get(`${config.BASE_URL}/api/cart`, {
          withCredentials: true,
        });
        console.log("cart", cartRes.data);
        setCartItems(mapCartItems(cartRes.data.items));
      } catch (err) {
        console.error("Failed to fetch user/cart:", err);

        setCartItems([]);
      }
    };

    fetchUserAndCart();
  }, []);

  // Add to Cart
  const addToCart = async (product, quantity) => {
    if (!user) {
      alert("Please log in to add products to the cart!");
      return false;
    }
    console.log("add", user);
    try {
      const res = await axios.post(
        `${config.BASE_URL}/api/cart/add`,
        {
          auth0Id: user.auth0Id,
          productId: product._id,
          quantity,
        },
        {
          withCredentials: true, // ✅ correct place (axios config)
        }
      );

      setCartItems(mapCartItems(res.data?.items));
      return true;
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add item to cart");
      return false;
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const res = await axios.delete(`${config.BASE_URL}/api/cart/remove`, {
        data: { auth0Id: user.auth0Id, productId },
      });
      setCartItems(mapCartItems(res.data));
    } catch (error) {
      console.error("Remove from cart failed:", error);
    }
  };

  // Decrease quantity
  const decrease = async (productId) => {
    if (!user) return;

    try {
      const res = await axios.post(`${config.BASE_URL}/api/cart/add`, {
        auth0Id: user.auth0Id,
        productId,
        quantity: -1,
      });
      setCartItems(mapCartItems(res.data));
    } catch (error) {
      console.error("Decrease quantity failed:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) return;

    try {
      await axios.delete(`${config.BASE_URL}/api/cart/clear`, {
        data: { auth0Id: user.auth0Id },
      });
      setCartItems([]);
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert(error.response?.data?.message || "Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decrease,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
