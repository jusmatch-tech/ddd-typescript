"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantinmemoryrepository = require("../tenant-in-memory.repository");
describe('TenantInMemoryRepository', ()=>{
    let repository;
    beforeEach(()=>repository = new _tenantinmemoryrepository.TenantInMemoryRepository());
    it('should no filter items when filter object is null', async ()=>{
        const items = [
            _tenantentity.Tenant.fake().aTenant().build()
        ];
        const filterSpy = jest.spyOn(items, 'filter');
        const itemsFiltered = await repository['applyFilter'](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(items);
    });
    it('should filter items using filter parameter', async ()=>{
        const items = [
            _tenantentity.Tenant.fake().aTenant().withName('test').build(),
            _tenantentity.Tenant.fake().aTenant().withName('TEST').build(),
            _tenantentity.Tenant.fake().aTenant().withName('fake').build()
        ];
        const filterSpy = jest.spyOn(items, 'filter');
        const itemsFiltered = await repository['applyFilter'](items, 'TEST');
        expect(filterSpy).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual([
            items[0],
            items[1]
        ]);
    });
    it('should sort by created_at when sort param is null', async ()=>{
        const created_at = new Date();
        const items = [
            _tenantentity.Tenant.fake().aTenant().withName('test').withCreatedAt(created_at).build(),
            _tenantentity.Tenant.fake().aTenant().withName('TEST').withCreatedAt(new Date(created_at.getTime() + 100)).build(),
            _tenantentity.Tenant.fake().aTenant().withName('fake').withCreatedAt(new Date(created_at.getTime() + 200)).build()
        ];
        const itemsSorted = await repository['applySort'](items, null, null);
        expect(itemsSorted).toStrictEqual([
            items[2],
            items[1],
            items[0]
        ]);
    });
    it('should sort by name', async ()=>{
        const items = [
            _tenantentity.Tenant.fake().aTenant().withName('c').build(),
            _tenantentity.Tenant.fake().aTenant().withName('b').build(),
            _tenantentity.Tenant.fake().aTenant().withName('a').build()
        ];
        let itemsSorted = await repository['applySort'](items, 'name', 'asc');
        expect(itemsSorted).toStrictEqual([
            items[2],
            items[1],
            items[0]
        ]);
        itemsSorted = await repository['applySort'](items, 'name', 'desc');
        expect(itemsSorted).toStrictEqual([
            items[0],
            items[1],
            items[2]
        ]);
    });
});

//# sourceMappingURL=tenant-in-memory.repository.spec.js.map