import { TenantInMemoryRepository } from "../../../../infra/db/in-memory/tenant-in-memory.repository";
import { CreateTenantUseCase } from "../create-tenant.use-case";

describe('CreateTenantUseCase Unit Tests', () => {
  let useCase: CreateTenantUseCase;
  let repository: TenantInMemoryRepository;

  beforeEach(() => {
    repository = new TenantInMemoryRepository();
    useCase = new CreateTenantUseCase(repository);
  });

  it('should create a new tenant', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({ name: 'test' });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].tenant_id.id,
      name: 'test',
      description: null,
      is_active: true, 
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at
    });

    output = await useCase.execute({ 
      name: 'test2', 
      description: 'test description', 
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);

    expect(output).toStrictEqual({
      id: repository.items[1].tenant_id.id,
      name: 'test2',
      description: 'test description',
      is_active: false, 
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at
    });
  });

});