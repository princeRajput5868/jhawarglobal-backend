import certificate from "../models/Certificate.js";
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
    console.error("❌ listMycertificates error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getcertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const visitorId = getVisitorId(req);

    console.log("🔍 getcertificate called with ID:", id);
    console.log("🔍 Visitor ID:", visitorId);

    // ✅ Find certificate by ID
    const certificateData = await certificate.findOne({ where: { id } });
    
    console.log("📄 Certificate found:", certificateData ? "Yes" : "No");
    
    if (!certificateData) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // ✅ Check if visitor has permission (optional)
    if (visitorId && certificateData.visitorId && certificateData.visitorId !== visitorId) {
      // Allow access even if visitor doesn't match (public certificate viewing)
      // Just log warning
      console.warn("⚠️ Visitor mismatch:", { visitorId, certVisitorId: certificateData.visitorId });
    }

    // ✅ Get course title
    const course = await Course.findOne({ where: { slug: certificateData.courseSlug } });

    // ✅ Prepare response with all data
    const responseData = {
      ...certificateData.toJSON(),
      courseTitle: course?.title || certificateData.meta?.courseTitle || certificateData.courseSlug,
      // ✅ Ensure meta is properly parsed
      meta: typeof certificateData.meta === 'string' ? JSON.parse(certificateData.meta) : certificateData.meta || {},
    };

    console.log("✅ Sending certificate data:", {
      id: responseData.id,
      fullName: responseData.fullName,
      certificateNumber: responseData.certificateNumber,
      courseSlug: responseData.courseSlug,
      courseTitle: responseData.courseTitle,
      metaKeys: Object.keys(responseData.meta)
    });

    res.json(responseData);
  } catch (err) {
    console.error("❌ getcertificate error:", err);
    res.status(500).json({ 
      message: "Server error while fetching certificate",
      error: err.message 
    });
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

    // Find certificate by certificateNumber
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

    // Get course info
    const course = await Course.findOne({
      where: { slug: certificateData.courseSlug }
    });

    // Parse meta if it's a string
    let metaData = {};
    if (certificateData.meta) {
      if (typeof certificateData.meta === 'string') {
        try {
          metaData = JSON.parse(certificateData.meta);
        } catch (e) {
          console.error("Failed to parse meta:", e);
          metaData = {};
        }
      } else {
        metaData = certificateData.meta;
      }
    }

    // Ensure courseTitle is in meta
    if (!metaData.courseTitle) {
      metaData.courseTitle = course?.title || certificateData.courseSlug;
    }

    // Return full certificate data with proper structure
    const responseData = {
      isValid: true,
      certificate: {
        id: certificateData.id,
        fullName: certificateData.fullName,
        certificateNumber: certificateData.certificateNumber,
        courseSlug: certificateData.courseSlug,
        visitorId: certificateData.visitorId,
        issuedAt: certificateData.issuedAt || certificateData.createdAt,
        verificationId: certificateData.certificateNumber,
        createdAt: certificateData.createdAt,
        updatedAt: certificateData.updatedAt,
        meta: metaData
      }
    };

    console.log("✅ Sending verification response:", {
      id: responseData.certificate.id,
      fullName: responseData.certificate.fullName,
      courseTitle: responseData.certificate.meta.courseTitle
    });

    res.json(responseData);

  } catch (error) {
    console.error("❌ Certificate verification error:", error);
    return res.status(500).json({
      isValid: false,
      message: "Server error. Please try again later."
    });
  }
};
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