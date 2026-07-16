import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Gallery = sequelize.define(
  "Gallery",
  {
    title: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  { timestamps: true }
);

export default Gallery;
