import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';

const districts = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Galle"]; // example list
const deliveryTimes = ["10 AM", "11 AM", "12 PM"];

function OrderSubmitForm() {
  const { cartItems, setCartItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobileNumber: "",
    addressLine1: "",
    addressLine2: "",
    street: "",
    state: "",
    country: "",
    displayName: "",
    paymentMethod: "",
    purchaseDate: "",
    preferredDeliveryTime: "",
    preferredDeliveryLocation: "",
  });
  const [error, setError] = useState("");

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        Please login to place order
      </p>
    );
  if (cartItems.length === 0)
    return <p className="text-center mt-10 text-red-500">Your cart is empty</p>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.mobileNumber ||
      !form.addressLine1 ||
      !form.street ||
      !form.state ||
      !form.country ||
      !form.displayName ||
      !form.paymentMethod ||
      !form.purchaseDate ||
      !form.preferredDeliveryTime ||
      !form.preferredDeliveryLocation
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${config.BASE_URL}/api/orders`,
        {
          mobileNumber: form.mobileNumber,
          address: {
            country: form.country,
            addressLine1: form.addressLine1,
            addressLine2: form.addressLine2,
            street: form.street,
            state: form.state,
            displayName: form.displayName,
          },
          paymentMethod: form.paymentMethod,
          purchaseDate: form.purchaseDate,
          preferredDeliveryTime: form.preferredDeliveryTime,
          preferredDeliveryLocation: form.preferredDeliveryLocation,
        },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      setCartItems([]);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setError("Failed to place order");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Checkout</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-4 p-4 bg-gray-700 rounded">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between mb-1">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          Total: <span>${totalPrice}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="displayName"
          placeholder="Full Name"
          value={form.displayName}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={form.street}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={form.addressLine1}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          value={form.addressLine2}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash On Delivery">Cash On Delivery</option>
        </select>

        {/* New tracking fields */}
        <label className="block">
          Purchase Date:
          <input
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={handleChange}
            className="w-full p-2 rounded"
            min={new Date().toISOString().split("T")[0]}
          />
        </label>

        <label className="block">
          Preferred Delivery Time:
          <select
            name="preferredDeliveryTime"
            value={form.preferredDeliveryTime}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option value="">Select Time</option>
            {deliveryTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Preferred Delivery Location:
          <select
            name="preferredDeliveryLocation"
            value={form.preferredDeliveryLocation}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="bg-orange-500 w-full py-2 rounded mt-2 hover:bg-orange-600 font-bold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderSubmitForm;
