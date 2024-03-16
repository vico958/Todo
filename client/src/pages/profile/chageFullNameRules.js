import { z } from "zod"
import { fullNameRules } from "../../services/schemasRules";

export const schema = z.object({
    password: z.string(),
    fullName: z.string().min(fullNameRules.length, {message:fullNameRules.errorMessage}),
})