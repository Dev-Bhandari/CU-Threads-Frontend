import zod from "zod";

const username = zod
    .string()
    .min(3, "Username should be minimum 3 characters")
    .refine((s) => !s.includes(" "), "Username should not contain spaces")
    .refine((value) => {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return !regex.test(value);
    }, "Username should not contain symbols");

const email = zod.string().trim().email("Invalid email");

const password = zod
    .string()
    .trim()
    .min(6, "Password should be of minimum 6 characters");

const title = zod.string().trim().min(1, "Title cannot be empty");

const textContent = zod.string().trim().min(1).max(1000);

const content = zod
    .string()
    .trim()
    .max(500, "Comment cannot be more than 500 characters");

const name = zod
    .string()
    .min(3, "Thread name should be minimum 3 characters")
    .refine((s) => !s.includes(" "), "Thread name should not contain spaces")
    .refine((value) => {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return !regex.test(value);
    }, "Thread name should not contain symbols");

const description = zod
    .string()
    .max(200, "Thread description cannot be more than 200 characters");

const loginSchema = zod.object({
    email,
    password,
});

const forgotPasswordSchema = zod.object({
    email,
});

const verifyForgotPasswordSchema = zod.object({
    password,
});

const registerSchema = zod.object({
    username,
    email,
    password,
});

const createPostSchema = zod.object({ title, textContent });

const createCommentSchema = zod.object({
    content,
});

const createThreadSchema = zod.object({
    name,
    description,
});

const validateRegisterForm = (formData) => {
    let errors = {};
    try {
        registerSchema.parse(formData);
    } catch (error) {
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "username":
                        errors.username = err.message.toString();
                        break;
                    case "email":
                        errors.email = err.message.toString();
                        break;
                    case "password":
                        errors.password = err.message.toString();
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
        console.log(error.flatten());
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "email":
                        errors.email = err.message.toString();
                        break;
                    case "password":
                        errors.password = err.message.toString();
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

const validateForgotPasswordForm = (formData) => {
    let errors = {};
    try {
        forgotPasswordSchema.parse(formData);
    } catch (error) {
        console.log(error);
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "email":
                        errors.email = err.message.toString();
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

const validateVerifyForgotPasswordForm = (formData) => {
    let errors = {};
    try {
        verifyForgotPasswordSchema.parse(formData);
    } catch (error) {
        console.log(error);
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "password":
                        errors.password = err.message.toString();
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
                        errors.title = err.message.toString();
                        break;
                    case "textContent":
                        errors.textContent = err.message.toString();
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
                        errors.textContent = err.message.toString();
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

const validateThreadForm = (formData) => {
    let errors = {};
    try {
        createThreadSchema.parse(formData);
    } catch (error) {
        console.log(error);
        if (error.errors) {
            error.errors.forEach((err) => {
                switch (err.path[0]) {
                    case "name":
                        errors.name = err.message.toString();
                        break;
                    case "description":
                        errors.description = err.message.toString();
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
    validateForgotPasswordForm,
    validateVerifyForgotPasswordForm,
    validateRegisterForm,
    validatePostForm,
    validateCommentForm,
    validateThreadForm,
};
