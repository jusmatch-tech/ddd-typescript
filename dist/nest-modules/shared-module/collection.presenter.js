"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CollectionPresenter", {
    enumerable: true,
    get: function() {
        return CollectionPresenter;
    }
});
const _classtransformer = require("class-transformer");
const _paginationpresenter = require("./pagination.presenter");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CollectionPresenter = class CollectionPresenter {
    get meta() {
        return this.paginationPresenter;
    }
    constructor(props){
        this.paginationPresenter = new _paginationpresenter.PaginationPresenter(props);
    }
};
_ts_decorate([
    (0, _classtransformer.Exclude)(),
    _ts_metadata("design:type", typeof _paginationpresenter.PaginationPresenter === "undefined" ? Object : _paginationpresenter.PaginationPresenter)
], CollectionPresenter.prototype, "paginationPresenter", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)({
        name: 'meta'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], CollectionPresenter.prototype, "meta", null);

//# sourceMappingURL=collection.presenter.js.map