"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginationPresenter", {
    enumerable: true,
    get: function() {
        return PaginationPresenter;
    }
});
const _classtransformer = require("class-transformer");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PaginationPresenter = class PaginationPresenter {
    constructor(props){
        this.current_page = props.current_page;
        this.per_page = props.per_page;
        this.last_page = props.last_page;
        this.total = props.total;
    }
};
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>parseInt(value)),
    _ts_metadata("design:type", Number)
], PaginationPresenter.prototype, "current_page", void 0);
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>parseInt(value)),
    _ts_metadata("design:type", Number)
], PaginationPresenter.prototype, "per_page", void 0);
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>parseInt(value)),
    _ts_metadata("design:type", Number)
], PaginationPresenter.prototype, "last_page", void 0);
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>parseInt(value)),
    _ts_metadata("design:type", Number)
], PaginationPresenter.prototype, "total", void 0);

//# sourceMappingURL=pagination.presenter.js.map