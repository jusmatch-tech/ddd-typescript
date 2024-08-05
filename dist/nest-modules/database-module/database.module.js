"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseModule", {
    enumerable: true,
    get: function() {
        return DatabaseModule;
    }
});
const _tenantmodel = require("../../core/tenant/infra/db/sequelize/tenant.model");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _sequelize = require("@nestjs/sequelize");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const models = [
    _tenantmodel.TenantModel
];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _sequelize.SequelizeModule.forRootAsync({
                useFactory: (configService)=>{
                    const dbVendor = configService.get('DB_VENDOR');
                    if (dbVendor === 'sqlite') {
                        return {
                            dialect: 'sqlite',
                            host: configService.get('DB_HOST'),
                            models,
                            logging: configService.get('DB_LOGGING'),
                            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS')
                        };
                    }
                    if (dbVendor === 'mysql') {
                        return {
                            dialect: 'mysql',
                            host: configService.get('DB_HOST'),
                            port: configService.get('DB_PORT'),
                            username: configService.get('DB_USERNAME'),
                            password: configService.get('DB_PASSWORD'),
                            database: configService.get('DB_DATABASE'),
                            models,
                            logging: configService.get('DB_LOGGING'),
                            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS')
                        };
                    }
                    throw new Error(`Unsupported database configuration: ${dbVendor}`);
                },
                inject: [
                    _config.ConfigService
                ]
            })
        ]
    })
], DatabaseModule);

//# sourceMappingURL=database.module.js.map