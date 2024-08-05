"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantsController", {
    enumerable: true,
    get: function() {
        return TenantsController;
    }
});
const _common = require("@nestjs/common");
const _createtenantdto = require("./dto/create-tenant.dto");
const _updatetenantdto = require("./dto/update-tenant.dto");
const _createtenantusecase = require("../../core/tenant/application/use-case/create-tenant/create-tenant.use-case");
const _updatetenantusecase = require("../../core/tenant/application/use-case/update-tenant/update-tenant.use-case");
const _deletetenantusecase = require("../../core/tenant/application/use-case/delete-tenant/delete-tenant.use-case");
const _gettenantusecase = require("../../core/tenant/application/use-case/get-tenant/get-tenant.use-case");
const _listtenantsusecase = require("../../core/tenant/application/use-case/list-tenants/list-tenants.use-case");
const _tenantspresenter = require("./tenants.presenter");
const _searchtenantsdto = require("./dto/search-tenants.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let TenantsController = class TenantsController {
    async create(createTenantDto) {
        const output = await this.createUseCase.execute(createTenantDto);
        return TenantsController.serialize(output);
    }
    async search(searchParamsDto) {
        const output = await this.listUseCase.execute(searchParamsDto);
        return new _tenantspresenter.TenantCollectionPresenter(output);
    }
    async findOne(id) {
        const output = await this.getUseCase.execute({
            id
        });
        return TenantsController.serialize(output);
    }
    async update(id, updateTenantDto) {
        const output = await this.updateUseCase.execute({
            ...updateTenantDto,
            id
        });
        return TenantsController.serialize(output);
    }
    remove(id) {
        return this.deleteUseCase.execute({
            id
        });
    }
    static serialize(output) {
        return new _tenantspresenter.TenantPresenter(output);
    }
};
_ts_decorate([
    (0, _common.Inject)(_createtenantusecase.CreateTenantUseCase),
    _ts_metadata("design:type", typeof _createtenantusecase.CreateTenantUseCase === "undefined" ? Object : _createtenantusecase.CreateTenantUseCase)
], TenantsController.prototype, "createUseCase", void 0);
_ts_decorate([
    (0, _common.Inject)(_updatetenantusecase.UpdateTenantUseCase),
    _ts_metadata("design:type", typeof _updatetenantusecase.UpdateTenantUseCase === "undefined" ? Object : _updatetenantusecase.UpdateTenantUseCase)
], TenantsController.prototype, "updateUseCase", void 0);
_ts_decorate([
    (0, _common.Inject)(_deletetenantusecase.DeleteTenantUseCase),
    _ts_metadata("design:type", typeof _deletetenantusecase.DeleteTenantUseCase === "undefined" ? Object : _deletetenantusecase.DeleteTenantUseCase)
], TenantsController.prototype, "deleteUseCase", void 0);
_ts_decorate([
    (0, _common.Inject)(_gettenantusecase.GetTenantUseCase),
    _ts_metadata("design:type", typeof _gettenantusecase.GetTenantUseCase === "undefined" ? Object : _gettenantusecase.GetTenantUseCase)
], TenantsController.prototype, "getUseCase", void 0);
_ts_decorate([
    (0, _common.Inject)(_listtenantsusecase.ListTenantsUseCase),
    _ts_metadata("design:type", typeof _listtenantsusecase.ListTenantsUseCase === "undefined" ? Object : _listtenantsusecase.ListTenantsUseCase)
], TenantsController.prototype, "listUseCase", void 0);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createtenantdto.CreateTenantDto === "undefined" ? Object : _createtenantdto.CreateTenantDto
    ]),
    _ts_metadata("design:returntype", Promise)
], TenantsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _searchtenantsdto.SearchTenantsDto === "undefined" ? Object : _searchtenantsdto.SearchTenantsDto
    ]),
    _ts_metadata("design:returntype", Promise)
], TenantsController.prototype, "search", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe({
        errorHttpStatusCode: 422
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], TenantsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe({
        errorHttpStatusCode: 422
    }))),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatetenantdto.UpdateTenantDto === "undefined" ? Object : _updatetenantdto.UpdateTenantDto
    ]),
    _ts_metadata("design:returntype", Promise)
], TenantsController.prototype, "update", null);
_ts_decorate([
    (0, _common.HttpCode)(204),
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe({
        errorHttpStatusCode: 422
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], TenantsController.prototype, "remove", null);
TenantsController = _ts_decorate([
    (0, _common.Controller)('tenants')
], TenantsController);

//# sourceMappingURL=tenants.controller.js.map