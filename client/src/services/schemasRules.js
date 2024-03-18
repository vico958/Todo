const passwordLength = 8;
const fullNameLength = 2;
// /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
export const passwordMustContain = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and cant contain white spaces"

export const passwordIncludesRules = {
    rule: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s])(?!.*\s).{8,}$/,
    errorMessage:passwordMustContain
}

export const passwordLengthRules = {
    length:passwordLength,
    errorMessage:`Password must contain at least ${passwordLength} characters`
}

export const fullNameRules = {
    length:fullNameLength,
    errorMessage : `Full Name should be at least ${fullNameLength} characters`
}