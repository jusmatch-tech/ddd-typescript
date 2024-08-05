"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Config", {
    enumerable: true,
    get: function() {
        return Config;
    }
});
const _dotenv = require("dotenv");
const _path = require("path");
let Config = class Config {
    static db() {
        Config.readEnv();
        return {
            dialect: 'sqlite',
            host: Config.env.DB_HOST,
            logging: Config.env.DB_LOGGING === 'true'
        };
    }
    static readEnv() {
        if (Config.env) {
            return;
        }
        Config.env = (0, _dotenv.config)({
            path: (0, _path.join)(__dirname, `../../../../envs/.env.${process.env.NODE_ENV}`)
        }).parsed;
    }
};
Config.env = null;

//# sourceMappingURL=config.js.map