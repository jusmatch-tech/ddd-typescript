"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REPOSITORIES: function() {
        return REPOSITORIES;
    },
    TENANT_PROVIDERS: function() {
        return TENANT_PROVIDERS;
    },
    USE_CASES: function() {
        return USE_CASES;
    }
});
const _createtenantusecase = require("../../core/tenant/application/use-case/create-tenant/create-tenant.use-case");
const _tenantinmemoryrepository = require("../../core/tenant/infra/db/in-memory/tenant-in-memory.repository");
const _tenantsequelizerepository = require("../../core/tenant/infra/db/sequelize/tenant-sequelize.repository");
const _tenantmodel = require("../../core/tenant/infra/db/sequelize/tenant.model");
const _sequelize = require("@nestjs/sequelize");
const _updatetenantusecase = require("../../core/tenant/application/use-case/update-tenant/update-tenant.use-case");
const _listtenantsusecase = require("../../core/tenant/application/use-case/list-tenants/list-tenants.use-case");
const _gettenantusecase = require("../../core/tenant/application/use-case/get-tenant/get-tenant.use-case");
const _deletetenantusecase = require("../../core/tenant/application/use-case/delete-tenant/delete-tenant.use-case");
const REPOSITORIES = {
    TENANT_REPOSITORY: {
        provide: 'TenantRepository',
        useExisting: _tenantsequelizerepository.TenantSequelizeRepository
    },
    TENANT_IN_MEMORY_REPOSITORY: {
        provide: _tenantinmemoryrepository.TenantInMemoryRepository,
        useClass: _tenantinmemoryrepository.TenantInMemoryRepository
    },
    TENANT_SEQUELIZE_REPOSITORY: {
        provide: _tenantsequelizerepository.TenantSequelizeRepository,
        useFactory: (tenantModel)=>{
            return new _tenantsequelizerepository.TenantSequelizeRepository(tenantModel);
        },
        inject: [
            (0, _sequelize.getModelToken)(_tenantmodel.TenantModel)
        ]
    }
};
const USE_CASES = {
    CREATE_TENANT_USE_CASE: {
        provide: _createtenantusecase.CreateTenantUseCase,
        useFactory: (tenantRepo)=>{
            return new _createtenantusecase.CreateTenantUseCase(tenantRepo);
        },
        inject: [
            REPOSITORIES.TENANT_REPOSITORY.provide
        ]
    },
    UPDATE_CATEGORY_USE_CASE: {
        provide: _updatetenantusecase.UpdateTenantUseCase,
        useFactory: (tenantRepo)=>{
            return new _updatetenantusecase.UpdateTenantUseCase(tenantRepo);
        },
        inject: [
            REPOSITORIES.TENANT_REPOSITORY.provide
        ]
    },
    LIST_TENANTS_USE_CASE: {
        provide: _listtenantsusecase.ListTenantsUseCase,
        useFactory: (tenantsRepo)=>{
            return new _listtenantsusecase.ListTenantsUseCase(tenantsRepo);
        },
        inject: [
            REPOSITORIES.TENANT_REPOSITORY.provide
        ]
    },
    GET_TENANT_USE_CASE: {
        provide: _gettenantusecase.GetTenantUseCase,
        useFactory: (tenantRepo)=>{
            return new _gettenantusecase.GetTenantUseCase(tenantRepo);
        },
        inject: [
            REPOSITORIES.TENANT_REPOSITORY.provide
        ]
    },
    DELETE_TENANT_USE_CASE: {
        provide: _deletetenantusecase.DeleteTenantUseCase,
        useFactory: (tenantRepo)=>{
            return new _deletetenantusecase.DeleteTenantUseCase(tenantRepo);
        },
        inject: [
            REPOSITORIES.TENANT_REPOSITORY.provide
        ]
    }
};
const TENANT_PROVIDERS = {
    REPOSITORIES,
    USE_CASES
};

//# sourceMappingURL=tenants.providers.js.map