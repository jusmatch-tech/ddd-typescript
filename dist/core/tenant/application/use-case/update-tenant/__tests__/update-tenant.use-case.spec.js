"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuidvo = require("../../../../../shared/domain/value-objects/uuid.vo");
const _tenantinmemoryrepository = require("../../../../infra/db/in-memory/tenant-in-memory.repository");
const _updatetenantusecase = require("../update-tenant.use-case");
const _tenantentity = require("../../../../domain/tenant.entity");
const _notfounderror = require("../../../../../shared/domain/errors/not-found.error");
describe('UpdateTenantUseCase Unit tests', ()=>{
    let useCase;
    let repository;
    beforeEach(()=>{
        repository = new _tenantinmemoryrepository.TenantInMemoryRepository();
        useCase = new _updatetenantusecase.UpdateTenantUseCase(repository);
    });
    it('should throw error when entity not found - invalid UUID', async ()=>{
        const input = {
            id: 'invalid-uuid',
            name: 'new name'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _uuidvo.InvalidUuidError());
    });
    it('should throw error when entity not found - valid UUID', async ()=>{
        const input = {
            id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a',
            name: 'new name'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant));
    });
    it('should update entity - name', async ()=>{
        const spyUpdate = jest.spyOn(repository, 'update');
        const entity = new _tenantentity.Tenant({
            name: 'name'
        });
        repository.items = [
            entity
        ];
        let output = await useCase.execute({
            id: entity.tenant_id.id,
            name: 'new name'
        });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: 'new name',
            description: null,
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

//# sourceMappingURL=update-tenant.use-case.spec.js.map