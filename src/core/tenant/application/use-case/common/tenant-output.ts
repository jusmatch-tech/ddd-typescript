import { Tenant } from '../../../domain/tenant.aggregate';

export type TenantOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export class TenantOutputMapper {
  static toOutput(entity: Tenant): TenantOutput {
    const { tenant_id, ...otherProps } = entity.toJSON();

    return {
      id: entity.tenant_id.id,
      ...otherProps,
    };
  }
}
