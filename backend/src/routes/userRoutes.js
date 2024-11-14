import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser, verifyEmail, verifyUser, forgotPassword, resetPassword, changePassword } from "../controller/auth/userController.js";
import { deleteUser, getAllUsers, getUserLoginStatus } from "../controller/auth/adminController.js";
import { protect, adminMiddleware, creatorMiddleware, verifiedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes (no `protect` middleware)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verify-user/:verificationToken", verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetPasswordToken", resetPassword);

router.get("/login-status", getUserLoginStatus);

// Add protect middleware
router.use(protect);

// Protected User Routes
router.get("/user", getUser);
router.patch("/user", updateUser);
router.post("/verify-email", verifyEmail);
router.patch("/change-password", changePassword);

// Protected Admin Routes with additional middleware
router.delete("/admin/user/:id", adminMiddleware, deleteUser);
router.get("/admin/user/list", creatorMiddleware, verifiedMiddleware, getAllUsers);


export default router;