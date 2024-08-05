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
    TenantCollectionPresenter: function() {
        return TenantCollectionPresenter;
    },
    TenantPresenter: function() {
        return TenantPresenter;
    }
});
const _classtransformer = require("class-transformer");
const _collectionpresenter = require("../shared-module/collection.presenter");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TenantPresenter = class TenantPresenter {
    constructor(output){
        this.id = output.id;
        this.name = output.name;
        this.description = output.description;
        this.is_active = output.is_active;
        this.created_at = output.created_at;
        this.updated_at = output.updated_at;
    }
};
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>value.toISOString()),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TenantPresenter.prototype, "created_at", void 0);
let TenantCollectionPresenter = class TenantCollectionPresenter extends _collectionpresenter.CollectionPresenter {
    constructor(output){
        const { items, ...paginationProps } = output;
        super(paginationProps);
        this.data = items.map((item)=>new TenantPresenter(item));
    }
};

//# sourceMappingURL=tenants.presenter.js.map