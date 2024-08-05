import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { Tenant, TenantId } from '../../../../domain/tenant.aggregate';
import { TenantSequelizeRepository } from '../../../../infra/db/sequelize/tenant-sequelize.repository';
import { TenantModel } from '../../../../infra/db/sequelize/tenant.model';
import { DeleteTenantUseCase } from '../delete-tenant.use-case';

describe('DeleteTenantUseCase Integration tests', () => {
  let useCase: DeleteTenantUseCase;
  let repository: TenantSequelizeRepository;

  setupSequelize({ models: [TenantModel] });

  beforeEach(() => {
    repository = new TenantSequelizeRepository(TenantModel);
    useCase = new DeleteTenantUseCase(repository);
  });

  it('Should Throw error when entity not found', async () => {
    const tenantId = new TenantId();
    const input = {
      id: tenantId.id,
      name: 'new name',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(input.id, Tenant),
    );
  });

  it('Should delete an Tenant', async () => {
    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);

    await useCase.execute({
      id: entity.tenant_id.id,
    });

    const hasNoModel = await repository.findById(entity.tenant_id);
    expect(hasNoModel).toBeNull();
  });
});
