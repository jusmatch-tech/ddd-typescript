"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuidvo = require("../../../../../shared/domain/value-objects/uuid.vo");
const _helpers = require("../../../../../shared/infra/testing/helpers");
const _tenantsequelizerepository = require("../../../../infra/db/sequelize/tenant-sequelize.repository");
const _tenantmodel = require("../../../../infra/db/sequelize/tenant.model");
const _createtenantusecase = require("../create-tenant.use-case");
describe('CreateTenantUseCase Integration Tests', ()=>{
    let useCase;
    let repository;
    (0, _helpers.setupSequelize)({
        models: [
            _tenantmodel.TenantModel
        ]
    });
    beforeEach(()=>{
        repository = new _tenantsequelizerepository.TenantSequelizeRepository(_tenantmodel.TenantModel);
        useCase = new _createtenantusecase.CreateTenantUseCase(repository);
    });
    it('should create a new tenant', async ()=>{
        let output = await useCase.execute({
            name: 'test'
        });
        let entity = await repository.findById(new _uuidvo.Uuid(output.id));
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
        output = await useCase.execute({
            name: 'test2',
            description: 'test description'
        });
        entity = await repository.findById(new _uuidvo.Uuid(output.id));
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
        output = await useCase.execute({
            name: 'test3',
            description: 'test description',
            is_active: false
        });
        entity = await repository.findById(new _uuidvo.Uuid(output.id));
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
        output = await useCase.execute({
            name: 'test4',
            description: 'test description',
            is_active: true
        });
        entity = await repository.findById(new _uuidvo.Uuid(output.id));
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

//# sourceMappingURL=create-tenant.use-case.int-spec.js.map