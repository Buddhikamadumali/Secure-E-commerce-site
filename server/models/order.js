const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true } // price at order time
});

const addressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  street: { type: String, required: true },
  state: { type: String, required: true },
  displayName: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: addressSchema,
    items: [orderItemSchema],
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "Pending" },
    purchaseDate: { type: Date, required: true },
    preferredDeliveryTime: { type: String, enum: ["10 AM", "11 AM", "12 PM"], required: true },
    preferredDeliveryLocation: { type: String, required: true } // district
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
