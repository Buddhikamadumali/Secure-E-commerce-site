import React from "react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext"; // ✅ import your context

function CartPage() {
  const { cartItems, addToCart, removeFromCart, decrease } = useCart(); // ✅ use global cart state

  // Increment quantity
  const handleIncrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      addToCart({ _id: id },1); // ✅ reuse addToCart (it already increases quantity if exists)
    }
  };

  // Decrement quantity
  const handleDecrement = (id,quantity) => {
   decrease(id,quantity);
  };

  // Remove item
  const handleRemove = (id) => {
    removeFromCart(id); // ✅ use context method
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-400">Your cart is empty</p>
          <img src="/Shopping Cart.gif" alt="Empty Cart" className="w-64 h-64" />
          
          
        </div>
        

      ) : (
        <div className="max-w-3xl mx-auto">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              quantity={item.quantity}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id,item.quantity)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}

          {/* Total section */}
          <div className="bg-gray-800 p-4 rounded-lg mt-6 shadow-md flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total:</h2>
            <span className="text-xl font-bold text-orange-500">${totalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
