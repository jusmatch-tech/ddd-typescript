"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _tenantsequelizerepository = require("../tenant-sequelize.repository");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantmodel = require("../tenant.model");
const _uuidvo = require("../../../../../shared/domain/value-objects/uuid.vo");
const _notfounderror = require("../../../../../shared/domain/errors/not-found.error");
const _helpers = require("../../../../../shared/infra/testing/helpers");
describe('TenantSequelizeRepository integration tests', ()=>{
    let repository;
    (0, _helpers.setupSequelize)({
        models: [
            _tenantmodel.TenantModel
        ]
    });
    beforeEach(async ()=>{
        repository = new _tenantsequelizerepository.TenantSequelizeRepository(_tenantmodel.TenantModel);
    });
    test('should insert a new tenant', async ()=>{
        let tenant = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(tenant);
        let entity = await repository.findById(tenant.tenant_id);
        expect(entity.toJSON()).toStrictEqual(tenant.toJSON());
    });
    it('finds a entity by id', async ()=>{
        let entityFound = await repository.findById(new _uuidvo.Uuid());
        expect(entityFound).toBeNull();
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        entityFound = await repository.findById(entity.tenant_id);
        expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
    });
    it('should return all entities', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities).toHaveLength(1);
        expect(JSON.stringify(entities)).toBe(JSON.stringify([
            entity
        ]));
    });
    it('should theow error on update when a entity not found', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await expect(repository.update(entity)).rejects.toThrow(new _notfounderror.NotFoundError(entity.tenant_id.id, _tenantentity.Tenant));
    });
    it('should update a entity', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        entity.changeName('new name');
        await repository.update(entity);
        const entityFound = await repository.findById(entity.tenant_id);
        expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
    });
    it('should throw error on delete when a entity not found', async ()=>{
        const tenantId = new _uuidvo.Uuid();
        await expect(repository.delete(tenantId)).rejects.toThrow(new _notfounderror.NotFoundError(tenantId.id, _tenantentity.Tenant));
    });
    it('should delete a entity', async ()=>{
        const entity = _tenantentity.Tenant.fake().aTenant().build();
        await repository.insert(entity);
        await repository.delete(entity.tenant_id);
        const entityFound = await repository.findById(entity.tenant_id);
        expect(entityFound).toBeNull();
    });
});

//# sourceMappingURL=tenant-sequelize.repository.int-spec.js.map