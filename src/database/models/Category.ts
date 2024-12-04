import { Model, Column, DataType, HasMany, PrimaryKey, Table } from "sequelize-typescript";
import Product from "./Product";

interface CategoryAttributes {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: "Categories", timestamps: true })
export default class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  name!: string;

  @HasMany(() => Product)
  products!: Product[];
}
