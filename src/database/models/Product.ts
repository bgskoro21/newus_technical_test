import Category from "./Category";
import { Model, BelongsTo, AutoIncrement, Column, ForeignKey, PrimaryKey, Table, DataType } from "sequelize-typescript";

interface ProductAttributes {
  id: number;
  name: string;
  desc?: string;
  image?: string;
  category_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes {
  name: string;
  desc?: string;
  image?: string;
  category_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: "Products", timestamps: true })
class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  desc!: string;

  @Column(DataType.STRING)
  image!: string;

  @ForeignKey(() => Category)
  @Column(DataType.STRING)
  category_id!: string;

  @BelongsTo(() => Category)
  category!: Category;
}

export default Product;
