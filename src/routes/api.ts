// src/routes/category.routes.ts
import { Router } from "express";
import categoryController from "../controllers/category-controller";
import productController from "../controllers/product-controller";

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

export default router;
