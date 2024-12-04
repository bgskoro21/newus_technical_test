import { ZodType, z } from "zod";

export class WarehouseValidation {
  static CREATE_WAREHOUSE: ZodType = z.object({
    warehouseNumber: z.string().min(1),
    warehouseName: z.string().min(1),
    warehouseAddress: z.string().min(10),
    regencyId: z.string(),
  });
}
