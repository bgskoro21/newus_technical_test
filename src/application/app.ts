import express from "express";
import errorHandler from "../middlewares/error-middleware";
import path from "path";
import router from "../routes/api";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "..", "uploads")));

app.use(router);

app.use(errorHandler);
