import { Op } from "sequelize";
import { ProductValidation } from "../validation/product-validation";
import { validate } from "../validation/validation";
import Category from "../database/models/Category";
import Product from "../database/models/Product";

class ProductService {
  async createProduct(data: any) {
    const validatedData = validate(ProductValidation.CREATE_OR_UPDATE_PRODUCT, data);

    const product = await Product.create(validatedData);
    return product;
  }

  async getAllProducts(page: number, limit: number, search: string) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }, { desc: { [Op.iLike]: `%${search}%` } }],
      },
      limit: limit,
      offset: offset,
      include: [
        {
          model: Category,
          attributes: ["id", "name"], // Pilih atribut yang ingin ditampilkan dari kategori
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    return {
      totalItems: count,
      totalPages: totalPages,
      currentPage: page,
      products: rows,
    };
  }

  async getProductById(id: number) {
    return await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"], // Pilih atribut yang ingin ditampilkan dari kategori
        },
      ],
    });
  }

  async updateProduct(id: number, data: any) {
    const validatedData = validate(ProductValidation.CREATE_OR_UPDATE_PRODUCT, data);
    const [updated] = await Product.update(validatedData, { where: { id } });
    return updated;
  }

  async deleteProduct(id: number) {
    return await Product.destroy({ where: { id } });
  }
}

export default new ProductService();
