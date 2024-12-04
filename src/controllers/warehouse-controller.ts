import { NextFunction, Request, Response } from "express";
import warehouseService from "../service/warehouse-service";

class WarehouseController {
  public createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await warehouseService.createWarehouse({ ...req.body });

      res.status(201).json({
        statusCode: 201,
        message: "Success create warehouse",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public getWwarehouses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await warehouseService.getWarehouses();

      res.status(201).json({
        statusCode: 201,
        message: "Success get warehouses",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new WarehouseController();
