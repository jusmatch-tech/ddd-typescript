import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { Tenant, TenantId } from '../../../../domain/tenant.aggregate';
import { TenantSequelizeRepository } from '../../../../infra/db/sequelize/tenant-sequelize.repository';
import { TenantModel } from '../../../../infra/db/sequelize/tenant.model';
import { GetTenantUseCase } from '../get-tenant.use-case';

describe('GetTenantUseCase Integration tests', () => {
  let useCase: GetTenantUseCase;
  let repository: TenantSequelizeRepository;

  setupSequelize({ models: [TenantModel] });

  beforeEach(() => {
    repository = new TenantSequelizeRepository(TenantModel);
    useCase = new GetTenantUseCase(repository);
  });

  it('Should Throw error when entity not found', async () => {
    const tenantId = new TenantId();
    const input = {
      id: tenantId.id,
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(input.id, Tenant),
    );
  });

  it('Should get an Tenant', async () => {
    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);

    const output = await useCase.execute({
      id: entity.tenant_id.id,
    });
    expect(output).toStrictEqual({
      id: entity.tenant_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
