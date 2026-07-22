import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CourseEnrollment = sequelize.define(
  "CourseEnrollment",
  {
    courseSlug: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    visitorId: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "enrolled",
    },
    enrollmentNumber: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    completedAt: { type: DataTypes.DATE },
  },
  {
    timestamps: true,
    tableName: "courseenrollments",
    freezeTableName: true,
  }
);

export default CourseEnrollment;