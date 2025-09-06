const express = require("express");
const {addOrder,getAllOrders} = require("../controllers/orderController");
const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

// Ensure only authenticated users can use cart APIs
router.post("/", addOrder);
router.get("/", getAllOrders);

module.exports = router;
