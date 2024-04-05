import { object, string } from "zod";

export const loginSchema = object({
    email: string().email(),
    password: string().min(6),
});

export const registerSchema = object({
    username: string().min(1),
    email: string().email(),
    password: string().min(6),
});

function getUsernameError(error) {
    switch (error.code) {
        case "too_small":
            return "Username must contain at least 1 character";
        default:
            return "Invalid username";
    }
}

function getEmailError(error) {
    switch (error.code) {
        case "invalid_email":
            return "Invalid email format";
        default:
            return "Invalid email";
    }
}

function getPasswordError(error) {
    switch (error.code) {
        case "too_small":
            return "Password must contain at least 6 characters";
        default:
            return "Invalid password";
    }
}

const validateRegisterForm = (formData) => {
    let errors = {};
    try {
        loginSchema.parse(formData);
    } catch (error) {
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "username":
                        errors.username = getUsernameError(err);
                        break;
                    case "email":
                        errors.email = getEmailError(err);
                        break;
                    case "password":
                        errors.password = getPasswordError(err);
                        break;
                    default:
                        errors._generic =
                            "An error occurred. Please try again.";
                }
            });
        } else {
            errors._generic = "An error occurred. Please try again.";
        }
    }
    return errors;
};

const validateLoginForm = (formData) => {
    let errors = {};
    try {
        loginSchema.parse(formData);
    } catch (error) {
        console.log(error);
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "email":
                        errors.email = getEmailError(err);
                        break;
                    case "password":
                        errors.password = getPasswordError(err);
                        break;
                    default:
                        errors._generic =
                            "An error occurred. Please try again.";
                }
            });
        } else {
            errors._generic = "An error occurred. Please try again.";
        }
    }
    return errors;
};

export { validateLoginForm, validateRegisterForm };
