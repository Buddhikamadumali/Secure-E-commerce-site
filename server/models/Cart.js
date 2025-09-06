const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" ,required:true},
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // OIDC user's email
    items: [cartItemSchema]
  },
  { timestamps: true } // corrected from 'itemstamp' to 'timestamps'
);

module.exports = mongoose.model("Cart", cartSchema);
