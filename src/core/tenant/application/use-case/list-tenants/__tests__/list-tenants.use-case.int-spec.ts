import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { Tenant } from '../../../../domain/tenant.aggregate';
import { TenantSequelizeRepository } from '../../../../infra/db/sequelize/tenant-sequelize.repository';
import { TenantModel } from '../../../../infra/db/sequelize/tenant.model';
import { TenantOutputMapper } from '../../common/tenant-output';
import { ListTenantsUseCase } from '../list-tenants.use-case';

describe('ListTenantUseCase Integration tests', () => {
  let useCase: ListTenantsUseCase;
  let repository: TenantSequelizeRepository;

  setupSequelize({ models: [TenantModel] });

  beforeEach(() => {
    repository = new TenantSequelizeRepository(TenantModel);
    useCase = new ListTenantsUseCase(repository);
  });

  it('should return output sorted by created_at when input params is empty', async () => {
    const tenants = Tenant.fake()
      .theTenants(2)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build();

    await repository.bulkInsert(tenants);

    const output = await useCase.execute({});
    expect(output).toEqual({
      items: [...tenants].reverse().map(TenantOutputMapper.toOutput),
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
    await repository.bulkInsert(items);

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'a',
    });
    expect(output).toEqual({
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
    expect(output).toEqual({
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
