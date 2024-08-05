"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantsModule", {
    enumerable: true,
    get: function() {
        return TenantsModule;
    }
});
const _sequelize = require("@nestjs/sequelize");
const _common = require("@nestjs/common");
const _tenantscontroller = require("./tenants.controller");
const _tenantmodel = require("../../core/tenant/infra/db/sequelize/tenant.model");
const _tenantsproviders = require("./tenants.providers");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TenantsModule = class TenantsModule {
};
TenantsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _sequelize.SequelizeModule.forFeature([
                _tenantmodel.TenantModel
            ])
        ],
        controllers: [
            _tenantscontroller.TenantsController
        ],
        providers: [
            ...Object.values(_tenantsproviders.TENANT_PROVIDERS.REPOSITORIES),
            ...Object.values(_tenantsproviders.TENANT_PROVIDERS.USE_CASES)
        ]
    })
], TenantsModule);

//# sourceMappingURL=tenants.module.js.map