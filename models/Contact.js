import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Contact = sequelize.define(
  "Contact",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    message: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);

export default Contact;
