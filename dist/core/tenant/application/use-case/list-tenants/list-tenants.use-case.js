"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ListTenantsUseCase", {
    enumerable: true,
    get: function() {
        return ListTenantsUseCase;
    }
});
const _paginationoutput = require("../../../../shared/application/pagination-output");
const _tenantrepository = require("../../../domain/tenant.repository");
const _tenantoutput = require("../common/tenant-output");
let ListTenantsUseCase = class ListTenantsUseCase {
    async execute(input) {
        const params = new _tenantrepository.TenantSearchParams(input);
        const searchResult = await this.tenantRepo.search(params);
        return this.toOutput(searchResult);
    }
    toOutput(searchResult) {
        const { items: _items } = searchResult;
        const items = _items.map((i)=>{
            return _tenantoutput.TenantOutputMapper.toOutput(i);
        });
        return _paginationoutput.PaginationOutputMapper.toOutput(items, searchResult);
    }
    constructor(tenantRepo){
        this.tenantRepo = tenantRepo;
    }
};

//# sourceMappingURL=list-tenants.use-case.js.map