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
    CONFIG_DB_SCHEMA: function() {
        return CONFIG_DB_SCHEMA;
    },
    ConfigModule: function() {
        return ConfigModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _path = require("path");
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const CONFIG_DB_SCHEMA = {
    DB_VENDOR: _joi.default.string().required().valid('mysql', 'sqlite'),
    DB_HOST: _joi.default.string().required(),
    DB_DATABASE: _joi.default.string().when('DB_VENDOR', {
        is: 'mysql',
        then: _joi.default.required()
    }),
    DB_USERNAME: _joi.default.string().when('DB_VENDOR', {
        is: 'mysql',
        then: _joi.default.required()
    }),
    DB_PASSWORD: _joi.default.string().when('DB_VENDOR', {
        is: 'mysql',
        then: _joi.default.required()
    }),
    DB_PORT: _joi.default.number().integer().when('DB_VENDOR', {
        is: 'mysql',
        then: _joi.default.required()
    }),
    DB_LOGGING: _joi.default.boolean().required(),
    DB_AUTO_LOAD_MODELS: _joi.default.boolean().required()
};
let ConfigModule = class ConfigModule extends _config.ConfigModule {
    static forRoot(options = {}) {
        const { envFilePath, ...otherOptions } = options;
        return super.forRoot({
            isGlobal: true,
            envFilePath: [
                ...Array.isArray(envFilePath) ? envFilePath : [
                    envFilePath
                ],
                (0, _path.join)(process.cwd(), 'envs', `.env.${process.env.NODE_ENV}`),
                (0, _path.join)(process.cwd(), 'envs', '.env')
            ],
            validationSchema: _joi.default.object({
                ...CONFIG_DB_SCHEMA
            }),
            ...otherOptions
        });
    }
};
ConfigModule = _ts_decorate([
    (0, _common.Module)({})
], ConfigModule);

//# sourceMappingURL=config.module.js.map