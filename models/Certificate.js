import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const certificate = sequelize.define(
  "certificate",
  {
    courseSlug: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    visitorId: { type: DataTypes.STRING, allowNull: false },
    certificateNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    issuedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    // In future: store signature image / template data
    meta: { type: DataTypes.JSON },
  },
  { timestamps: true }
);

export default certificate;

