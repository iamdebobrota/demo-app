import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Rental, CreateRentalData } from "../services/api";

interface RentalFormProps {
  rental?: Rental;
  onSubmit: (data: CreateRentalData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function RentalForm({
  rental,
  onSubmit,
  onCancel,
  isLoading,
}: RentalFormProps) {
  const [formData, setFormData] = useState<CreateRentalData>({
    title: "",
    description: "",
    price: 0,
    location: "",
    type: "apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    amenities: [],
    images: [],
    landlord: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [amenityInput, setAmenityInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (rental) {
      setFormData({
        title: rental.title,
        description: rental.description,
        price: rental.price,
        location: rental.location,
        type: rental.type,
        bedrooms: rental.bedrooms,
        bathrooms: rental.bathrooms,
        area: rental.area,
        amenities: rental.amenities || [],
        images: rental.images || [],
        landlord: rental.landlord || { name: "", email: "", phone: "" },
      });
    }
  }, [rental]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLandlordChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      landlord: {
        ...prev.landlord,
        [field]: value,
      },
    }));
  };

  const addAmenity = () => {
    if (
      amenityInput.trim() &&
      !formData.amenities.includes(amenityInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const removeImage = (image: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{rental ? "Edit Rental" : "Add New Rental"}</CardTitle>
        <CardDescription>
          {rental
            ? "Update the rental information"
            : "Fill in the details for the new rental property"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Property title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Property location"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Property description"
              className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type *</label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", Number(e.target.value))
                }
                placeholder="Monthly rent"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bedrooms</label>
              <Input
                type="number"
                value={formData.bedrooms}
                onChange={(e) =>
                  handleInputChange("bedrooms", Number(e.target.value))
                }
                placeholder="0"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bathrooms</label>
              <Input
                type="number"
                value={formData.bathrooms}
                onChange={(e) =>
                  handleInputChange("bathrooms", Number(e.target.value))
                }
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Area (sq ft)</label>
            <Input
              type="number"
              value={formData.area}
              onChange={(e) =>
                handleInputChange("area", Number(e.target.value))
              }
              placeholder="Square footage"
              min="0"
            />
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amenities</label>
            <div className="flex gap-2">
              <Input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add amenity"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addAmenity())
                }
              />
              <Button type="button" onClick={addAmenity} variant="outline">
                Add
              </Button>
            </div>
            {formData.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="text-gray-500 hover:text-red-500">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Images</label>
            <div className="flex gap-2">
              <Input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Image URL"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addImage())
                }
              />
              <Button type="button" onClick={addImage} variant="outline">
                Add
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
                    Image {index + 1}
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="text-gray-500 hover:text-red-500">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Landlord Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Landlord Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.landlord.name}
                  onChange={(e) => handleLandlordChange("name", e.target.value)}
                  placeholder="Landlord name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.landlord.email}
                  onChange={(e) =>
                    handleLandlordChange("email", e.target.value)
                  }
                  placeholder="landlord@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={formData.landlord.phone}
                  onChange={(e) =>
                    handleLandlordChange("phone", e.target.value)
                  }
                  placeholder="+1-555-0123"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : rental
                ? "Update Rental"
                : "Create Rental"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
