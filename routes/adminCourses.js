import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  adminListCourses,
  adminGetCourse,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
  adminListModules,
  adminUpsertModule,
  adminDeleteModule,
} from "../controllers/adminCoursesController.js";

const router = express.Router();

router.use(adminAuth);

router.get("/courses", adminListCourses);
router.get("/courses/:slug", adminGetCourse);
router.post("/courses", adminCreateCourse);
router.put("/courses/:slug", adminUpdateCourse);
router.delete("/courses/:slug", adminDeleteCourse);

router.get("/courses/:slug/modules", adminListModules);
router.post("/courses/:slug/modules", adminUpsertModule);
router.delete("/courses/:slug/modules/:id", adminDeleteModule);

export default router;