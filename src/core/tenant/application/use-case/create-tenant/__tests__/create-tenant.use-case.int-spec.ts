import { Uuid } from '../../../../../shared/domain/value-objects/uuid.vo';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { TenantSequelizeRepository } from '../../../../infra/db/sequelize/tenant-sequelize.repository';
import { TenantModel } from '../../../../infra/db/sequelize/tenant.model';
import { CreateTenantUseCase } from '../create-tenant.use-case';

describe('CreateTenantUseCase Integration Tests', () => {
  let useCase: CreateTenantUseCase;
  let repository: TenantSequelizeRepository;

  setupSequelize({ models: [TenantModel] });

  beforeEach(() => {
    repository = new TenantSequelizeRepository(TenantModel);
    useCase = new CreateTenantUseCase(repository);
  });

  it('should create a new tenant', async () => {
    let output = await useCase.execute({ name: 'test' });
    let entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.tenant_id.id,
      name: entity!.name,
      description: entity!.description,
      is_active: entity!.is_active,
      created_at: entity!.created_at,
      updated_at: entity!.updated_at,
    });

    output = await useCase.execute({
      name: 'test2',
      description: 'test description',
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.tenant_id.id,
      name: entity!.name,
      description: entity!.description,
      is_active: entity!.is_active,
      created_at: entity!.created_at,
      updated_at: entity!.updated_at,
    });

    output = await useCase.execute({
      name: 'test3',
      description: 'test description',
      is_active: false,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.tenant_id.id,
      name: entity!.name,
      description: entity!.description,
      is_active: entity!.is_active,
      created_at: entity!.created_at,
      updated_at: entity!.updated_at,
    });

    output = await useCase.execute({
      name: 'test4',
      description: 'test description',
      is_active: true,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.tenant_id.id,
      name: entity!.name,
      description: entity!.description,
      is_active: entity!.is_active,
      created_at: entity!.created_at,
      updated_at: entity!.updated_at,
    });
  });
});
