import React from "react";

function CartItem({ product, quantity, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white rounded-lg p-4 shadow-md mb-4">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-orange-500">
          {product.name}
        </h3>
        <p className="text-gray-300 mt-1">${product.price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrement}
          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          -
        </button>
        <span className="px-3 py-1 bg-gray-700 rounded text-white">
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={onRemove}
        className="ml-4 text-red-500 hover:text-red-400 transition"
      >
        <img src="/delete-3.png" alt="Remove" />
      </button>
    </div>
  );
}

export default CartItem;
