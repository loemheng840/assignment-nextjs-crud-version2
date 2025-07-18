// lib/schemas/carSchema.ts
import { z } from 'zod';


export const carSchema = z.object({
  id: z.string().min(1, { message: "id is required." }),
  make: z.string().min(1, { message: "Make is required." }),
  model: z.string().min(1, { message: "Model is required." }),
  year: z.number().int().min(1900, { message: "Year must be a valid year." }).max(new Date().getFullYear(), { message: "Year cannot be in the future." }),
  price: z.number().positive({ message: "Price must be a positive number." }),
  mileage: z.number().int().min(0, { message: "Mileage cannot be negative." }),
  description: z.string().optional(),
  color: z.string().min(1, { message: "Color is required." }),
  fuel_type: z.string().min(1, { message: "Fuel type is required." }),
  transmission: z.string().min(1, { message: "Transmission is required." }),
  image: z.string().url({ message: "Image must be a valid URL." }).optional(),
});

export type CarSchema = z.infer<typeof carSchema>;