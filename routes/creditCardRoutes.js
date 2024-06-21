import express from "express";
import creditCardController from "../controllers/creditCardController.js";
import creditCardValidations from "../middlewares/validateCreditCard.js"
import bitErrorHandler from "../utils/errorHandler.js";
const router = express.Router();

router.get("/", creditCardController.list);
router.post("/", creditCardValidations, bitErrorHandler.errorsIsEmpty, creditCardController.createNewCreditCard);
router.get("/:id", creditCardController.findCreditCardById);
router.patch("/:id", creditCardController.updateCreditCard);
router.delete("/:id", creditCardController.deleteCreditCard);

export default router;