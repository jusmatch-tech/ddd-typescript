import { Tenant } from '../../../../domain/tenant.aggregate';
import { TenantSearchResult } from '../../../../domain/tenant.repository';
import { TenantInMemoryRepository } from '../../../../infra/db/in-memory/tenant-in-memory.repository';
import { TenantOutputMapper } from '../../common/tenant-output';
import { ListTenantsUseCase } from '../list-tenants.use-case';

describe('ListTenantUseCase Unit tests', () => {
  let useCase: ListTenantsUseCase;
  let repository: TenantInMemoryRepository;

  beforeEach(() => {
    repository = new TenantInMemoryRepository();
    useCase = new ListTenantsUseCase(repository);
  });

  test('output method', async () => {
    let result = new TenantSearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = Tenant.create({ name: 'test' });
    result = new TenantSearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity].map(TenantOutputMapper.toOutput),
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should return output sorted by created_at when input params is empty', async () => {
    const items = [
      new Tenant({ name: 'test1' }),
      new Tenant({
        name: 'test2',
        created_at: new Date(new Date().getTime() + 1000),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      items: [...items].reverse().map(TenantOutputMapper.toOutput),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('should return output using pagination, sort and filter', async () => {
    const items = [
      new Tenant({ name: 'a' }),
      new Tenant({
        name: 'AAA',
      }),
      new Tenant({
        name: 'AaA',
      }),
      new Tenant({
        name: 'b',
      }),
      new Tenant({
        name: 'c',
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[1], items[2]].map(TenantOutputMapper.toOutput),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0]].map(TenantOutputMapper.toOutput),
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0], items[2]].map(TenantOutputMapper.toOutput),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
