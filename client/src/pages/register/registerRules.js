import { z } from "zod";

// export const emailRules = {
//     type:"string",
//     includes:{
//         value:"@",
//         errorMessage:"email must include @"
//     }
// };

// export const passwordRules = {
//     "type":"string",
//     "minLength":8
// };

// export const fullNameRules = {
//     "type":"string"
// };

const passwordIncludes = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const schema = z.object({
    email: z.string().includes("@", {message:"Email must include @"}),
    password: z.string().min(8, {message:"Password must contain at least 8 characters"})
    .regex(passwordIncludes, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
    fullName: z.string().min(2, {message:"Full Name should be at least 2 characters"}),
  })