import * as z from "zod";

export const UserValidation = z.object({
    profile_photo: z.array(z.instanceof(File)).optional(),
    name: z
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(30, { message: "Maximum 30 characters." }),
    
    password: z
        .string()
        .min(8, {message : "Minimum 8 characters"})
        .max(24, { message: "Maximum 24 characters" }),
    email: z
    .string()
    .email("Invalid email address"),
    
    
});
export const loginValidation = z.object({
    email: z
    .string()
    .email("Invalid email address"),
    password: z
    .string()
    .min(8, {message: "Minimum 8 characters"})
    .max(24,{message: "Maximum 24 characters"})
})