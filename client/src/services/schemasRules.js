const passwordLength = 8;
const fullNameLength = 2;

export const passwordIncludesRules = {
    rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    errorMessage:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
}

export const passwordLengthRules = {
    length:passwordLength,
    errorMessage:`Password must contain at least ${passwordLength} characters`
}

export const fullNameRules = {
    length:fullNameLength,
    errorMessage : `Full Name should be at least ${fullNameLength} characters`
}