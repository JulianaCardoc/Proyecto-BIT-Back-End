import express from "express";
import addressesController from "../controllers/addressesController.js";
import bitErrorHandler from "../utils/errorHandler.js";
import addressesValidations from "../middlewares/validateAddresses.js";
const router = express.Router();

router.get("/", addressesController.list);
router.post("/", addressesValidations, bitErrorHandler.errorsIsEmpty, addressesController.createNewAddress);
router.get("/:id", addressesController.findAddressById);
router.patch("/:id", addressesController.updateAddress);
router.delete("/:id", addressesController.deleteAddress);

export default router;