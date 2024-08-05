"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _tenantsmodule = require("./nest-modules/tenants-module/tenants.module");
const _databasemodule = require("./nest-modules/database-module/database.module");
const _configmodule = require("./nest-modules/config-module/config.module");
const _sharedmodule = require("./nest-modules/shared-module/shared.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _configmodule.ConfigModule.forRoot(),
            _databasemodule.DatabaseModule,
            _tenantsmodule.TenantsModule,
            _sharedmodule.SharedModule
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map