import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    nombre: String,
    precio: {
      type: Number,
      default: 0,
    },
    cantidad: String,
    categorias: Array

},

  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Productos", productSchema);