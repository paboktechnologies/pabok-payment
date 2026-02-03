const express = require("express");
const Razorpay = require("razorpay");
const Student = require("../models/Student");

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    // 1. Save student
    const student = await Student.create(req.body);

    // 2. Create Razorpay order
    const order = await razorpay.orders.create({
      amount: 999 * 100, // ₹999 in paise
      currency: "INR",
      receipt: "receipt_" + student._id,
    });

    // 3. Send response
    res.json({
      order,
      studentId: student._id,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

module.exports = router;
