const express = require("express");
const { addToCart, getCart, removeFromCart, clearCart } = require("../controllers/cartController");
const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

// Ensure only authenticated users can use cart APIs
router.post("/add", addToCart);
router.get("/", requiresAuth(), getCart);
router.delete("/remove", requiresAuth(), removeFromCart);
router.delete("/clear", requiresAuth(), clearCart);

module.exports = router;
