import { app } from "./application/app";
import sequelizeConnection from "./config/database";

const startApp = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log("Connection to the database has been established successfully.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startApp();
