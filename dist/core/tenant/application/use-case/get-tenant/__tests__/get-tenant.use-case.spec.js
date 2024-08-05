"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _notfounderror = require("../../../../../shared/domain/errors/not-found.error");
const _uuidvo = require("../../../../../shared/domain/value-objects/uuid.vo");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantinmemoryrepository = require("../../../../infra/db/in-memory/tenant-in-memory.repository");
const _gettenantusecase = require("../get-tenant.use-case");
describe('GetTenantUseCase Unit tests', ()=>{
    let useCase;
    let repository;
    beforeEach(()=>{
        repository = new _tenantinmemoryrepository.TenantInMemoryRepository();
        useCase = new _gettenantusecase.GetTenantUseCase(repository);
    });
    it('should throw error when entity not found - invalid UUID', async ()=>{
        const input = {
            id: 'invalid-uuid'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _uuidvo.InvalidUuidError());
    });
    it('should throw error when entity not found - valid UUID', async ()=>{
        const input = {
            id: 'f0b8b6c4-aae6-4a0d-8d6e-6d8b1a8c8e4a'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant));
    });
    it('should get entity', async ()=>{
        const spyFindById = jest.spyOn(repository, 'findById');
        const entity = new _tenantentity.Tenant({
            name: 'name'
        });
        repository.items = [
            entity
        ];
        let output = await useCase.execute({
            id: entity.tenant_id.id
        });
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: 'name',
            description: null,
            is_active: true,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
    });
});

//# sourceMappingURL=get-tenant.use-case.spec.js.map