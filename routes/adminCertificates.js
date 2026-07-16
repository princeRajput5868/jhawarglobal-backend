import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../middlewares/upload.js";
import {
  adminListcertificates,
  adminDeletecertificate,
  adminUploadcertificatePhoto,
  admincertificateStats,
  adminListEnrollments,
  adminCreatecertificate,
  adminGetcertificate,
} from "../controllers/admincertificatesController.js";

const router = express.Router();

router.use(adminAuth);

router.get("/certificates/stats", admincertificateStats);
router.get("/certificates", adminListcertificates);
router.get("/certificates/:id", adminGetcertificate);

router.delete("/certificates/:id", adminDeletecertificate);
router.post(
  "/certificates/:id/photo",
  upload.single("photo"),
  adminUploadcertificatePhoto,
);

router.get("/enrollments", adminListEnrollments);
router.post("/certificates", upload.single("photo"), adminCreatecertificate);

export default router;


