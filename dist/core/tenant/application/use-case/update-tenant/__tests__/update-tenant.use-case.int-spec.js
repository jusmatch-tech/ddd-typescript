"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _notfounderror = require("../../../../../shared/domain/errors/not-found.error");
const _uuidvo = require("../../../../../shared/domain/value-objects/uuid.vo");
const _helpers = require("../../../../../shared/infra/testing/helpers");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantsequelizerepository = require("../../../../infra/db/sequelize/tenant-sequelize.repository");
const _tenantmodel = require("../../../../infra/db/sequelize/tenant.model");
const _updatetenantusecase = require("../update-tenant.use-case");
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
        useCase = new _updatetenantusecase.UpdateTenantUseCase(repository);
    });
    it('Should Throw error when entity not found', async ()=>{
        const input = {
            id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a',
            name: 'new name'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant));
    });
    it('Should update entity - name', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        let output = await useCase.execute({
            id: entity.tenant_id.id,
            name: 'new name'
        });
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: 'new name',
            description: entity.description,
            is_active: true,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
        const arrange = [
            {
                input: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    description: 'some description'
                },
                expected: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    description: 'some description',
                    is_active: true,
                    created_at: entity.created_at,
                    updated_at: entity.updated_at
                }
            },
            {
                input: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    description: null
                },
                expected: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                    updated_at: entity.updated_at
                }
            },
            {
                input: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    is_active: false
                },
                expected: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    description: null,
                    is_active: false,
                    created_at: entity.created_at,
                    updated_at: entity.updated_at
                }
            },
            {
                input: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    is_active: true
                },
                expected: {
                    id: entity.tenant_id.id,
                    name: 'test',
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                    updated_at: entity.updated_at
                }
            }
        ];
        for (const i of arrange){
            output = await useCase.execute({
                id: i.input.id,
                ..."name" in i.input && {
                    name: i.input.name
                },
                ..."description" in i.input && {
                    description: i.input.description
                },
                ..."is_active" in i.input && {
                    is_active: i.input.is_active
                }
            });
            const entityUpdated = await repository.findById(new _uuidvo.Uuid(i.input.id));
            expect(output).toStrictEqual({
                id: entity.tenant_id.id,
                name: i.expected.name,
                description: i.expected.description,
                is_active: i.expected.is_active,
                created_at: entityUpdated.created_at,
                updated_at: entityUpdated.updated_at
            });
        }
    });
});

//# sourceMappingURL=update-tenant.use-case.int-spec.js.map