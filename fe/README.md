# Rental App Frontend

A modern React frontend for the Rental App built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete rental properties
- ✅ **Search & Filter**: Search by title/location, filter by type, price range, bedrooms
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Modern UI**: Beautiful components using shadcn/ui
- ✅ **Real-time Statistics**: Dashboard with rental statistics
- ✅ **Form Validation**: Client-side validation for all forms
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Loading States**: Smooth loading indicators

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Radix UI** for accessible primitives
- **Lucide React** for icons
- **Vite** for build tooling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## API Integration

The frontend communicates with the backend API through the `apiService` in `src/services/api.ts`. Make sure your backend server is running on port 5000.

## Components

### Main Components

- **App.tsx**: Main application component with state management
- **RentalCard**: Individual rental property card with actions
- **RentalForm**: Form for creating/editing rentals
- **API Service**: Centralized API communication

### UI Components (shadcn/ui)

- Button, Card, Input, Select, Dialog, Badge
- All components are fully customizable and accessible

## Features Overview

### Dashboard

- Statistics cards showing total rentals, available properties, average price, and price range
- Real-time updates when data changes

### Search & Filter

- Search by property title or location
- Filter by property type (apartment, house, condo, studio)
- Filter by price range (min/max)
- Clear all filters option

### Rental Management

- **Create**: Add new rental properties with full details
- **Read**: View all rentals in a responsive grid layout
- **Update**: Edit existing rental properties
- **Delete**: Remove rental properties with confirmation

### Property Details

- Title, description, location
- Price, type, bedrooms, bathrooms, area
- Amenities list
- Property images
- Landlord contact information
- Availability status

## Responsive Design

The app is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Error Handling

- Network error handling
- Form validation errors
- User-friendly error messages
- Loading states for better UX

## Development

### Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── RentalCard.tsx
│   └── RentalForm.tsx
├── services/
│   └── api.ts        # API service
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main app component
└── main.tsx          # App entry point
```

### Adding New Features

1. Create new components in `src/components/`
2. Add API methods in `src/services/api.ts`
3. Update types in the API service
4. Integrate with the main App component

## License

ISC
