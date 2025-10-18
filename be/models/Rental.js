// Rental data model and in-memory storage
class Rental {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.location = data.location;
    this.type = data.type; // 'apartment', 'house', 'condo', 'studio'
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.area = data.area; // in square feet
    this.amenities = data.amenities || [];
    this.images = data.images || [];
    this.available = data.available !== undefined ? data.available : true;
    this.landlord = data.landlord || {};
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  update(data) {
    Object.keys(data).forEach((key) => {
      if (key !== "id" && key !== "createdAt") {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      location: this.location,
      type: this.type,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      area: this.area,
      amenities: this.amenities,
      images: this.images,
      available: this.available,
      landlord: this.landlord,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

// In-memory storage
class RentalStorage {
  constructor() {
    this.rentals = [];
    this.initializeSampleData();
  }

  initializeSampleData() {
    const sampleRentals = [
      {
        title: "Modern Downtown Apartment",
        description:
          "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.",
        price: 2500,
        location: "Downtown, City Center",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        amenities: ["Parking", "Gym", "Pool", "Balcony", "Air Conditioning"],
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
        ],
        landlord: {
          name: "John Smith",
          email: "john@example.com",
          phone: "+1-555-0123",
        },
      },
      {
        title: "Cozy Studio Near University",
        description:
          "Perfect studio apartment for students, close to campus and public transport.",
        price: 1200,
        location: "University District",
        type: "studio",
        bedrooms: 0,
        bathrooms: 1,
        area: 500,
        amenities: ["WiFi", "Laundry", "Pet Friendly"],
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        ],
        landlord: {
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+1-555-0456",
        },
      },
      {
        title: "Family House with Garden",
        description:
          "Spacious 3-bedroom house with a beautiful garden, perfect for families.",
        price: 3200,
        location: "Suburbs, Green Valley",
        type: "house",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        amenities: [
          "Garden",
          "Garage",
          "Fireplace",
          "Pet Friendly",
          "Near Schools",
        ],
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
        ],
        landlord: {
          name: "Mike Wilson",
          email: "mike@example.com",
          phone: "+1-555-0789",
        },
      },
    ];

    sampleRentals.forEach((rentalData) => {
      const rental = new Rental(rentalData);
      this.rentals.push(rental);
    });
  }

  // CRUD operations
  getAll() {
    return this.rentals.map((rental) => rental.toJSON());
  }

  getById(id) {
    return this.rentals.find((rental) => rental.id === id);
  }

  create(data) {
    const rental = new Rental(data);
    this.rentals.push(rental);
    return rental.toJSON();
  }

  update(id, data) {
    const rental = this.getById(id);
    if (rental) {
      rental.update(data);
      return rental.toJSON();
    }
    return null;
  }

  delete(id) {
    const index = this.rentals.findIndex((rental) => rental.id === id);
    if (index !== -1) {
      const deleted = this.rentals.splice(index, 1)[0];
      return deleted.toJSON();
    }
    return null;
  }

  search(query) {
    const { title, location, type, minPrice, maxPrice, bedrooms, available } =
      query;

    return this.rentals
      .filter((rental) => {
        if (title && !rental.title.toLowerCase().includes(title.toLowerCase()))
          return false;
        if (
          location &&
          !rental.location.toLowerCase().includes(location.toLowerCase())
        )
          return false;
        if (type && rental.type !== type) return false;
        if (minPrice && rental.price < minPrice) return false;
        if (maxPrice && rental.price > maxPrice) return false;
        if (bedrooms !== undefined && rental.bedrooms !== parseInt(bedrooms))
          return false;
        if (
          available !== undefined &&
          rental.available !== (available === "true")
        )
          return false;

        return true;
      })
      .map((rental) => rental.toJSON());
  }
}

// Export singleton instance
const rentalStorage = new RentalStorage();

export { Rental, rentalStorage };
