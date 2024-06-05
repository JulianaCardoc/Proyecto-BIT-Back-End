import "dotenv/config";
import express from "express";
import sellController from "../controllers/sellController.js";
const router = express.Router();

router.get("/", sellController.list);
router.post("/", sellController.createNewSale);
router.get("/:id", sellController.findSaleById);
router.patch("/:id", sellController.updateSale);
router.delete("/:id", sellController.deleteSale);

export default router;