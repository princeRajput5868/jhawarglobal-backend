import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/adminTestimonialsController.js";

const router = express.Router();

router.use(adminAuth);

router.get("/", getTestimonials);
router.get("/:id", getTestimonial);
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;