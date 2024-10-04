import { Model, DataTypes, Optional, Association } from "sequelize";
import sequelizeConnection from "../../config/database";
import Category from "./Category";

interface ProductAttributes {
  id: number;
  name: string;
  desc?: string;
  image?: string;
  category_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public desc?: string;
  public image?: string;
  public category_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly category?: Category;

  public static associations: {
    category: Association<Product, Category>;
  };
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "Products",
    modelName: "Product",
    timestamps: true,
  }
);
Product.belongsTo(Category, { foreignKey: "category_id" });

export default Product;
