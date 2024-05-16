import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.get("/", userController.list);
router.post("/", userController.createNewUser);
router.post("/login", userController.login);
router.get("/:id", userController.findUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;