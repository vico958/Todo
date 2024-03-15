import { z } from "zod";

const passwordIncludes = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const schema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, {message:"Password must contain at least 8 characters"})
    .regex(passwordIncludes, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
    repeatNewPassword: z.string().min(8, {message:"Password must contain at least 8 characters"})
    .regex(passwordIncludes, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
  }).refine(data => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"],
  });