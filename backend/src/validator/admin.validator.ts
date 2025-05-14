import { z } from "zod";


export const adminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.literal("admin").optional(),
  createdAt: z.date().optional() 
});


export type AdminInput = z.infer<typeof adminSchema>;
