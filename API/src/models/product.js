import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";


export const Products = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.INTEGER,
    },
    cantidad: {
      type: DataTypes.STRING,
    },
    categorias: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    timestamps: false,
  }
);
