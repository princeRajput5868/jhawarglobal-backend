import express from "express";
import { listGallery } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", listGallery);

export default router;
