import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 charachters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be atleast 8 charachters long")
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be atleast 8 charachters long")
})