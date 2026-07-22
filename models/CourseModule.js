import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CourseModule = sequelize.define(
  "CourseModule",
  {
    courseSlug: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    orderIndex: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT },
    videoUrl: { type: DataTypes.STRING },
    quiz: { type: DataTypes.JSON, allowNull: true },
  },
  {
    timestamps: true,
    tableName: "coursemodules",
    freezeTableName: true,
  }
);

export default CourseModule;