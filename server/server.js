const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


const PORT = 3000;

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is running on port " + PORT);
    else
        console.log("Error occured,server can't start", error);
})