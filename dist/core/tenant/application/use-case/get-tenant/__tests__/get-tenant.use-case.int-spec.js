"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _notfounderror = require("../../../../../shared/domain/errors/not-found.error");
const _helpers = require("../../../../../shared/infra/testing/helpers");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantsequelizerepository = require("../../../../infra/db/sequelize/tenant-sequelize.repository");
const _tenantmodel = require("../../../../infra/db/sequelize/tenant.model");
const _gettenantusecase = require("../get-tenant.use-case");
describe('GetTenantUseCase Integration tests', ()=>{
    let useCase;
    let repository;
    (0, _helpers.setupSequelize)({
        models: [
            _tenantmodel.TenantModel
        ]
    });
    beforeEach(()=>{
        repository = new _tenantsequelizerepository.TenantSequelizeRepository(_tenantmodel.TenantModel);
        useCase = new _gettenantusecase.GetTenantUseCase(repository);
    });
    it('Should Throw error when entity not found', async ()=>{
        const input = {
            id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant));
    });
    it('Should get an Tenant', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        let output = await useCase.execute({
            id: entity.tenant_id.id
        });
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
    });
});

//# sourceMappingURL=get-tenant.use-case.int-spec.js.map