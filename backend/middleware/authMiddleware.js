import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { isEmptyString } from "../helpers/validation/generalValidation.js";
import UserModel from "../modules/auth/UserModel.js";
export const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (isEmptyString(token)) {
            return res.status(401).json({ message: "Not authorised, please login." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: "Not authorised, please login" });
    }
});

// Admin middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
    console.log("adminMd", req.user.role);
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "User doesn't have authorisation." });
    }
    next();
})

export const creatorMiddleware = asyncHandler(async (req, res, next) => {
    console.log("creatorMD", req.user.role);
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "creator")) {
        return res.status(403).json({ message: "User doesn't have authorisation." });
    }
    next();
})

export const verifiedMiddleware = asyncHandler(async (req, res, next) => {
    if(!req.user || !req.user.isVerified){
        return res.status(403).json({ message: "Please verify email address." });
    }
    next();
})