import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  getPlacements,
  getPlacement,
  createPlacement,
  updatePlacement,
  deletePlacement,
} from "../controllers/adminPlacementsController.js";

const router = express.Router();

router.use(adminAuth);

router.get("/", getPlacements);
router.get("/:id", getPlacement);
router.post("/", createPlacement);
router.put("/:id", updatePlacement);
router.delete("/:id", deletePlacement);

export default router;