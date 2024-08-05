import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { Tenant, TenantId } from '../../../../domain/tenant.aggregate';
import { TenantInMemoryRepository } from '../../../../infra/db/in-memory/tenant-in-memory.repository';
import { GetTenantUseCase } from '../get-tenant.use-case';

describe('GetTenantUseCase Unit tests', () => {
  let useCase: GetTenantUseCase;
  let repository: TenantInMemoryRepository;

  beforeEach(() => {
    repository = new TenantInMemoryRepository();
    useCase = new GetTenantUseCase(repository);
  });

  it('should throw error when entity not found - invalid UUID', async () => {
    const input = {
      id: 'invalid-uuid',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new InvalidUuidError(),
    );
  });

  it('should throw error when entity not found - valid UUID', async () => {
    const tenantId = new TenantId();
    const input = {
      id: tenantId.id,
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(input.id, Tenant),
    );
  });

  it('should get entity', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const entity = new Tenant({
      name: 'name',
    });
    repository.items = [entity];

    const output = await useCase.execute({
      id: entity.tenant_id.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.tenant_id.id,
      name: 'name',
      description: null,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
