import asyncHandler from "express-async-handler"
import UserModel from "../../modules/auth/UserModel.js";
import jwt from "jsonwebtoken";


export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: `User with id ${id} deleted.` });
    } catch (error) {
        res.status(500).json({ message: `Failed to delete user. ${error.message}` });
    }
});

export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: `Failed to find users. ${error}` });
    }
});

export const getUserLoginStatus = asyncHandler(async (req, res) => {
    
    // Retrieve the token from cookies
    const token = req.cookies.token;

    // If no token is found, respond with 401 (Unauthorized) and `false`
    if (!token) {
        return res.status(200).json(false);
    }

    // Verify the token using the JWT_SECRET from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is invalid or decoding fails, respond with 401 (Unauthorized) and `false`
    if (!decoded) {
        return res.status(200).json(false);
    }

    // If the token is valid, respond with 200 (OK) and `true`
    res.status(200).json(true);

});