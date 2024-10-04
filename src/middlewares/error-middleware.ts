// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";
import { ResponseError } from "../error/response-error";

interface Error {
  status?: number;
  message?: string;
  errors?: string[];
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    const errorDetails = err.errors.map((error: ZodIssue) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      errors: errorDetails,
    });
    return;
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res
    .status(status)
    .json({
      statusCode: status,
      message,
    })
    .end();
};

export default errorHandler;
