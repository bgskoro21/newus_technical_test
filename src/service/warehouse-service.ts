import Regency from "../database/models/Regency";
import { Warehouse } from "../database/models/Warehouse";
import { validate } from "../validation/validation";
import { WarehouseValidation } from "../validation/warehouse-validation";

interface WarehouseCreationAttributes {
  warehouseName: string;
  warehouseNumber: string;
  warehouseAddress: string;
  regencyId: string;
}

class WarehouseService {
  public async createWarehouse(data: WarehouseCreationAttributes): Promise<Warehouse> {
    data = validate(WarehouseValidation.CREATE_WAREHOUSE, data);

    const warehouse = await Warehouse.create(data);

    return warehouse;
  }

  public async getWarehouses(): Promise<Warehouse[]> {
    const warehouses = await Warehouse.findAll({
      include: {
        model: Regency,
      },
    });

    return warehouses;
  }
}

export default new WarehouseService();
