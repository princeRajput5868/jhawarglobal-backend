import express from "express";
import { 
  listMycertificates, 
  getcertificate, 
  verifyCertificate,
  updateCertificate
} from "../controllers/certificatesController.js";
import certificate from "../models/certificate.js";

const router = express.Router();

// ✅ SPECIFIC ROUTES
router.get("/verify/:id", verifyCertificate);
router.get("/my", listMycertificates);
router.get("/debug/all", async (req, res) => {
  try {
    const certs = await certificate.findAll();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE ROUTE - PUT (JSON body)
router.put("/:id", updateCertificate);

// ✅ GET ROUTE - LAST
router.get("/:id", getcertificate);

export default router;