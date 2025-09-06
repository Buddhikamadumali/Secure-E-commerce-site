const Product = require("../models/Product");

// Create a new product (only authenticated users)
exports.createProduct = async (req, res) => {
  try {
    // Optionally, you can check role here if you add role-based access
    // const userRole = req.oidc.user.role;
    // if (userRole !== 'admin') return res.status(403).json({ message: "Forbidden" });

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (public)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID (public)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
