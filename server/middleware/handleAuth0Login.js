const User = require("../models/User");

const handleAuth0Login = async (req, res, next) => {

  try {
    // req.oidc.user is provided by express-openid-connect
    const auth0User = req.oidc.user;
    console.log("auth0User",auth0User)
    if (!auth0User) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if user already exists in DB by auth0Id or email
    let user = await User.findOne({
      $or: [{ auth0Id: auth0User.sub }, { email: auth0User.email }]
    });

   

    if (!user) {
      // If not, create a new user
      user = await User.create({
        auth0Id: auth0User.sub,
        name: auth0User.name || "",
        email: auth0User.email || "",
        picture: auth0User.picture,
        contactNumber: "", // default empty
        country: ""        // default empty
      });
    } else if (!user.auth0Id) {
      // If user exists by email but doesn't have auth0Id, link it
      user.auth0Id = auth0User.sub;
      await user.save();
    }

    // Attach the user to the request for downstream middleware/routes
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth0 login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = handleAuth0Login;
