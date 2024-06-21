import express from "express";
import paymentMethodController from "../controllers/paymentMethodController.js";
import paymentMethodValidations from "../middlewares/validatePaymentMethod.js"
import bitErrorHandler from "../utils/errorHandler.js";
const router = express.Router();

router.get("/", paymentMethodController.list);
router.post("/", paymentMethodValidations, bitErrorHandler.errorsIsEmpty, paymentMethodController.createNewPaymentMethod);
router.get("/:id", paymentMethodController.findPaymentMethodById);
router.patch("/:id", paymentMethodController.updatePaymentMethod);
router.delete("/:id", paymentMethodController.deletePaymentMethod);

export default router;