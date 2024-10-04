import Category from "../database/models/Category";
import { CategoryValidation } from "../validation/category-validation";
import { validate } from "../validation/validation";

interface CategoryCreationAttributes {
  name: string;
}

class CategoryService {
  // Membuat Category baru
  public async createCategory(data: CategoryCreationAttributes): Promise<Category> {
    data = validate(CategoryValidation.CREATE_OR_UPDATE_CATEGORY, data);
    const category = await Category.create(data);
    return category;
  }

  // Mendapatkan semua Categories
  public async getAllCategories(): Promise<Category[]> {
    const categories = await Category.findAll();
    return categories;
  }

  // Mendapatkan Category berdasarkan ID
  public async getCategoryById(id: string): Promise<Category | null> {
    const category = await Category.findByPk(id);
    return category;
  }

  // Memperbarui Category
  public async updateCategory(id: string, data: Partial<CategoryCreationAttributes>): Promise<[number, Category[]]> {
    data = validate(CategoryValidation.CREATE_OR_UPDATE_CATEGORY, data);
    const result = await Category.update(data, {
      where: { id },
      returning: true, // Mendapatkan data setelah update
    });
    return result;
  }

  // Menghapus Category
  public async deleteCategory(id: string): Promise<number> {
    const deleted = await Category.destroy({
      where: { id },
    });
    return deleted;
  }
}

export default new CategoryService();
