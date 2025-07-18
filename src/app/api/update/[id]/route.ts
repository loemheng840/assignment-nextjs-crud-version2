// app/api/update/[id]/route.ts
import { NextResponse } from 'next/server';
import { carSchema } from '../../../../lib/schamas/carSchema'; // Adjust path if needed

// In a real application, you would have a database or in-memory store
// For demonstration, let's use a simple in-memory store
constcars: Array<carSchema & { id: string }> = [
  {
    id: "abc123def",
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 22000,
    mileage: 30000,
    description: "Well-maintained, single owner.",
    color: "Blue",
    fuel_type: "Gasoline",
    transmission: "Automatic",
    image: "https://placehold.co/600x400/0000FF/FFFFFF?text=Honda+Civic"
  },
  {
    id: "ghi456jkl",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    mileage: 5000,
    description: "Electric vehicle, long range.",
    color: "White",
    fuel_type: "Electric",
    transmission: "Automatic",
    image: "https://placehold.co/600x400/FFFFFF/000000?text=Tesla+Model+3"
  }
];

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    // Validate the incoming data using Zod
    const validatedData = carSchema.parse(body);

    // Find the car in our mock database
    const carIndex = cars.findIndex(car => car.id === id);

    if (carIndex === -1) {
      return NextResponse.json({ message: 'Car not found.' }, { status: 404 });
    }

    // Update the car data
    cars[carIndex] = { ...cars[carIndex], ...validatedData };

    console.log(`Car with ID ${id} updated:`, cars[carIndex]);

    return NextResponse.json({ message: 'Car updated successfully!', car: cars[carIndex] }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      // Zod validation errors
      if ('errors' in error && Array.isArray(error.errors)) {
        return NextResponse.json({ errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
  }
}

// You might also want a GET endpoint to fetch a single car by ID for pre-filling the form
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const car = cars.find(car => car.id === id);

    if (!car) {
      return NextResponse.json({ message: 'Car not found.' }, { status: 404 });
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ error: 'Failed to fetch car data.' }, { status: 500 });
  }
}