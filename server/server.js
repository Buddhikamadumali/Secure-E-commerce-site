const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes")
const { auth ,requiresAuth} = require('express-openid-connect');
const handleAuth0Login = require('./middleware/handleAuth0Login');
const https = require('https');
const fs = require('fs');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,       
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // If logged in, redirect to frontend home page
    res.redirect(process.env.FRONTEND_URL); // your frontend URL
  } else {
    // If not logged in, redirect to login page (or frontend login route)
    res.redirect(process.env.FRONTEND_URL); // optional
  }
});


// Get logged-in user profile from MongoDB
app.get("/profile", requiresAuth(), handleAuth0Login, async (req, res) => {
  // req.user is now the MongoDB user
  res.json(req.user);
});

// Update user profile
app.put("/profile", requiresAuth(), handleAuth0Login, async (req, res) => {
  const { contactNumber, country } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { auth0Id: req.user.auth0Id },
    { contactNumber, country },
    { new: true }
  );
  res.json(updatedUser);
});


const httpsOptions = {
  key: fs.readFileSync(path.resolve('./certs/key.key')),
  cert: fs.readFileSync(path.resolve('./certs/cert.crt'))
};


const PORT = 3000;


app.use("/api/products", productRoutes);
app.use("/api/cart", requiresAuth(), cartRoutes);
app.use("/api/orders", requiresAuth(), orderRoutes);

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Backend running on https://localhost:${PORT}`);
});