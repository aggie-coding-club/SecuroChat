const bcrypt = require('bcrypt');

// Ideally, extract this to an environment variable or config
const SALT_ROUNDS = 10;

/**
 * Hashes a plaintext password.
 * 
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password.");
    }
};

/**
 * Verifies a plaintext password against a hashed password.
 * 
 * @param {string} password - The plaintext password.
 * @param {string} hashedPassword - The hashed version of the password.
 * @returns {Promise<boolean>} - True if the passwords match, otherwise false.
 */
const verifyPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        throw new Error("Failed to verify password.");
    }
};

module.exports = { hashPassword, verifyPassword };
