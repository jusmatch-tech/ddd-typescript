"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantInMemoryRepository", {
    enumerable: true,
    get: function() {
        return TenantInMemoryRepository;
    }
});
const _inmemoryrepository = require("../../../../shared/infra/db/in-memory/in-memory.repository");
const _tenantentity = require("../../../domain/tenant.entity");
let TenantInMemoryRepository = class TenantInMemoryRepository extends _inmemoryrepository.InMemorySearchableRepository {
    async applyFilter(items, filter) {
        if (!filter) return items;
        return items.filter((i)=>{
            return i.name.toLowerCase().includes(filter.toLowerCase());
        });
    }
    getEntity() {
        return _tenantentity.Tenant;
    }
    applySort(items, sort, sort_dir, custom_getter) {
        return sort ? super.applySort(items, sort, sort_dir) : super.applySort(items, 'created_at', 'desc');
    }
    constructor(...args){
        super(...args);
        this.sortableFields = [
            'name',
            'created_at',
            'updated_at'
        ];
    }
};

//# sourceMappingURL=tenant-in-memory.repository.js.map