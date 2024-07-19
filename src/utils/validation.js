import { object, string } from "zod";

const loginSchema = object({
    email: string().email(),
    password: string().min(6),
});

const registerSchema = object({
    username: string().min(1),
    email: string().email(),
    password: string().min(6),
});

const createPostSchema = object({
    title: string().min(1),
    textContent: string().max(1000),
});

const createCommentSchema = object({
    content: string().max(500),
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

function getTitleError(error) {
    switch (error.code) {
        case "too_small":
            return "Title must contain at least 1 character";
        default:
            return "Invalid title";
    }
}

function getTextContentError(error) {
    switch (error.code) {
        case "too_large":
            return "Character length exceeded";
        case "too_small":
            return "Comment cannot be empty";
        default:
            return "Invalid password";
    }
}

function getMediaError(error) {
    switch (error.code) {
        case "invalid_url":
            return "Invalid URL format";
        default:
            return "Invalid media URL";
    }
}

const validateRegisterForm = (formData) => {
    let errors = {};
    try {
        registerSchema.parse(formData);
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

const validatePostForm = (formData) => {
    let errors = {};
    try {
        createPostSchema.parse(formData);
    } catch (error) {
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "title":
                        errors.title = getTitleError(err);
                        break;
                    case "textContent":
                        errors.textContent = getTextContentError(err);
                        break;
                    // case "media":
                    //     errors.media = getMediaError(err);
                    //     break;
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

const validateCommentForm = (formData) => {
    let errors = {};
    try {
        createCommentSchema.parse(formData);
    } catch (error) {
        console.log(error);
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "textContent":
                        errors.textContent = getTextContentError(err);
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

export {
    validateLoginForm,
    validateRegisterForm,
    validatePostForm,
    validateCommentForm,
};
