import { ZodType, z } from "zod";

export class ProductValidation {
  static CREATE_OR_UPDATE_PRODUCT: ZodType = z.object({
    name: z.string().min(1, { message: "Product name is required." }),
    desc: z.string().optional(),
    image: z.string().optional(), // Kita anggap image sebagai string (nama file)
    category_id: z.string().uuid({ message: "Invalid category ID format." }),
  });
}
