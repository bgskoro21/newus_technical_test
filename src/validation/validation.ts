// src/utils/validate.ts
import { ZodType, ZodError } from "zod";

export function validate<T>(schema: ZodType<T>, data: T): T {
  return schema.parse(data);
}
