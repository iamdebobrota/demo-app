import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { RentalCard } from "./components/RentalCard";
import { RentalForm } from "./components/RentalForm";
import {
  apiService,
  type Rental,
  type CreateRentalData,
  type RentalFilters,
} from "./services/api";
import { Plus, Search, Home, Users, DollarSign } from "lucide-react";
import "./App.css";

function App() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRental, setEditingRental] = useState<Rental | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<RentalFilters>({
    type: "",
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    available: undefined,
  });

  // Load rentals
  const loadRentals = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchFilters: RentalFilters = {
        ...filters,
        title: searchTerm || undefined,
        location: searchTerm || undefined,
      };

      const response = await apiService.getRentals(searchFilters);
      setRentals(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rentals");
    } finally {
      setLoading(false);
    }
  };

  // Load statistics
  const loadStats = async () => {
    try {
      const response = await apiService.getRentalStats();
      setStats(response.data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  useEffect(() => {
    loadRentals();
    loadStats();
  }, [searchTerm, filters]);

  // Handle form submission
  const handleSubmit = async (data: CreateRentalData) => {
    try {
      setIsSubmitting(true);

      if (editingRental) {
        await apiService.updateRental(editingRental.id, data);
      } else {
        await apiService.createRental(data);
      }

      setIsFormOpen(false);
      setEditingRental(undefined);
      await loadRentals();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save rental");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (rental: Rental) => {
    setEditingRental(rental);
    setIsFormOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rental?")) return;

    try {
      await apiService.deleteRental(id);
      await loadRentals();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete rental");
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingRental(undefined);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      type: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      available: undefined,
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Rental App</h1>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingRental(undefined)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rental
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingRental ? "Edit Rental" : "Add New Rental"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingRental
                      ? "Update the rental information below."
                      : "Fill in the details for the new rental property."}
                  </DialogDescription>
                </DialogHeader>
                <RentalForm
                  rental={editingRental}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isLoading={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Rentals
                </CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.available}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Price
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.averagePrice.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Price Range
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.priceRange.min.toLocaleString()} - $
                  {stats.priceRange.max.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={filters.type || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: value === "all" ? undefined : value,
                  }))
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
              />

              <Input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
              />

              <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setError(null)}
                className="mt-2">
                Dismiss
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading rentals...</p>
            </div>
          </div>
        )}

        {/* Rentals Grid */}
        {!loading && (
          <>
            {rentals.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No rentals found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ||
                      Object.values(filters).some(
                        (f) => f !== undefined && f !== ""
                      )
                        ? "Try adjusting your search criteria"
                        : "Get started by adding your first rental property"}
                    </p>
                    {!searchTerm &&
                      !Object.values(filters).some(
                        (f) => f !== undefined && f !== ""
                      ) && (
                        <Button onClick={() => setIsFormOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Rental
                        </Button>
                      )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentals.map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
