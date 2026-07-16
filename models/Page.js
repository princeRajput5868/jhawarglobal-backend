import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Page = sequelize.define(
  "Page",
  {
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT },
    meta: { type: DataTypes.JSON, allowNull: true },
  },
  { timestamps: true }
);

export default Page;
