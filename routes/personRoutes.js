import "dotenv/config";
import express from "express";
import personController from "../controllers/personController.js";
import personValidations from "../middlewares/validatePerson.js"
import { expressjwt } from "express-jwt";
import bitErrorHandler from "../utils/errorHandler.js";
const router = express.Router();

router.get("/", personController.list);
router.post("/", personValidations, bitErrorHandler.errorsIsEmpty, personController.createNewPerson);
router.get("/:id", personController.findPersonById);
router.patch("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

export default router;