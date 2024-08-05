import { TenantSequelizeRepository } from '../tenant-sequelize.repository';
import { Tenant, TenantId } from '../../../../domain/tenant.aggregate';
import { TenantModel } from '../tenant.model';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
describe('TenantSequelizeRepository integration tests', () => {
  let repository: TenantSequelizeRepository;

  setupSequelize({ models: [TenantModel] });
  beforeEach(async () => {
    repository = new TenantSequelizeRepository(TenantModel);
  });

  test('should insert a new tenant', async () => {
    // eslint-disable-next-line prefer-const
    let tenant = Tenant.fake().aTenant().build();
    await repository.insert(tenant);
    const entity = await repository.findById(tenant.tenant_id);

    expect(entity!.toJSON()).toStrictEqual(tenant.toJSON());
  });

  it('finds a entity by id', async () => {
    let entityFound = await repository.findById(new TenantId());
    expect(entityFound).toBeNull();

    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);
    entityFound = await repository.findById(entity.tenant_id);
    expect(entityFound!.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should return all entities', async () => {
    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it('should throw error on update when a entity not found', async () => {
    const entity = Tenant.fake().aTenant().build();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.tenant_id.id, Tenant),
    );
  });

  it('should update a entity', async () => {
    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);
    entity.changeName('new name');
    await repository.update(entity);
    const entityFound = await repository.findById(entity.tenant_id);
    expect(entityFound!.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error on delete when a entity not found', async () => {
    const tenantId = new TenantId();
    await expect(repository.delete(tenantId)).rejects.toThrow(
      new NotFoundError(tenantId.id, Tenant),
    );
  });

  it('should delete a entity', async () => {
    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);
    await repository.delete(entity.tenant_id);
    const entityFound = await repository.findById(entity.tenant_id);
    expect(entityFound).toBeNull();
  });
});
