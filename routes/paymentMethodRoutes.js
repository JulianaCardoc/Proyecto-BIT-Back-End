import express from "express";
import paymentMethodController from "../controllers/paymentMethodController.js";
const router = express.Router();

router.get("/", paymentMethodController.list);
router.post("/", paymentMethodController.createNewPaymentMethod);
router.get("/:id", paymentMethodController.findPaymentMethodById);
router.patch("/:id", paymentMethodController.updatePaymentMethod);
router.delete("/:id", paymentMethodController.deletePaymentMethod);

export default router;