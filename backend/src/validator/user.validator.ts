import { z } from 'zod';
// express-validator
export const userValidator = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["client", "developer"]),
  profile: z.object({
    bio: z.string().optional(),
    skills: z.array(z.string()).optional(),
    rating: z.number().min(0).default(0),
    reviewsCount: z.number().min(0).default(0),
  }).optional(),
  createdAt: z.date().optional(),
});