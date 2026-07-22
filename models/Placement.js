import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Placement = sequelize.define(
  "Placement",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true,
    tableName: "placements",
    freezeTableName: true,
  }
);

export default Placement;