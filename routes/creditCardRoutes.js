import express from "express";
import creditCardController from "../controllers/creditCardController.js";

const router = express.Router();

router.get("/", creditCardController.list);
router.post("/", creditCardController.createNewCreditCard);
router.get("/:id", creditCardController.findCreditCardById);
router.patch("/:id", creditCardController.updateCreditCard);
router.delete("/:id", creditCardController.deleteCreditCard);

export default router;