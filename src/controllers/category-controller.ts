// src/controllers/category.controller.ts
import { Request, Response, NextFunction } from "express";
import categoryService from "../service/category-service";
import { validate as isUuid } from "uuid";

class CategoryController {
  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;

      const category = await categoryService.createCategory({ name });

      res.status(201).json({
        statusCode: 201,
        message: "Success create category",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getAllCategories();

      res.status(200).json({
        statusCode: 200,
        message: "Success get all category",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id || !isUuid(id)) {
        res.status(400).json({ statusCode: 400, message: "Invalid category ID" });
        return;
      }

      const category = await categoryService.getCategoryById(id);
      if (!category) {
        res.status(404).json({ statusCode: 404, message: "Category not found" });
        return;
      }

      res.status(200).json({
        statusCode: 200,
        message: "Success get category by Id",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const { name } = req.body;

      if (!id || !isUuid(id)) {
        res.status(400).json({ statusCode: 400, message: "Invalid category ID" });
        return;
      }

      const [updatedRows, updatedCategories] = await categoryService.updateCategory(id, { name });

      if (updatedRows === 0) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.status(200).json({ statusCode: 200, message: "Success update category", data: updatedCategories[0] });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id || !isUuid(id)) {
        res.status(400).json({ statusCode: 400, message: "Invalid category ID" });
        return;
      }

      const deleted = await categoryService.deleteCategory(id);

      if (deleted === 0) {
        res.status(404).json({ statusCode: 404, message: "Category not found" });
        return;
      }

      res.status(200).json({ statusCode: 200, message: "Success delete category" }); // No Content
    } catch (error) {
      next(error);
    }
  };
}

export default new CategoryController();
