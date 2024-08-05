import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { Tenant } from '../../../../domain/tenant.aggregate';
import { TenantInMemoryRepository } from '../../../../infra/db/in-memory/tenant-in-memory.repository';
import { DeleteTenantUseCase } from '../delete-tenant.use-case';

describe('DeleteTenantUseCase Unit tests', () => {
  let useCase: DeleteTenantUseCase;
  let repository: TenantInMemoryRepository;

  beforeEach(() => {
    repository = new TenantInMemoryRepository();
    useCase = new DeleteTenantUseCase(repository);
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
    const input = {
      id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(input.id, Tenant),
    );
  });

  it('should delete entity - valid UUID', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const entity = new Tenant({
      name: 'name',
    });
    repository.items = [entity];

    const output = await useCase.execute({
      id: entity.tenant_id.id,
    });

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(output).toBeUndefined();

    const hasNoModel = await repository.findById(entity.tenant_id);
    expect(hasNoModel).toBeNull();
  });
});
