import mongoose from "mongoose";

async function connect_db() {

    try {
      const db = await mongoose.connect("mongodb://root:password@localhost:27017/",{dbName: "Ayudantia3"}); //Usar dotenv con variables de entorno, por ejemplo -> process.env.MONGODB_URI
      console.log("Conectado a la base de datos", db.connection.name);
    } catch (error) {
      console.error(error.message);
    }
}
connect_db()