import express from "express";
import addressesController from "../controllers/addressesController.js";
const router = express.Router();

router.get("/", addressesController.list);
router.post("/", addressesController.createNewAddress);
router.get("/:id", addressesController.findAddressById);
router.patch("/:id", addressesController.updateAddress);
router.delete("/:id", addressesController.deleteAddress);

export default router;