const API_BASE_URL = import.meta.env.VITE_APP_PORT;

export interface Rental {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: "apartment" | "house" | "condo" | "studio";
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  available: boolean;
  landlord: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateRentalData {
  title: string;
  description: string;
  price: number;
  location: string;
  type: "apartment" | "house" | "condo" | "studio";
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  landlord: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface RentalFilters {
  title?: string;
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  available?: boolean;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Get all rentals with optional filters
  async getRentals(
    filters?: RentalFilters
  ): Promise<{ success: boolean; data: Rental[]; count: number }> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = queryParams.toString()
      ? `/rentals?${queryParams}`
      : "/rentals";
    return this.request(endpoint);
  }

  // Get rental by ID
  async getRental(id: string): Promise<{ success: boolean; data: Rental }> {
    return this.request(`/rentals/${id}`);
  }

  // Create new rental
  async createRental(
    data: CreateRentalData
  ): Promise<{ success: boolean; data: Rental; message: string }> {
    return this.request("/rentals", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Update rental
  async updateRental(
    id: string,
    data: Partial<CreateRentalData>
  ): Promise<{ success: boolean; data: Rental; message: string }> {
    return this.request(`/rentals/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Delete rental
  async deleteRental(
    id: string
  ): Promise<{ success: boolean; data: Rental; message: string }> {
    return this.request(`/rentals/${id}`, {
      method: "DELETE",
    });
  }

  // Get rental statistics
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getRentalStats(): Promise<{ success: boolean; data: any }> {
    return this.request("/rentals/stats");
  }

  // Health check
  async healthCheck(): Promise<{ message: string; timestamp: string }> {
    return this.request("/health");
  }
}

export const apiService = new ApiService();
