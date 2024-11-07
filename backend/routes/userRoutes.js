import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser, verifyEmail } from "../controller/auth/userController.js";
import { deleteUser, getAllUsers, getUserLoginStatus } from "../controller/auth/adminController.js";
import { protect, adminMiddleware, creatorMiddleware, verifiedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

// Admin route
router.delete("/admin/user/:id", protect, adminMiddleware, deleteUser);
router.get("/admin/user/list", protect, creatorMiddleware, verifiedMiddleware, getAllUsers);
router.get("/login-status", getUserLoginStatus);
router.post("/verify-email", protect, verifyEmail);

export default router;