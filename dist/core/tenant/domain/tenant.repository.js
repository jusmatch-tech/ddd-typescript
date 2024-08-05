"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    TenantSearchParams: function() {
        return TenantSearchParams;
    },
    TenantSearchResult: function() {
        return TenantSearchResult;
    }
});
const _searchparams = require("../../shared/domain/repository/search-params");
const _searchresult = require("../../shared/domain/repository/search-result");
let TenantSearchParams = class TenantSearchParams extends _searchparams.SearchParams {
};
let TenantSearchResult = class TenantSearchResult extends _searchresult.SearchResult {
};

//# sourceMappingURL=tenant.repository.js.map