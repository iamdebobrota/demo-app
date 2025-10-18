# Rental App Backend API

A simple CRUD API for managing rental properties built with Express.js.

## Features

- ✅ Create, Read, Update, Delete rental properties
- ✅ Search and filter rentals
- ✅ Rental statistics
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Sample data included

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check

- **GET** `/api/health` - Check if the API is running

### Rentals

#### Get All Rentals

- **GET** `/api/rentals`
- **Query Parameters:**
  - `title` - Filter by title (partial match)
  - `location` - Filter by location (partial match)
  - `type` - Filter by type (apartment, house, condo, studio)
  - `minPrice` - Minimum price
  - `maxPrice` - Maximum price
  - `bedrooms` - Number of bedrooms
  - `available` - Availability status (true/false)

**Example:**

```
GET /api/rentals?type=apartment&minPrice=1000&maxPrice=3000
```

#### Get Rental by ID

- **GET** `/api/rentals/:id`

#### Create New Rental

- **POST** `/api/rentals`
- **Body:**

```json
{
  "title": "Beautiful Apartment",
  "description": "A lovely 2-bedroom apartment",
  "price": 2000,
  "location": "Downtown",
  "type": "apartment",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 1000,
  "amenities": ["Parking", "Gym"],
  "images": ["https://example.com/image.jpg"],
  "landlord": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123"
  }
}
```

#### Update Rental

- **PUT** `/api/rentals/:id`
- **Body:** Same as create (partial updates supported)

#### Delete Rental

- **DELETE** `/api/rentals/:id`

#### Get Rental Statistics

- **GET** `/api/rentals/stats`
- **Response:**

```json
{
  "success": true,
  "data": {
    "total": 10,
    "available": 8,
    "unavailable": 2,
    "averagePrice": 2250,
    "byType": {
      "apartment": 5,
      "house": 3,
      "studio": 2
    },
    "priceRange": {
      "min": 1200,
      "max": 3500
    }
  }
}
```

## Data Model

### Rental Object

```json
{
  "id": "string (auto-generated)",
  "title": "string (required)",
  "description": "string (required)",
  "price": "number (required, > 0)",
  "location": "string (required)",
  "type": "string (required: apartment|house|condo|studio)",
  "bedrooms": "number (>= 0)",
  "bathrooms": "number (>= 0)",
  "area": "number (> 0, square feet)",
  "amenities": "array of strings",
  "images": "array of image URLs",
  "available": "boolean (default: true)",
  "landlord": {
    "name": "string",
    "email": "string",
    "phone": "string"
  },
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

## Response Format

All API responses follow this format:

### Success Response

```json
{
  "success": true,
  "message": "Optional success message",
  "data": "Response data",
  "count": "Number of items (for lists)"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Array of validation errors (if applicable)"]
}
```

## Sample Data

The API comes with 3 sample rental properties pre-loaded for testing.

## Testing the API

You can test the API using:

1. **curl:**

```bash
# Get all rentals
curl http://localhost:5000/api/rentals

# Create a new rental
curl -X POST http://localhost:5000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Rental","description":"A test rental","price":1500,"location":"Test City","type":"apartment"}'
```

2. **Postman** or any REST client
3. **Frontend application** (see the `fe/` directory)

## Development

The server uses nodemon for development, so it will automatically restart when files change.

```bash
npm run dev  # If you add a dev script
```

## License

ISC
