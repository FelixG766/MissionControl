import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser, verifyEmail, verifyUser, forgotPassword } from "../controller/auth/userController.js";
import { deleteUser, getAllUsers, getUserLoginStatus } from "../controller/auth/adminController.js";
import { protect, adminMiddleware, creatorMiddleware, verifiedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);
router.post("/verify-email", protect, verifyEmail);
router.post("/verify-user/:verificationToken", verifyUser);
router.post("/fogot-password", forgotPassword);

// Admin route
router.delete("/admin/user/:id", protect, adminMiddleware, deleteUser);
router.get("/admin/user/list", protect, creatorMiddleware, verifiedMiddleware, getAllUsers);
router.get("/login-status", getUserLoginStatus);

export default router;