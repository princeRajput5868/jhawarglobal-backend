import certificate from "../models/certificate.js";
import Course from "../models/Course.js";
import path from "path";
import fs from "fs";

function getVisitorId(req) {
  return req.headers["x-visitor-id"] || req.query?.visitorId || req.body?.visitorId;
}

export const listMycertificates = async (req, res) => {
  try {
    const visitorId = getVisitorId(req);
    if (!visitorId) return res.status(400).json({ message: "visitorId is required" });

    const certificates = await certificate.findAll({
      where: { visitorId },
      order: [["issuedAt", "DESC"]],
      attributes: [
        "id",
        "courseSlug",
        "fullName",
        "visitorId",
        "certificateNumber",
        "issuedAt",
        "createdAt",
        "updatedAt",
      ],
    });

    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getcertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const visitorId = getVisitorId(req);

    const certificateData = await certificate.findOne({ where: { id } });
    if (!certificateData) return res.status(404).json({ message: "certificate not found" });

    if (visitorId && certificateData.visitorId !== visitorId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const course = await Course.findOne({ where: { slug: certificateData.courseSlug } });

    res.json({
      ...certificateData.toJSON(),
      courseTitle: course?.title || certificateData.meta?.courseTitle,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🔍 Verifying certificate ID:", id);

    if (!id) {
      return res.status(400).json({
        isValid: false,
        message: "Certificate ID is required"
      });
    }

    const certificateData = await certificate.findOne({
      where: { certificateNumber: id }
    });

    console.log("📄 Found certificate:", certificateData ? "Yes" : "No");

    if (!certificateData) {
      return res.status(404).json({
        isValid: false,
        message: "Certificate not found. Please check the ID and try again."
      });
    }

    const course = await Course.findOne({
      where: { slug: certificateData.courseSlug }
    });

    return res.json({
      isValid: true,
      data: {
        studentName: certificateData.fullName || "N/A",
        courseTitle: course?.title || certificateData.courseSlug || "N/A",
        issueDate: certificateData.issuedAt || certificateData.createdAt,
        certificateId: certificateData.certificateNumber,
        status: 'issued'
      }
    });

  } catch (error) {
    console.error("❌ Certificate verification error:", error);
    return res.status(500).json({
      isValid: false,
      message: "Server error. Please try again later."
    });
  }
};

// ✅ UPDATE CERTIFICATE
export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, courseSlug, visitorId, enrollmentNumber, email, issuedAt, meta } = req.body;
    const photo = req.file;

    console.log("🔍 Updating certificate ID:", id);
    console.log("📝 Data received:", { fullName, courseSlug, visitorId, enrollmentNumber, email, issuedAt });

    const certificateData = await certificate.findByPk(id);
    if (!certificateData) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Update fields
    if (fullName) certificateData.fullName = fullName;
    if (courseSlug) certificateData.courseSlug = courseSlug;
    if (visitorId) certificateData.visitorId = visitorId;
    if (enrollmentNumber) certificateData.enrollmentNumber = enrollmentNumber;
    if (email) certificateData.email = email;
    if (issuedAt) certificateData.issuedAt = issuedAt;

    // Update meta
    if (meta) {
      const metaData = typeof meta === 'string' ? JSON.parse(meta) : meta;
      certificateData.meta = { ...certificateData.meta, ...metaData };
    }

    // Update photo
    if (photo) {
      const uploadDir = path.join(process.cwd(), "uploads", "certificates");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = `cert-${id}-${Date.now()}.jpg`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, photo.buffer);
      certificateData.meta.photoUrl = `/uploads/certificates/${fileName}`;
    }

    await certificateData.save();
    
    res.json({ 
      success: true, 
      message: "Certificate updated successfully", 
      certificate: certificateData 
    });
  } catch (error) {
    console.error("❌ Update certificate error:", error);
    res.status(500).json({ 
      message: error.message || "Failed to update certificate" 
    });
  }
};