import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { isEmptyString } from "../helpers/validation/generalValidation.js";
import UserModel from "../modules/auth/UserModel.js";
export const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(isEmptyString(token)){
            return res.status(401).json({ message: "Not authorised, please login." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await UserModel.findById(decoded.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({message: "Not authorised, please login"});
    }
});