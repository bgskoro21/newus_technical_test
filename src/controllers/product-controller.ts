import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Untuk generate UUID
import productService from "../service/product-service";
import fs from "fs";

class ProductController {
  private ensureUploadsDirectoryExists = () => {
    const uploadsDir = path.join(__dirname, "..", "..", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
  };

  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      this.ensureUploadsDirectoryExists();
      cb(null, path.join(__dirname, "..", "..", "uploads")); // Path absolut
    },
    filename: (req, file, cb) => {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });

  private upload = multer({
    storage: this.storage,
    fileFilter: (req, file, cb) => {
      console.log("File received in Multer:", file);
      cb(null, true);
    },
  });

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProduct({ ...req.body, image: `${process.env.BASEURL}/uploads/${req.file?.filename}` });
      res.status(201).json({
        statusCode: 201,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const result = await productService.getAllProducts(page, limit, search);

      res.status(200).json({
        statusCode: 200,
        message: "Success fetching products",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ statusCode: 400, message: "Invalid product ID" });
      return;
    }

    try {
      const product = await productService.getProductById(id);

      if (!product) {
        res.status(404).json({ statusCode: 404, message: "Product not found" });
        return;
      }

      res.status(200).json({
        statusCode: 200,
        message: "Success fetching product",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  private extractFilename = (image: string): string => {
    if (image.startsWith("http://") || image.startsWith("https://")) {
      const parts = image.split("/");
      return parts[parts.length - 1];
    }
    return image;
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ statusCode: 400, message: "Invalid product ID" });
      return;
    }

    try {
      const existingProduct = await productService.getProductById(id);
      if (!existingProduct) {
        res.status(404).json({ statusCode: 404, message: "Product not found" });
        return;
      }

      const newImage = req.file?.filename;

      if (newImage && existingProduct.image) {
        const oldImageFilename = this.extractFilename(existingProduct.image);
        const oldImagePath = path.join(__dirname, "..", "..", "uploads", oldImageFilename);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Old image ${existingProduct.image} deleted.`);
        } else {
          console.log(`Old image ${existingProduct.image} does not exist.`);
        }
      }

      const updatedData = { ...req.body, image: `${process.env.BASEURL}/uploads/${newImage}` || existingProduct.image };
      const updated = await productService.updateProduct(id, updatedData);

      if (!updated) {
        res.status(404).json({ statusCode: 404, message: "Product not found" });
        return;
      }

      const updatedProduct = await productService.getProductById(id);
      const productWithUrl = {
        ...updatedProduct?.toJSON(),
        image: updatedProduct?.image ? updatedProduct?.image : null,
      };

      res.status(200).json({
        statusCode: 200,
        message: "Product updated successfully",
        data: productWithUrl,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ statusCode: 400, message: "Invalid product ID" });

      return;
    }

    try {
      const existingProduct = await productService.getProductById(id);
      if (!existingProduct) {
        res.status(404).json({ statusCode: 404, message: "Product not found" });
        return;
      }

      if (existingProduct.image) {
        const oldImageFilename = this.extractFilename(existingProduct.image);
        const oldImagePath = path.join(__dirname, "..", "..", "uploads", oldImageFilename);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Old image ${existingProduct.image} deleted.`);
        } else {
          console.log(`Old image ${existingProduct.image} does not exist.`);
        }
      }

      const deleted = await productService.deleteProduct(id);

      if (!deleted) {
        res.status(404).json({ statusCode: 404, message: "Product not found" });

        return;
      }

      res.status(200).json({
        statusCode: 200,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public uploadImage = this.upload.single("image");
}

export default new ProductController();
