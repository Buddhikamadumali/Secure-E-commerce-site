const Cart = require("../models/Cart");
const Product = require("../models/Product");

//Add items to the cart
exports.addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Check if product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if product already exists in the cart
    const productIndex = cart.items.findIndex(
      (p) => p.product.toString() === product
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
        cart.items.push({ product, quantity });
      }
    }

    await cart.save();

    // Populate product details when sending response
    const populatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(populatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get the cart for a user
exports.getCart = async (req,res) => {
    try {
        const cart = await Cart.findOne({user: req.user._id}).populate("items.product");
        res.json(cart);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//Remove product from cart
exports.removeFromCart = async(req, res) =>{
    try{
        const{ product} = req.body;
        let cart = await Cart.findOne({user: req.user._id});

        if(!cart) return res.status(404).json({message: "Cart not found"});

        cart.items = cart.items.filter(p => p.product.toString() !== product);

        await cart.save();
         const populatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");
        res.status(200).json(populatedCart);
    }catch(error){
        res.status(500).json({error: error.message});
        
    }
};



// Clear the entire cart
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Empty the cart
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ message: "Server error while clearing cart" });
  }
};
