import { Request, Response, NextFunction } from "express";
import regencyService from "../service/regency-service";

class RegencyController {
  public createRegency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { regencyName } = req.body;
      const result = await regencyService.createRegency({ regencyName });

      res.status(201).json({
        statusCode: 201,
        message: "Success create regency",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public getRegencies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await regencyService.getRegencies();

      res.status(201).json({
        statusCode: 201,
        message: "Success get regencies",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new RegencyController();
