import express from "express";
import itemControllers from "../controllers/itemsControllers.js"

const router = express.Router();

router.get("/", itemControllers.list);
router.get("/:id", itemControllers.find);
router.post("/", itemControllers.create);
router.put("/:id", itemControllers.update);
router.delete("/:id",itemControllers.destroy);

export default router; 