import Regency from "../database/models/Regency";
import { Warehouse } from "../database/models/Warehouse";
import { RegencyValidation } from "../validation/regency-validation";
import { validate } from "../validation/validation";

interface RegencyCreationAttributes {
  regencyName: string;
}

class RegencyService {
  public async createRegency(data: RegencyCreationAttributes): Promise<Regency> {
    data = validate(RegencyValidation.CREATE_REGENCY, data);

    const regency = await Regency.create(data);

    return regency;
  }

  public async getRegencies(): Promise<Regency[]> {
    const regencies = await Regency.findAll({
      include: {
        model: Warehouse,
        attributes: ["id", "warehouseNumber"],
      },
    });

    return regencies;
  }
}

export default new RegencyService();
