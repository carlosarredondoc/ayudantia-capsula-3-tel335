import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "Ayudantia3", // db name,
  "postgres", // username
  "postgres", // password
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);

async function connect_db() {
    try {
        await sequelize.sync({force: false});
        console.log("Conexion realizada a la base de datos con exito")
    } catch (error) {
        console.log(`Error conectando a la base de datos ${error}`)
    }
}
connect_db()