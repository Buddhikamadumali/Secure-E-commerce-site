const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const User = require("../models/User");
const handleAuth0Login = require("../middleware/handleAuth0Login");

const router = express.Router();

// Profile route - fetch user from Auth0 and MongoDB
router.get("/profile", requiresAuth(), handleAuth0Login, async (req, res) => {
  const auth0User = req.oidc.user; // Auth0 user profile

  try {
    // Check if user exists in MongoDB
    let user = await User.findOne({ auth0Id: auth0User.sub });

    if (!user) {
      // If not, create a new record
      user = await User.create({
        auth0Id: auth0User.sub,
        name: auth0User.name,
        email: auth0User.email,
        picture: auth0User.picture,
        contactNumber: "", // empty until user updates
        country: ""        // empty until user updates
      });
    }

    res.json(user); // send back MongoDB user profile
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Update user profile (contact number, country, etc.)
router.put("/profile", requiresAuth(), async (req, res) => {
  try {
    const auth0User = req.oidc.user;
    const { contactNumber, country } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { auth0Id: auth0User.sub },
      { contactNumber, country },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
