import { z } from "zod";
import { passwordIncludesRules, passwordLengthRules } from "../../services/schemasRules";

export const schema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(passwordLengthRules.length, {message:passwordLengthRules.errorMessage})
    .regex(passwordIncludesRules.rule, { message: passwordIncludesRules.errorMessage }),
    repeatNewPassword: z.string().min(passwordLengthRules.length, {message:passwordLengthRules.errorMessage})
    .regex(passwordIncludesRules.rule, { message: passwordIncludesRules.errorMessage }),
  }).refine(data => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"],
  });