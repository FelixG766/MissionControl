import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser, verifyEmail, verifyUser, forgotPassword, resetPassword, changePassword } from "../controller/auth/userController.js";
import { deleteUser, getAllUsers, getUserLoginStatus } from "../controller/auth/adminController.js";
import { protect, adminMiddleware, creatorMiddleware, verifiedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes (no `protect` middleware)
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: StrongPassword123!
 *               photo:
 *                 type: string
 *                 description: Profile photo URL
 *                 example: "https://example.com/avatar.jpg"
 *               bio:
 *                 type: string
 *                 description: Short user bio
 *                 example: "Hello, I'm a new user."
 *               role:
 *                 type: string
 *                 enum: ["user", "admin", "creator"]
 *                 description: The user's role
 *                 example: user
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or bad request
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", loginUser);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout the user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful.
 */
router.get("/logout", logoutUser);
/**
 * @swagger
 * /verify-user/{verificationToken}:
 *   post:
 *     summary: Verify user account
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's verification token.
 *     responses:
 *       200:
 *         description: User verified successfully.
 *       400:
 *         description: Invalid or expired token.
 */
router.post("/verify-user/:verificationToken", verifyUser);
/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *     responses:
 *       200:
 *         description: Password reset link sent.
 *       404:
 *         description: User not found.
 */
router.post("/forgot-password", forgotPassword);
/**
 * @swagger
 * /reset-password/{resetPasswordToken}:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: resetPasswordToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The reset password token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password.
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       400:
 *         description: Invalid or expired token.
 */
router.post("/reset-password/:resetPasswordToken", resetPassword);
/**
 * @swagger
 * /login-status:
 *   get:
 *     summary: Check login status
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User is logged in.
 *       401:
 *         description: User is not logged in.
 */
router.get("/login-status", getUserLoginStatus);

// Add protect middleware
router.use(protect);

// Protected User Routes
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved.
 *       401:
 *         description: Unauthorized.
 */
router.get("/user", getUser);
/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/user", updateUser);
/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify user email
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Email verification successful.
 *       400:
 *         description: Invalid or expired verification token.
 */
router.post("/verify-email", verifyEmail);
/**
 * @swagger
 * /change-password:
 *   patch:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password.
 *               newPassword:
 *                 type: string
 *                 description: The new password.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Invalid input.
 */
router.patch("/change-password", changePassword);

// Protected Admin Routes with additional middleware
/**
 * @swagger
 * /admin/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete("/admin/user/:id", adminMiddleware, deleteUser);
/**
 * @swagger
 * /admin/user/list:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized.
 */
router.get("/admin/user/list", creatorMiddleware, verifiedMiddleware, getAllUsers);


export default router;