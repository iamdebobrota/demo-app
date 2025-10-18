import express from "express";
import {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getRentalStats,
} from "../controllers/rentalController.js";

const router = express.Router();

// GET /api/rentals - Get all rentals (with optional search/filter)
router.get("/", getAllRentals);

// GET /api/rentals/stats - Get rental statistics
router.get("/stats", getRentalStats);

// GET /api/rentals/:id - Get rental by ID
router.get("/:id", getRentalById);

// POST /api/rentals - Create new rental
router.post("/", createRental);

// PUT /api/rentals/:id - Update rental
router.put("/:id", updateRental);

// DELETE /api/rentals/:id - Delete rental
router.delete("/:id", deleteRental);

export default router;
