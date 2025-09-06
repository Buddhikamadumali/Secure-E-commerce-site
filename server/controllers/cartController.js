const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

// Add items to the cart
exports.addToCart = async (req, res) => {
  try {
    
    console.log("coming to add to cart0")
    const { productId, quantity } = req.body;

    console.log("coming to add to cart1")
    // Get the logged-in user's email from OIDC
    const userEmail =  req.oidc.user.email;

    console.log("coming to add to cart2")
    // Check if product exists
    console.log("product",productId)
    const existingProduct = await Product.findById(productId);
    console.log("ëxsit",existingProduct)
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    // Check if product already exists in the cart
    const productIndex = cart.items.findIndex(
      (p) => p.product?.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;

      // Remove item if quantity goes 0 or less
      if (cart.items[productIndex].quantity <= 0) {
        cart.items.splice(productIndex, 1);
      }
    } else {
      // Only add if quantity > 0
      if (quantity > 0) {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    // Populate product details when sending response
    const populatedCart = await Cart.findOne({ userEmail }).populate("items.product");

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the cart for a user
exports.getCart = async (req, res) => {
  try {
   
    const userEmail = req.oidc.user.email;
     
    const cart = await Cart.findOne({ userEmail }).populate("items.product");
   console.log("populate",cart)
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { product } = req.body;
    const userEmail = req.oidc.user.email;

    let cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((p) => p.product.toString() !== product);

    await cart.save();

    const populatedCart = await Cart.findOne({ userEmail }).populate("items.product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
  try {
    const userEmail = req.oidc.user.email;

    let cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error while clearing cart" });
  }
};
