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

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json(false);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json(false);
    }

    res.status(200).json(true);

})