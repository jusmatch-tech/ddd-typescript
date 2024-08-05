import { EntityValidationError } from '../../../../shared/domain/validators/validation.error';
import { Tenant, TenantId } from '../../../domain/tenant.aggregate';
import { TenantModel } from './tenant.model';

export class TenantModelMapper {
  static toModel(entity: Tenant): TenantModel {
    return TenantModel.build({
      tenant_id: entity.tenant_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }

  static toEntity(model: TenantModel): Tenant {
    const tenant = new Tenant({
      tenant_id: new TenantId(model.tenant_id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
      updated_at: model.updated_at,
    });
    tenant.validate();
    if (tenant.notification.hasErrors()) {
      throw new EntityValidationError(tenant.notification.toJSON());
    }
    return tenant;
  }
}
