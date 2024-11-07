import asyncHandler from "express-async-handler";
import UserModel from "../../modules/auth/UserModel.js";
import TokenModel from "../../modules/auth/TokenModel.js";
import { isEmptyString } from "../../helpers/validation/generalValidation.js";
import generateToken from "../../helpers/auth/generateToken.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { hashToken } from "../../helpers/auth/hashToken.js";
import sendEmail from "../../helpers/auth/sendEmail.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (isEmptyString(name) || isEmptyString(email) || isEmptyString(password)) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Check if the user already exists
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists. Please log in." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie options
    const cookieOptions = {
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Secure cookies in production only
    };

    res.cookie("token", token, cookieOptions);

    // Respond with user data
    if (user) {
        const { _id, name, email, role, photo, bio, isVerified } = user;
        res.status(201).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    } else {
        res.status(500).json({ message: "Failed to register user. Please try again." });
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (isEmptyString(email) || isEmptyString(password)) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    const userExists = await UserModel.findOne({ email });

    if (!userExists) {
        return res.status(404).json({ message: "User not found. Please sign up." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password. Please try again." });
    }

    // Generate token
    const token = generateToken(userExists._id);

    // Set cookie options
    const cookieOptions = {
        path: "/",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Secure cookies in production only
    };

    res.cookie("token", token, cookieOptions);

    // Extract user details for response
    const { _id, name, role, photo, bio, isVerified } = userExists;

    // Send response
    res.status(200).json({
        _id,
        name,
        email,
        role,
        photo,
        bio,
        isVerified,
        token,
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out." });
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    try {
        // Find the user by ID
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update user details
        const { name, bio, photo } = req.body;
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (photo) user.photo = photo;

        // Save updated user
        const updatedUser = await user.save();

        // Return updated user data
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            photo: updatedUser.photo,
            role: updatedUser.role,
            isVerified: updatedUser.isVerified,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the user.", error: error.message });
    }
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (user.isVerified) {
        return res.status(400).json({ message: "User already verified." });
    }

    let token = await TokenModel.findOne({ userId: user._id });

    if (token) {
        await token.deleteOne();
    }

    const verificationToken = crypto.randomBytes(64).toString("hex") + user._id;

    const hashedToken = hashToken(verificationToken);

    await new TokenModel({
        userId: user._id,
        verificationToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }).save();

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const subject = "Email Verification - AuthKit";
    const send_to = user.email;
    const reply_to = "noreply@gmail.com";
    const template = "emailVericiation";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const url = verificationLink;

    try {
        await sendEmail(subject, send_to, send_from, reply_to, template, name, url);
        res.status(200).json({ message: "Email sent." })
    } catch (error) {
        console.log("Error sending email: ", error);
        res.status(500).json({ message: "Failed to send email." })
    }

})
