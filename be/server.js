import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/config.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import rentalRoutes from "./routes/rentals.js";

// Routes
app.use("/api/rentals", rentalRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Rental App API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Rental App Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Rentals API: http://localhost:${PORT}/api/rentals`);
});
