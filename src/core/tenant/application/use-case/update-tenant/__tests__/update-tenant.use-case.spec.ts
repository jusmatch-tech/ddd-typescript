import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { TenantInMemoryRepository } from '../../../../infra/db/in-memory/tenant-in-memory.repository';
import { UpdateTenantUseCase } from '../update-tenant.use-case';
import { Tenant, TenantId } from '../../../../domain/tenant.aggregate';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';

describe('UpdateTenantUseCase Unit tests', () => {
  let useCase: UpdateTenantUseCase;
  let repository: TenantInMemoryRepository;

  beforeEach(() => {
    repository = new TenantInMemoryRepository();
    useCase = new UpdateTenantUseCase(repository);
  });

  it('should throw error when entity not found - invalid UUID', async () => {
    const input = {
      id: 'invalid-uuid',
      name: 'new name',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new InvalidUuidError(),
    );
  });

  it('should throw error when entity not found - valid UUID', async () => {
    const tenantId = new TenantId();

    const input = {
      id: tenantId.id,
      name: 'new name',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(input.id, Tenant),
    );
  });

  it('should update entity - name', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const entity = new Tenant({
      name: 'name',
    });
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.tenant_id.id,
      name: 'new name',
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.tenant_id.id,
      name: 'new name',
      description: null,
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
      const expectedResult = {
        id: entity.tenant_id.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      };
      expect(output).toStrictEqual(expectedResult);
    }
  });
});
