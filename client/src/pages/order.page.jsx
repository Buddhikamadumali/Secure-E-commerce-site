import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import config from "../config";

function OrderPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/orders`, {
          withCredentials: true,
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        Please login to view orders
      </p>
    );
  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-400">No orders found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-semibold">Total Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Purchase Date:</span>{" "}
                {new Date(order.purchaseDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setSelectedOrder(order)}
              className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Popup modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-orange-500">
              Order Details
            </h2>

            <p>
              <span className="font-semibold">Order ID:</span>{" "}
              {selectedOrder._id}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {selectedOrder.status}
            </p>
            <p>
              <span className="font-semibold">Payment:</span>{" "}
              {selectedOrder.paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              {selectedOrder.mobileNumber}
            </p>
            <p>
              <span className="font-semibold">Purchase Date:</span>{" "}
              {new Date(selectedOrder.purchaseDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Preferred Time:</span>{" "}
              {selectedOrder.preferredDeliveryTime}
            </p>
            <p>
              <span className="font-semibold">Delivery Location:</span>{" "}
              {selectedOrder.preferredDeliveryLocation}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {selectedOrder.address.displayName},{" "}
              {selectedOrder.address.addressLine1},{" "}
              {selectedOrder.address.addressLine2 &&
                selectedOrder.address.addressLine2 + ","}{" "}
              {selectedOrder.address.street}, {selectedOrder.address.state},{" "}
              {selectedOrder.address.country}
            </p>

            <h3 className="text-lg font-semibold mt-4">Items:</h3>
            <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
              {selectedOrder.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-700 p-2 rounded flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div>${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
