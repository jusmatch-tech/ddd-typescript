import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { Uuid } from '../../../../../shared/domain/value-objects/uuid.vo';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { Tenant } from '../../../../domain/tenant.aggregate';
import { TenantSequelizeRepository } from '../../../../infra/db/sequelize/tenant-sequelize.repository';
import { TenantModel } from '../../../../infra/db/sequelize/tenant.model';
import { UpdateTenantUseCase } from '../update-tenant.use-case';

describe('UpdateTenantUseCase Integration tests', () => {
  let useCase: UpdateTenantUseCase;
  let repository: TenantSequelizeRepository;

  setupSequelize({ models: [TenantModel] });

  beforeEach(() => {
    repository = new TenantSequelizeRepository(TenantModel);
    useCase = new UpdateTenantUseCase(repository);
  });

  it('Should Throw error when entity not found', async () => {
    const input = {
      id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a',
      name: 'new name',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(input.id, Tenant),
    );
  });

  it('Should update entity - name', async () => {
    const entity = Tenant.fake().aTenant().build();
    await repository.insert(entity);

    let output = await useCase.execute({
      id: entity.tenant_id.id,
      name: 'new name',
    });
    expect(output).toStrictEqual({
      id: entity.tenant_id.id,
      name: 'new name',
      description: entity.description,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
    type Arrange = {
      input: {
        id: string;
        name: string;
        description?: string | null;
        is_active?: boolean;
      };
      expected: {
        id: string;
        name: string;
        description?: string | null;
        is_active?: boolean;
        created_at: Date;
        updated_at: Date;
      };
    };

    const arrange: Arrange[] = [
      {
        input: {
          id: entity.tenant_id.id,
          name: 'test',
          description: 'some description',
        },
        expected: {
          id: entity.tenant_id.id,
          name: 'test',
          description: 'some description',
          is_active: true,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.tenant_id.id,
          name: 'test',
          description: null,
        },
        expected: {
          id: entity.tenant_id.id,
          name: 'test',
          description: null,
          is_active: true,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.tenant_id.id,
          name: 'test',
          is_active: false,
        },
        expected: {
          id: entity.tenant_id.id,
          name: 'test',
          description: null,
          is_active: false,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.tenant_id.id,
          name: 'test',
          is_active: true,
        },
        expected: {
          id: entity.tenant_id.id,
          name: 'test',
          description: null,
          is_active: true,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        ...('name' in i.input && { name: i.input.name }),
        ...('description' in i.input && { description: i.input.description }),
        ...('is_active' in i.input && { is_active: i.input.is_active }),
      });
      const entityUpdated = await repository.findById(new Uuid(i.input.id));

      expect(output).toStrictEqual({
        id: entity.tenant_id.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      });
    }
  });
});
