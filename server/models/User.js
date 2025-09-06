const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, unique: true, required: true }, // Unique ID from Auth0
  username: { type: String }, // optional username if you want separate from name
  name: { type: String },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, default: "" }, // user can update later
  country: { type: String, default: "" },       // user can update later
  picture: { type: String }, // profile picture from Auth0
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
