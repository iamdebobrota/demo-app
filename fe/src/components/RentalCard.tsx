import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Edit, Trash2, MapPin, Bed, Bath, Square } from "lucide-react";
import type { Rental } from "../services/api";

interface RentalCardProps {
  rental: Rental;
  onEdit: (rental: Rental) => void;
  onDelete: (id: string) => void;
}

export function RentalCard({ rental, onEdit, onDelete }: RentalCardProps) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">
              {rental.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              {rental.location}
            </CardDescription>
          </div>
          <Badge variant={rental.available ? "default" : "secondary"}>
            {rental.available ? "Available" : "Rented"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Image */}
        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
          {rental.images && rental.images.length > 0 ? (
            <img
              src={rental.images[0]}
              alt={rental.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 line-clamp-2">
            {rental.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {rental.bedrooms} bed{rental.bedrooms !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {rental.bathrooms} bath{rental.bathrooms !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {rental.area} sq ft
            </div>
          </div>

          {/* Amenities */}
          {rental.amenities && rental.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {rental.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {rental.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{rental.amenities.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${rental.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(rental)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(rental.id)}
              className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Landlord Info */}
        {rental.landlord && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            <p>Contact: {rental.landlord.name}</p>
            <p>{rental.landlord.email}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
