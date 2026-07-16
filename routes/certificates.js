import express from "express";
import { listMycertificates, getcertificate } from "../controllers/certificatesController.js";

const router = express.Router();

router.get("/me", listMycertificates);
router.get("/:id", getcertificate);

export default router;

