import express from "express";
import categoryController from "../controllers/categoryController.js";
const router = express.Router();

router.get("/", categoryController.list);
router.post("/", categoryController.createNewCategory);
router.get("/:id", categoryController.findCategoryById);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;