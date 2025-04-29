import { z } from "zod";

// Admin Zod Schema
export const adminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.literal("admin").optional(), // optional because default is "admin"
  createdAt: z.date().optional() // optional because it defaults to Date.now
});

// TypeScript type inferred from the Zod schema
export type AdminInput = z.infer<typeof adminSchema>;
