import { ZodType, z } from "zod";

export class RegencyValidation {
  static CREATE_REGENCY: ZodType = z.object({
    regencyName: z.string().min(1, { message: "Regency Name is Required" }),
  });
}
