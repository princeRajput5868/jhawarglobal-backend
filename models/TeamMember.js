import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TeamMember = sequelize.define(
  "TeamMember",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    photoUrl: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    tableName: "teammembers",
    freezeTableName: true,
  }
);

export default TeamMember;