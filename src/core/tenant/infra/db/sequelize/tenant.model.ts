import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type TenantModelProps = {
  tenant_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

@Table({ tableName: 'tenants' })
export class TenantModel extends Model<TenantModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare tenant_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare description: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare is_active: boolean;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare updated_at: Date;
}
