import { app } from "./application/app";
import sequelizeConnection from "./config/database";

const startApp = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log("Connection to the database has been established successfully.");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startApp();
