import { z } from "zod";
import { passwordIncludesRules, passwordLengthRules, fullNameRules } from "../../services/schemasRules";

export const schema = z.object({
    email: z.string().includes("@", {message:"Email must include @"}),
    password: z.string().min(passwordLengthRules.length, {message:passwordLengthRules.errorMessage})
    .regex(passwordIncludesRules.rule, { message: passwordIncludesRules.errorMessage }),
    fullName: z.string().min(fullNameRules.length, {message:fullNameRules.errorMessage}),
  })