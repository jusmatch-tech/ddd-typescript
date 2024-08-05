"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _configmodule = require("../../config-module/config.module");
const _databasemodule = require("../../database-module/database.module");
const _tenantscontroller = require("../tenants.controller");
const _tenantsmodule = require("../tenants.module");
const _tenantsproviders = require("../tenants.providers");
const _createtenantusecase = require("../../../core/tenant/application/use-case/create-tenant/create-tenant.use-case");
const _updatetenantusecase = require("../../../core/tenant/application/use-case/update-tenant/update-tenant.use-case");
const _listtenantsusecase = require("../../../core/tenant/application/use-case/list-tenants/list-tenants.use-case");
const _gettenantusecase = require("../../../core/tenant/application/use-case/get-tenant/get-tenant.use-case");
const _deletetenantusecase = require("../../../core/tenant/application/use-case/delete-tenant/delete-tenant.use-case");
const _tenantfixture = require("../testing/tenant-fixture");
const _uuidvo = require("../../../core/shared/domain/value-objects/uuid.vo");
const _tenantoutput = require("../../../core/tenant/application/use-case/common/tenant-output");
const _tenantspresenter = require("../tenants.presenter");
const _tenantentity = require("../../../core/tenant/domain/tenant.entity");
describe('TenantsController Integration Tests', ()=>{
    let controller;
    let repository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _configmodule.ConfigModule.forRoot(),
                _databasemodule.DatabaseModule,
                _tenantsmodule.TenantsModule
            ]
        }).compile();
        controller = module.get(_tenantscontroller.TenantsController);
        repository = module.get(_tenantsproviders.TENANT_PROVIDERS.REPOSITORIES.TENANT_REPOSITORY.provide);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
        expect(controller['createUseCase']).toBeInstanceOf(_createtenantusecase.CreateTenantUseCase);
        expect(controller['updateUseCase']).toBeInstanceOf(_updatetenantusecase.UpdateTenantUseCase);
        expect(controller['listUseCase']).toBeInstanceOf(_listtenantsusecase.ListTenantsUseCase);
        expect(controller['getUseCase']).toBeInstanceOf(_gettenantusecase.GetTenantUseCase);
        expect(controller['deleteUseCase']).toBeInstanceOf(_deletetenantusecase.DeleteTenantUseCase);
    });
    describe('should create a tenant', ()=>{
        const arrange = _tenantfixture.CreateTenantFixture.arrangeForCreate();
        test.each(arrange)('when body is $send_data', async ({ send_data, expected })=>{
            const presenter = await controller.create(send_data);
            const entity = await repository.findById(new _uuidvo.Uuid(presenter.id));
            expect(entity.toJSON()).toStrictEqual({
                tenant_id: presenter.id,
                created_at: presenter.created_at,
                updated_at: presenter.updated_at,
                ...expected
            });
            const output = _tenantoutput.TenantOutputMapper.toOutput(entity);
            expect(presenter).toEqual(new _tenantspresenter.TenantPresenter(output));
        });
    });
    describe('should update a tenant', ()=>{
        const arrange = _tenantfixture.UpdateTenantFixture.arrangeForUpdate();
        const tenant = _tenantentity.Tenant.fake().aTenant().build();
        beforeEach(async ()=>{
            await repository.insert(tenant);
        });
        test.each(arrange)('when body is $send_data', async ({ send_data, expected })=>{
            const presenter = await controller.update(tenant.tenant_id.id, send_data);
            const entity = await repository.findById(new _uuidvo.Uuid(presenter.id));
            expect(entity.toJSON()).toStrictEqual({
                tenant_id: presenter.id,
                created_at: presenter.created_at,
                updated_at: presenter.updated_at,
                name: expected.name ?? tenant.name,
                description: 'description' in expected ? expected.description : tenant.description,
                is_active: expected.is_active === true || expected.is_active === false ? expected.is_active : tenant.is_active
            });
            const output = _tenantoutput.TenantOutputMapper.toOutput(entity);
            expect(presenter).toEqual(new _tenantspresenter.TenantPresenter(output));
        });
    });
    it('should delete a tenant', async ()=>{
        const tenant = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(tenant);
        const response = await controller.remove(tenant.tenant_id.id);
        expect(response).not.toBeDefined();
        await expect(repository.findById(tenant.tenant_id)).resolves.toBeNull();
    });
    it('should get a tenant', async ()=>{
        const tenant = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(tenant);
        const presenter = await controller.findOne(tenant.tenant_id.id);
        expect(presenter.id).toBe(tenant.tenant_id.id);
        expect(presenter.name).toBe(tenant.name);
        expect(presenter.description).toBe(tenant.description);
        expect(presenter.is_active).toBe(tenant.is_active);
        expect(presenter.created_at).toStrictEqual(tenant.created_at);
        expect(presenter.updated_at).toStrictEqual(tenant.updated_at);
    });
    describe('search method', ()=>{
        describe('should sorted tenants by created_at', ()=>{
            const { entitiesMap, arrange } = _tenantfixture.ListTenantsFixture.arrangeIncrementedWithCreatedAt();
            beforeEach(async ()=>{
                await repository.bulkInsert(Object.values(entitiesMap));
            });
            test.each(arrange)('when send_data is $send_data', async ({ send_data, expected })=>{
                const presenter = await controller.search(send_data);
                const { entities, ...paginationProps } = expected;
                expect(presenter).toEqual(new _tenantspresenter.TenantCollectionPresenter({
                    items: entities.map(_tenantoutput.TenantOutputMapper.toOutput),
                    ...paginationProps.meta
                }));
            });
        });
        describe('should return tenants using pagination, sort and filter', ()=>{
            const { entitiesMap, arrange } = _tenantfixture.ListTenantsFixture.arrangeUnsorted();
            beforeEach(async ()=>{
                await repository.bulkInsert(Object.values(entitiesMap));
            });
            test.each(arrange)('when send_data is $send_data', async ({ send_data, expected })=>{
                const presenter = await controller.search(send_data);
                const { entities, ...paginationProps } = expected;
                expect(presenter).toEqual(new _tenantspresenter.TenantCollectionPresenter({
                    items: entities.map(_tenantoutput.TenantOutputMapper.toOutput),
                    ...paginationProps.meta
                }));
            });
        });
    });
});

//# sourceMappingURL=tenants.controller.int-spec.js.map