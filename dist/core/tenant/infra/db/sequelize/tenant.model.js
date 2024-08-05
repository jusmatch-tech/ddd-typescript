"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantModel", {
    enumerable: true,
    get: function() {
        return TenantModel;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TenantModel = class TenantModel extends _sequelizetypescript.Model {
};
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.UUID
    }),
    _ts_metadata("design:type", String)
], TenantModel.prototype, "tenant_id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        allowNull: false,
        type: _sequelizetypescript.DataType.STRING(255)
    }),
    _ts_metadata("design:type", String)
], TenantModel.prototype, "name", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        allowNull: true,
        type: _sequelizetypescript.DataType.TEXT
    }),
    _ts_metadata("design:type", String)
], TenantModel.prototype, "description", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        allowNull: false,
        type: _sequelizetypescript.DataType.BOOLEAN
    }),
    _ts_metadata("design:type", Boolean)
], TenantModel.prototype, "is_active", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        allowNull: false,
        type: _sequelizetypescript.DataType.DATE(3)
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TenantModel.prototype, "created_at", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        allowNull: false,
        type: _sequelizetypescript.DataType.DATE(3)
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TenantModel.prototype, "updated_at", void 0);
TenantModel = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'tenants'
    })
], TenantModel);

//# sourceMappingURL=tenant.model.js.map