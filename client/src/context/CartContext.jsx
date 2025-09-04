import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // ✅ Import auth context
import axios from "axios";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn, token } = useAuth(); // ✅ check if user is logged in

  // Helper function to map backend cart items to frontend-friendly structure
  const mapCartItems = (items) => {
  return (items || []).map((item) => ({
    id: item?.product?._id || "",
    name: item?.product?.name || "",
    price: item?.product?.price || 0,
    image: item?.product?.image || "",
    quantity: item?.quantity || 0,
  }));
};


  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:3000/api/cart", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setCartItems(mapCartItems(res.data?.items || res.data?.cart?.items)))
        .catch((err) => console.log(err));
        
    } else {
      setCartItems([]);
    }
    
  }, [isLoggedIn, token]);

  // Add to Cart (protected)
  const addToCart = async (product, quantity) => {
    if (!isLoggedIn) {
      alert("Please log in to add products to the cart!");
      return false;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/add",
        { product: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(mapCartItems(res.data?.items || res.data?.cart?.items));
      return true;
    } catch (error) {
      console.log(error);
      alert("Failed to add item to cart");
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { product: productId },
      });

      
      setCartItems(mapCartItems(res.data?.items || res.data?.cart?.items));
    } catch (error) {
      console.log(error);
    }
  };

  // Decrease quantity
  const decrease = async (productId,quantity) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/cart/add",
      { product: productId, quantity: -1 }, // ✅ productId is fine here
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(res);
    setCartItems(mapCartItems(res.data?.items || res.data?.cart?.items));
  } catch (error) {
    console.log(error);
  }
};


  // Clear cart locally (and optionally backend)
  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:3000/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]); // Clear frontend state
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert(error.response?.data?.message || "Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, decrease, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
