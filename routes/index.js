import express from "express";

import pages from "./pages.js";
import gallery from "./gallery.js";
import contact from "./contact.js";
import courses from "./courses.js";
import certificates from "./certificates.js";

import adminAuth from "./adminAuth.js";
import adminCourses from "./adminCourses.js";
import admincertificates from "./admincertificates.js";

const router = express.Router();

router.use("/pages", pages);
router.use("/gallery", gallery);
router.use("/contact", contact);
router.use("/courses", courses);
router.use("/certificates", certificates);

router.use("/admin", adminAuth);
router.use("/admin", adminCourses);
router.use("/admin", admincertificates);

router.get("/", (req, res) => res.json({ message: "API root" }));

export default router;