import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config-module/config.module';
import { DatabaseModule } from '../../database-module/database.module';
import { TenantsController } from '../tenants.controller';
import { ITenantRepository } from '@core/tenant/domain/tenant.repository';
import { TenantsModule } from '../tenants.module';
import { TENANT_PROVIDERS } from '../tenants.providers';
import { CreateTenantUseCase } from '@core/tenant/application/use-case/create-tenant/create-tenant.use-case';
import { UpdateTenantUseCase } from '@core/tenant/application/use-case/update-tenant/update-tenant.use-case';
import { ListTenantsUseCase } from '@core/tenant/application/use-case/list-tenants/list-tenants.use-case';
import { GetTenantUseCase } from '@core/tenant/application/use-case/get-tenant/get-tenant.use-case';
import { DeleteTenantUseCase } from '@core/tenant/application/use-case/delete-tenant/delete-tenant.use-case';
import {
  CreateTenantFixture,
  ListTenantsFixture,
  UpdateTenantFixture,
} from '../testing/tenant-fixture';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';
import { TenantOutputMapper } from '@core/tenant/application/use-case/common/tenant-output';
import {
  TenantCollectionPresenter,
  TenantPresenter,
} from '../tenants.presenter';
import { Tenant } from '@core/tenant/domain/tenant.aggregate';

describe('TenantsController Integration Tests', () => {
  let controller: TenantsController;
  let repository: ITenantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, TenantsModule],
    }).compile();
    controller = module.get<TenantsController>(TenantsController);
    repository = module.get<ITenantRepository>(
      TENANT_PROVIDERS.REPOSITORIES.TENANT_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateTenantUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateTenantUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListTenantsUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetTenantUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteTenantUseCase);
  });

  describe('should create a tenant', () => {
    const arrange = CreateTenantFixture.arrangeForCreate();
    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.create(send_data);
        const entity = await repository.findById(new Uuid(presenter.id));
        expect(entity!.toJSON()).toStrictEqual({
          tenant_id: presenter.id,
          created_at: presenter.created_at,
          updated_at: presenter.updated_at,
          ...expected,
        });
        const output = TenantOutputMapper.toOutput(entity!);
        expect(presenter).toEqual(new TenantPresenter(output));
      },
    );
  });

  describe('should update a tenant', () => {
    const arrange = UpdateTenantFixture.arrangeForUpdate();

    const tenant = Tenant.fake().aTenant().build();

    beforeEach(async () => {
      await repository.insert(tenant);
    });

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.update(
          tenant.tenant_id.id,
          send_data,
        );
        const entity = await repository.findById(new Uuid(presenter.id));
        expect(entity!.toJSON()).toStrictEqual({
          tenant_id: presenter.id,
          created_at: presenter.created_at,
          updated_at: presenter.updated_at,
          name: expected.name ?? tenant.name,
          description:
            'description' in expected
              ? expected.description
              : tenant.description,
          is_active:
            expected.is_active === true || expected.is_active === false
              ? expected.is_active
              : tenant.is_active,
        });
        const output = TenantOutputMapper.toOutput(entity!);
        expect(presenter).toEqual(new TenantPresenter(output));
      },
    );
  });

  it('should delete a tenant', async () => {
    const tenant = Tenant.fake().aTenant().build();
    await repository.insert(tenant);
    const response = await controller.remove(tenant.tenant_id.id);
    expect(response).not.toBeDefined();
    await expect(repository.findById(tenant.tenant_id)).resolves.toBeNull();
  });

  it('should get a tenant', async () => {
    const tenant = Tenant.fake().aTenant().build();
    await repository.insert(tenant);
    const presenter = await controller.findOne(tenant.tenant_id.id);

    expect(presenter.id).toBe(tenant.tenant_id.id);
    expect(presenter.name).toBe(tenant.name);
    expect(presenter.description).toBe(tenant.description);
    expect(presenter.is_active).toBe(tenant.is_active);
    expect(presenter.created_at).toStrictEqual(tenant.created_at);
    expect(presenter.updated_at).toStrictEqual(tenant.updated_at);
  });

  describe('search method', () => {
    describe('should sorted tenants by created_at', () => {
      const { entitiesMap, arrange } =
        ListTenantsFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(
            new TenantCollectionPresenter({
              items: entities.map(TenantOutputMapper.toOutput),
              ...paginationProps.meta,
            }),
          );
        },
      );
    });

    describe('should return tenants using pagination, sort and filter', () => {
      const { entitiesMap, arrange } = ListTenantsFixture.arrangeUnsorted();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(
            new TenantCollectionPresenter({
              items: entities.map(TenantOutputMapper.toOutput),
              ...paginationProps.meta,
            }),
          );
        },
      );
    });
  });
});
