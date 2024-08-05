import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { Tenant } from '../../../../domain/tenant.aggregate';
import { TenantModel } from '../tenant.model';

describe('TenantModel Integration Tests', () => {
  setupSequelize({ models: [TenantModel] });

  test('should create a tenant', async () => {
    const tenant = Tenant.fake().aTenant().build();

    await TenantModel.create({
      tenant_id: tenant.tenant_id.id,
      name: tenant.name,
      description: tenant.description,
      is_active: tenant.is_active,
      created_at: tenant.created_at,
      updated_at: tenant.updated_at,
    });
  });
});
