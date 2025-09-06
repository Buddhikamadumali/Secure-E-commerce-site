const Order = require("../models/order");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add new order
exports.addOrder = async (req, res) => {
  try {
    const userEmail = req.oidc.user.email;

    const user = await User.findOne({ email: userEmail });
    const cart = await Cart.findOne({ userEmail }).populate("items.product");

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const {
      mobileNumber,
      address,
      paymentMethod,
      purchaseDate,
      preferredDeliveryTime,
      preferredDeliveryLocation
    } = req.body;

    // Map cart items to order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const order = new Order({
      userEmail: user.email,
      mobileNumber,
      address,
      items: orderItems,
      paymentMethod,
      purchaseDate,
      preferredDeliveryTime,
      preferredDeliveryLocation
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const userEmail = req.oidc.user.email;
    const orders = await Order.find({ userEmail }).populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
