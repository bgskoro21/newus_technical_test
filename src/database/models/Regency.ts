import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Warehouse } from "./Warehouse";

interface RegencyAttributes {
  id: string;
  regencyName: string;
}

interface RegencyCreationAttributes {
  regencyName: string; // `id` tidak perlu, karena biasanya di-*generate* otomatis
}

@Table({ tableName: "Regencies", timestamps: true })
export default class Regency extends Model<RegencyAttributes, RegencyCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4, // UUID otomatis di-generate
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  regencyName!: string;

  @HasMany(() => Warehouse)
  warehouses!: Warehouse[];
}
