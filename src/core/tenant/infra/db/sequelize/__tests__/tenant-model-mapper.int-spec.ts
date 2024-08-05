import { setupSequelize } from '@core/shared/infra/testing/helpers';
import { TenantModel } from '../tenant.model';
import { TenantModelMapper } from '../tenant-model-mapper';
import { EntityValidationError } from '@core/shared/domain/validators/validation.error';
import { Tenant, TenantId } from '@core/tenant/domain/tenant.aggregate';

describe('TenantModelMapper Integration Tests', () => {
  setupSequelize({ models: [TenantModel] });
  it('should throws error when tenant is invalid', () => {
    expect.assertions(2);
    //@ts-expect-error - This is an invalid category
    const model = TenantModel.build({
      tenant_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'a'.repeat(256),
    });
    try {
      TenantModelMapper.toEntity(model);
      fail('The tenant is valid, but it needs throws a EntityValidationError');
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject([
        {
          name: ['name must be shorter than or equal to 255 characters'],
        },
      ]);
    }
  });
  it('should convert a tenant model to a tenant aggregate', () => {
    const created_at = new Date();
    const updated_at = new Date();
    const model = TenantModel.build({
      tenant_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      name: 'some value',
      description: 'some description',
      is_active: true,
      created_at,
      updated_at,
    });
    const aggregate = TenantModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      new Tenant({
        tenant_id: new TenantId('5490020a-e866-4229-9adc-aa44b83234c4'),
        name: 'some value',
        description: 'some description',
        is_active: true,
        created_at,
        updated_at,
      }).toJSON(),
    );
  });
});
