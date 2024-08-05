import { Tenant } from '../../../../domain/tenant.aggregate';
import { TenantOutputMapper } from '../tenant-output';

describe('TenantOutputMapper unit tests', () => {
  it('should convert a tenant in output', () => {
    const entity: Tenant = new Tenant({
      name: 'Tenant 1',
      description: 'Description of tenant 1',
      is_active: true,
    });

    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = TenantOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.tenant_id.id,
      name: 'Tenant 1',
      description: 'Description of tenant 1',
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
