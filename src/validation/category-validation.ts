import { ZodType, z } from "zod";
export class CategoryValidation {
  static CREATE_OR_UPDATE_CATEGORY: ZodType = z.object({
    name: z.string({ message: "Category name is required." }).min(5, { message: "Category name must be more than 10 characters." }),
  });
}
