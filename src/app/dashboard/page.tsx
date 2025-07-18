"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
// import { carSchema } from '@/lib/schamas/carSchema';
// import { useRouter } from 'next/navigation';
// import { string } from 'zod';

export default function DashboardPage() {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const accessToken = getCookie('accessToken');
  console.log("accessToken: ", accessToken);

  interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    description?: string;
    color: string;
    fuel_type: string;
    transmission: string;
    image?: string;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const mockCarIds = ["abc123def", "ghi456jkl"];
      const fetchedCars: Car[] = [];

      for (const id of mockCarIds) {
        const response = await fetch(`/api/update/${id}`);
        if (response.ok) {
          const car = await response.json();
          fetchedCars.push(car);
        }
      }

      setCars(fetchedCars);
    } catch (err: unknown) {
      let errorMessage = "Failed to load cars.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const response = await fetch(`/api/delete/${carId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete car.");
      }

      toast.success("Car deleted successfully! 🗑️");
      fetchCars(); // Refresh list
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(`Error deleting car: ${errorMessage}`);
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  },);

  if (loading) return <div className="text-center py-8">Loading cars...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (cars.length === 0) return <div className="text-center py-8">No cars found. Create one!</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Car Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id}>
            <CardHeader>
              <CardTitle>{car.make} {car.model}</CardTitle>
              <CardDescription>{car.year} - {car.color}</CardDescription>
            </CardHeader>
            <CardContent>
              {car.image && (
                <div className="mb-4">
                  <img src={""} width={500} height={500} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover rounded-md" />
                </div>
              )}
              <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
              <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</p>
              <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              {car.description && <p className="mt-2 text-sm text-gray-600">{car.description}</p>}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Link href={`/update/${car.id}`} passHref>
                <Button variant="outline">Edit ✏️</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(car.id)}>
                Delete 🗑️
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
