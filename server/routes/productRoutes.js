const express = require("express");
const { createProduct, getProducts, getProductById } = require("../controllers/productController");
const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

// Only authenticated users can create a product
router.post("/", requiresAuth(), createProduct);

// Anyone can view products
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
