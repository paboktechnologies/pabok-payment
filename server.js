const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route (Render check)
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

// ✅ Payment routes
app.use("/api/payment", require("./routes/paymentRoutes"));

// Port (Render uses process.env.PORT)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
