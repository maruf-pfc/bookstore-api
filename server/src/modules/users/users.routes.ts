import { Router } from "express";
import * as usersController from "./users.controller";
import { authenticate } from "../../middlewares/auth";
import { authorize } from "../../middlewares/rbac";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints (ADMIN only)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  usersController.getAllUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */
router.get(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  usersController.getUserById
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, STAFF, CUSTOMER]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  usersController.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  usersController.deleteUser
);

export default router;
