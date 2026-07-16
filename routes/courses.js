import express from "express";
import {
  listCourses,
  getCourse,
  listCourseModules,
  enrollCourse,
  completeCourse,
} from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", listCourses);
router.get("/:slug", getCourse);
router.get("/:slug/modules", listCourseModules);

router.post("/:slug/enroll", enrollCourse);
router.post("/:slug/complete", completeCourse);

export default router;

