// src/routes/category.routes.ts
import { Router } from "express";
import categoryController from "../controllers/category-controller";
import productController from "../controllers/product-controller";
import regencyController from "../controllers/regency-controller";
import warehouseController from "../controllers/warehouse-controller";

const router = Router();

router.post("/api/categories", categoryController.createCategory);
router.get("/api/categories", categoryController.getAllCategories);
router.get("/api/categories/:id", categoryController.getCategoryById);
router.put("/api/categories/:id", categoryController.updateCategory);
router.delete("/api/categories/:id", categoryController.deleteCategory);

router.post("/api/products", productController.uploadImage, productController.createProduct);
router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products/:id", productController.uploadImage, productController.updateProduct);
router.delete("/api/products/:id", productController.deleteProduct);

router.post("/api/regencies", regencyController.createRegency);
router.get("/api/regencies", regencyController.getRegencies);

router.post("/api/warehouses", warehouseController.createWarehouse);
router.get("/api/warehouses", warehouseController.getWwarehouses);

export default router;
