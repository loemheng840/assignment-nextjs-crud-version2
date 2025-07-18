// app/api/cars/route.ts
import { carSchema } from '@/lib/schamas/carSchema';
import { cookies } from 'next/headers'; // Available in Next.js middleware/route handlers
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = carSchema.parse(body);

    const newCar = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
    };

    // Store a dummy token in a HttpOnly cookie
    (await cookies()).set('carCreationToken', 'example-token-value', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return NextResponse.json({ message: 'Car created & token stored!', car: newCar }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error || 'Unexpected error occurred.' },
      { status: 500 }
    );
  }
}
