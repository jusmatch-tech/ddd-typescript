"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _notfounderror = require("../../../../../shared/domain/errors/not-found.error");
const _helpers = require("../../../../../shared/infra/testing/helpers");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantsequelizerepository = require("../../../../infra/db/sequelize/tenant-sequelize.repository");
const _tenantmodel = require("../../../../infra/db/sequelize/tenant.model");
const _deletetenantusecase = require("../delete-tenant.use-case");
describe('UpdateTenantUseCase Integration tests', ()=>{
    let useCase;
    let repository;
    (0, _helpers.setupSequelize)({
        models: [
            _tenantmodel.TenantModel
        ]
    });
    beforeEach(()=>{
        repository = new _tenantsequelizerepository.TenantSequelizeRepository(_tenantmodel.TenantModel);
        useCase = new _deletetenantusecase.DeleteTenantUseCase(repository);
    });
    it('Should Throw error when entity not found', async ()=>{
        const input = {
            id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a',
            name: 'new name'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant));
    });
    it('Should delete an Tenant', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        await useCase.execute({
            id: entity.tenant_id.id
        });
        const hasNoModel = await repository.findById(entity.tenant_id);
        expect(hasNoModel).toBeNull();
    });
});

//# sourceMappingURL=delete-tenant.use-case.int-spec.js.map