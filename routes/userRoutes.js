import "dotenv/config";
import express from "express";
import userController from "../controllers/userController.js";
import userValidations from "../middlewares/validateUser.js";
import bitErrorHandler from "../utils/errorHandler.js"
import { expressjwt } from "express-jwt";
const router = express.Router();

router.get("/", userController.list);
router.post("/", userValidations, bitErrorHandler.errorsIsEmpty, userController.createNewUser);
router.post("/login", userController.login);
router.get("/:id", userController.findUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/userProfile", expressjwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET}), userController.userProfile);

export default router;