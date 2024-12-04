import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Regency from "./Regency";

interface WarehouseAttributes {
  id: number;
  warehouseName: string;
  warehouseNumber: string;
  warehouseAddress: string;
  regencyId: string;
}

interface WarehouseCreationAttributes {
  warehouseName: string;
  warehouseNumber: string;
  warehouseAddress: string;
  regencyId: string;
}

@Table({ tableName: "Warehouses", timestamps: true })
export class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  warehouseName!: string;

  @Column(DataType.STRING)
  warehouseNumber!: string;

  @Column(DataType.STRING)
  warehouseAddress!: string;

  @ForeignKey(() => Regency)
  @Column(DataType.STRING)
  regencyId!: string;

  @BelongsTo(() => Regency)
  regency!: Regency;
}
