// path:src/schema/loginSchema.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const movieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  duration: z.number().min(1),
  language: z.array(z.string()).min(1),
  genre: z.array(z.string()).min(1),
  releaseDate: z.string().optional(),
  poster: z.array(z.string()).optional(),
});

export const theatreSchema = z.object({
  name: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  address: z.string().optional(),
  screens: z.number().min(1),
});

export const showSchema = z.object({
  theatre: z.object({
    id: z.string(),
    name: z.string(),
  }),
  movie: z.object({
    id: z.string(),
    title: z.string(),
  }),
  showTime: z.string().min(1, "Show time is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  totalSeats: z.number().min(1),
});
