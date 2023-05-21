import mongoose from "mongoose";

async function connect_db() {
process.env.MONGODB_URI

    try {
      const db = await mongoose.connect("mongodb://root:password@localhost:27017/",{dbName: "Ayudantia3"});
      console.log("Conectado a la base de datos", db.connection.name);
    } catch (error) {
      console.error(error.message);
    }
}
connect_db()