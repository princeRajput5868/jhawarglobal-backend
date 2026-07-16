import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CourseEnrollment = sequelize.define(
  "CourseEnrollment",
  {
    courseSlug: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    // simple identity in this project (no auth yet)
    visitorId: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "enrolled", // enrolled | in_progress | completed
    },
    // Admin mapping identity (unique per course)
    enrollmentNumber: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },

    completedAt: { type: DataTypes.DATE },
  },
  {
    timestamps: true,
  }
);

export default CourseEnrollment;

