import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

const JWT_SECRET = process.env.JWT_ADMIN_SECRET || "change_me_admin_secret";

export default async function adminAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, JWT_SECRET);

    const admin = await AdminUser.findByPk(payload.id);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.admin = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}