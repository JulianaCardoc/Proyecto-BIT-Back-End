import "dotenv/config";
import express from "express";
import personController from "../controllers/personController.js";
import { expressjwt } from "express-jwt";
const router = express.Router();

router.get("/", personController.list);
router.post("/", personController.createNewPerson);
router.get("/:id", personController.findPersonById);
router.patch("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

export default router;