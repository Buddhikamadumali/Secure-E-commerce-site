import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, addToCart, removeFromCart, decrease, setCartItems } =
    useCart();
  const { user } = useUser();

  const navigate = useNavigate();

  const handleIncrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      addToCart({ _id: id }, 1, user?._id);
    }
  };

  const handleDecrement = (id, quantity) => {
    decrease(id, quantity, user?._id);
  };

  const handleRemove = (id) => {
    removeFromCart(id, user?._id);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(user);
  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500 mt-30">
        Please log in to view your cart.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-400">Your cart is empty</p>
          <img
            src="/Shopping Cart.gif"
            alt="Empty Cart"
            className="w-64 h-64"
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              quantity={item.quantity}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id, item.quantity)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}

          <div className="bg-gray-800 p-4 rounded-lg mt-6 shadow-md flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total:</h2>
            <span className="text-xl font-bold text-orange-500">
              ${totalPrice}
            </span>
          </div>
          <button
            className="mt-4 w-full bg-orange-500 py-2 rounded hover:bg-orange-600 transition"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
