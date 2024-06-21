import "dotenv/config";
import express from "express";
import sellController from "../controllers/sellController.js";
import bitErrorHandler from "../utils/errorHandler.js";
import sellValidations from "../middlewares/validateSell.js";

const router = express.Router();

router.get("/", sellController.list);
router.post("/", sellValidations, bitErrorHandler.errorsIsEmpty, sellController.createNewSale);
router.get("/:id", sellController.findSaleById);
router.patch("/:id", sellController.updateSale);
router.delete("/:id", sellController.deleteSale);

export default router;