import { CreateTenantUseCase } from '@core/tenant/application/use-case/create-tenant/create-tenant.use-case';
import { TenantInMemoryRepository } from './../../core/tenant/infra/db/in-memory/tenant-in-memory.repository';
import { TenantSequelizeRepository } from '@core/tenant/infra/db/sequelize/tenant-sequelize.repository';
import { TenantModel } from '@core/tenant/infra/db/sequelize/tenant.model';
import { getModelToken } from '@nestjs/sequelize';
import { ITenantRepository } from '@core/tenant/domain/tenant.repository';
import { UpdateTenantUseCase } from '@core/tenant/application/use-case/update-tenant/update-tenant.use-case';
import { ListTenantsUseCase } from '@core/tenant/application/use-case/list-tenants/list-tenants.use-case';
import { GetTenantUseCase } from '@core/tenant/application/use-case/get-tenant/get-tenant.use-case';
import { DeleteTenantUseCase } from '@core/tenant/application/use-case/delete-tenant/delete-tenant.use-case';

export const REPOSITORIES = {
  TENANT_REPOSITORY: {
    provide: 'TenantRepository',
    useExisting: TenantSequelizeRepository,
  },
  TENANT_IN_MEMORY_REPOSITORY: {
    provide: TenantInMemoryRepository,
    useClass: TenantInMemoryRepository,
  },
  TENANT_SEQUELIZE_REPOSITORY: {
    provide: TenantSequelizeRepository,
    useFactory: (tenantModel: typeof TenantModel) => {
      return new TenantSequelizeRepository(tenantModel);
    },
    inject: [getModelToken(TenantModel)],
  },
};

export const USE_CASES = {
  CREATE_TENANT_USE_CASE: {
    provide: CreateTenantUseCase,
    useFactory: (tenantRepo: ITenantRepository) => {
      return new CreateTenantUseCase(tenantRepo);
    },
    inject: [REPOSITORIES.TENANT_REPOSITORY.provide],
  },
  UPDATE_CATEGORY_USE_CASE: {
    provide: UpdateTenantUseCase,
    useFactory: (tenantRepo: ITenantRepository) => {
      return new UpdateTenantUseCase(tenantRepo);
    },
    inject: [REPOSITORIES.TENANT_REPOSITORY.provide],
  },
  LIST_TENANTS_USE_CASE: {
    provide: ListTenantsUseCase,
    useFactory: (tenantsRepo: ITenantRepository) => {
      return new ListTenantsUseCase(tenantsRepo);
    },
    inject: [REPOSITORIES.TENANT_REPOSITORY.provide],
  },
  GET_TENANT_USE_CASE: {
    provide: GetTenantUseCase,
    useFactory: (tenantRepo: ITenantRepository) => {
      return new GetTenantUseCase(tenantRepo);
    },
    inject: [REPOSITORIES.TENANT_REPOSITORY.provide],
  },
  DELETE_TENANT_USE_CASE: {
    provide: DeleteTenantUseCase,
    useFactory: (tenantRepo: ITenantRepository) => {
      return new DeleteTenantUseCase(tenantRepo);
    },
    inject: [REPOSITORIES.TENANT_REPOSITORY.provide],
  },
};

// export const VALIDATIONS = {
//   TENANTS_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
//     provide: TenantsIdExistsInDatabaseValidator,
//     useFactory: (categoryRepo: ICategoryRepository) => {
//       return new CategoriesIdExistsInDatabaseValidator(categoryRepo);
//     },
//     inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
//   },
// };

export const TENANT_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  //VALIDATIONS,
};
