import express from "express";
import imagesController from "../controllers/imagesController.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.get("/", imagesController.list);
router.post("/", upload.single("imgUrl"), imagesController.uploadNewImage);
router.get("/:id", imagesController.findImageById);
router.patch("/:id", upload.single("imgUrl"), imagesController.updateImage);
router.delete("/:id", imagesController.deleteImage);

export default router;