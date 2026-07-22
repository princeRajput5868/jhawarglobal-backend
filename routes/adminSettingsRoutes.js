import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  getSettings,
  getSetting,
  updateSetting,
  initSettings,
} from "../controllers/adminSettingsController.js";

const router = express.Router();

router.use(adminAuth);

router.get("/", getSettings);
router.get("/:key", getSetting);
router.put("/:key", updateSetting);
router.post("/init", initSettings);

export default router;  