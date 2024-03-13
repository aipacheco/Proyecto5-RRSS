"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (req) => {
    const { username, email, password } = req.body;
    const requiredLength = (username, min, max, field) => {
        if (username.length < min) {
            return `${field} must be at least ${min} characters long.`;
        }
        if (username.length > max) {
            return `${field} must be less than ${max} characters.`;
        }
    };
    const isInvalidPassword = (password) => {
        if (password.length < 8 || password.length > 15) {
            return "Password must be 8-15 characters long.";
        }
    };
    const isInvalidEmail = (email) => {
        if (!email) {
            return "You have to provide an email.";
        }
        const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmailRegex.test(email)) {
            return "Invalid email format.";
        }
    };
    const validationErrors = {
        isInvalidPassword: isInvalidPassword(password),
        isInvalidEmail: isInvalidEmail(email),
    };
    // llamamos a requiredLength solo si username está presente
    if (username) {
        validationErrors.requiredLength = requiredLength(username, 3, 20, "Username");
    }
    return validationErrors;
};
exports.validateUser = validateUser;
