import { rentalStorage } from "../models/Rental.js";

// Validation helper
const validateRentalData = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push("Description is required");
  }

  if (!data.price || isNaN(data.price) || data.price <= 0) {
    errors.push("Valid price is required");
  }

  if (!data.location || data.location.trim().length === 0) {
    errors.push("Location is required");
  }

  if (
    !data.type ||
    !["apartment", "house", "condo", "studio"].includes(data.type)
  ) {
    errors.push("Type must be one of: apartment, house, condo, studio");
  }

  if (
    data.bedrooms !== undefined &&
    (isNaN(data.bedrooms) || data.bedrooms < 0)
  ) {
    errors.push("Bedrooms must be a non-negative number");
  }

  if (
    data.bathrooms !== undefined &&
    (isNaN(data.bathrooms) || data.bathrooms < 0)
  ) {
    errors.push("Bathrooms must be a non-negative number");
  }

  if (data.area !== undefined && (isNaN(data.area) || data.area <= 0)) {
    errors.push("Area must be a positive number");
  }

  return errors;
};

// Get all rentals
const getAllRentals = (req, res) => {
  try {
    const { search, ...queryParams } = req.query;

    let rentals;
    if (search || Object.keys(queryParams).length > 0) {
      rentals = rentalStorage.search(req.query);
    } else {
      rentals = rentalStorage.getAll();
    }

    res.json({
      success: true,
      data: rentals,
      count: rentals.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rentals",
      error: error.message,
    });
  }
};

// Get rental by ID
const getRentalById = (req, res) => {
  try {
    const { id } = req.params;
    const rental = rentalStorage.getById(id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    res.json({
      success: true,
      data: rental.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rental",
      error: error.message,
    });
  }
};

// Create new rental
const createRental = (req, res) => {
  try {
    const validationErrors = validateRentalData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    const rental = rentalStorage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Rental created successfully",
      data: rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create rental",
      error: error.message,
    });
  }
};

// Update rental
const updateRental = (req, res) => {
  try {
    const { id } = req.params;
    const existingRental = rentalStorage.getById(id);

    if (!existingRental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    const validationErrors = validateRentalData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    const updatedRental = rentalStorage.update(id, req.body);

    res.json({
      success: true,
      message: "Rental updated successfully",
      data: updatedRental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update rental",
      error: error.message,
    });
  }
};

// Delete rental
const deleteRental = (req, res) => {
  try {
    const { id } = req.params;
    const deletedRental = rentalStorage.delete(id);

    if (!deletedRental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    res.json({
      success: true,
      message: "Rental deleted successfully",
      data: deletedRental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete rental",
      error: error.message,
    });
  }
};

// Get rental statistics
const getRentalStats = (req, res) => {
  try {
    const rentals = rentalStorage.getAll();

    const stats = {
      total: rentals.length,
      available: rentals.filter((r) => r.available).length,
      unavailable: rentals.filter((r) => !r.available).length,
      averagePrice:
        rentals.length > 0
          ? Math.round(
              rentals.reduce((sum, r) => sum + r.price, 0) / rentals.length
            )
          : 0,
      byType: rentals.reduce((acc, rental) => {
        acc[rental.type] = (acc[rental.type] || 0) + 1;
        return acc;
      }, {}),
      priceRange:
        rentals.length > 0
          ? {
              min: Math.min(...rentals.map((r) => r.price)),
              max: Math.max(...rentals.map((r) => r.price)),
            }
          : { min: 0, max: 0 },
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rental statistics",
      error: error.message,
    });
  }
};

export {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getRentalStats,
};
