"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _configmodule = require("../config.module");
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
const _path = require("path");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function expectValidate(schema, value) {
    return expect(schema.validate(value, {
        abortEarly: false
    }).error.message);
}
describe('Schema Unit Tests', ()=>{
    describe('DB Schema', ()=>{
        const schema = _joi.default.object({
            ..._configmodule.CONFIG_DB_SCHEMA
        });
        describe('DB_VENDOR', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {}).toContain('"DB_VENDOR" is required');
                expectValidate(schema, {
                    DB_VENDOR: 'invalid'
                }).toContain('"DB_VENDOR" must be one of [mysql, sqlite]');
            });
            test('valid cases', ()=>{
                const arrange = [
                    'mysql',
                    'sqlite'
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, {
                        DB_VENDOR: value
                    }).not.toContain('DB_VENDOR');
                });
            });
        });
        describe('DB_HOST', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {}).toContain('"DB_HOST" is required');
                expectValidate(schema, {
                    DB_HOST: 1
                }).toContain('"DB_HOST" must be a string');
            });
            test('valid cases', ()=>{
                const arrange = [
                    'some value'
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, {
                        DB_HOST: value
                    }).not.toContain('DB_HOST');
                });
            });
        });
        describe('DB_DATABASE', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {
                    DB_VENDOR: 'sqlite'
                }).not.toContain('"DB_DATABASE" is required');
                expectValidate(schema, {
                    DB_VENDOR: 'mysql'
                }).toContain('"DB_DATABASE" is required');
                expectValidate(schema, {
                    DB_DATABASE: 1
                }).toContain('"DB_DATABASE" must be a string');
            });
            test('valid cases', ()=>{
                expectValidate(schema, {
                    DB_DATABASE: 'root'
                }).not.toContain('DB_DATABASE');
            });
            test('valid cases', ()=>{
                const arrange = [
                    {
                        DB_VENDOR: 'sqlite'
                    },
                    {
                        DB_VENDOR: 'sqlite',
                        DB_DATABASE: 'some value'
                    },
                    {
                        DB_VENDOR: 'mysql',
                        DB_DATABASE: 'some value'
                    }
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, value).not.toContain('DB_DATABASE');
                });
            });
        });
        describe('DB_USERNAME', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {
                    DB_VENDOR: 'sqlite'
                }).not.toContain('"DB_USERNAME" is required');
                expectValidate(schema, {
                    DB_VENDOR: 'mysql'
                }).toContain('"DB_USERNAME" is required');
                expectValidate(schema, {
                    DB_USERNAME: 1
                }).toContain('"DB_USERNAME" must be a string');
            });
            test('valid cases', ()=>{
                const arrange = [
                    {
                        DB_VENDOR: 'sqlite'
                    },
                    {
                        DB_VENDOR: 'sqlite',
                        DB_USERNAME: 'some value'
                    },
                    {
                        DB_VENDOR: 'mysql',
                        DB_USERNAME: 'some value'
                    }
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, value).not.toContain('DB_USERNAME');
                });
            });
        });
        describe('DB_PASSWORD', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {
                    DB_VENDOR: 'sqlite'
                }).not.toContain('"DB_PASSWORD" is required');
                expectValidate(schema, {
                    DB_VENDOR: 'mysql'
                }).toContain('"DB_PASSWORD" is required');
                expectValidate(schema, {
                    DB_PASSWORD: 1
                }).toContain('"DB_PASSWORD" must be a string');
            });
            test('valid cases', ()=>{
                const arrange = [
                    {
                        DB_VENDOR: 'sqlite'
                    },
                    {
                        DB_VENDOR: 'sqlite',
                        DB_PASSWORD: 'some value'
                    },
                    {
                        DB_VENDOR: 'mysql',
                        DB_PASSWORD: 'some value'
                    }
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, value).not.toContain('DB_PASSWORD');
                });
            });
        });
        describe('DB_PORT', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {
                    DB_VENDOR: 'sqlite'
                }).not.toContain('"DB_PORT" is required');
                expectValidate(schema, {
                    DB_VENDOR: 'mysql'
                }).toContain('"DB_PORT" is required');
                expectValidate(schema, {
                    DB_PORT: 'a'
                }).toContain('"DB_PORT" must be a number');
                expectValidate(schema, {
                    DB_PORT: '1.2'
                }).toContain('"DB_PORT" must be an integer');
            });
            test('valid cases', ()=>{
                const arrange = [
                    {
                        DB_VENDOR: 'sqlite'
                    },
                    {
                        DB_VENDOR: 'sqlite',
                        DB_PORT: 10
                    },
                    {
                        DB_VENDOR: 'sqlite',
                        DB_PORT: '10'
                    },
                    {
                        DB_VENDOR: 'mysql',
                        DB_PORT: 10
                    },
                    {
                        DB_VENDOR: 'mysql',
                        DB_PORT: '10'
                    }
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, value).not.toContain('DB_PORT');
                });
            });
        });
        describe('DB_LOGGING', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {}).toContain('"DB_LOGGING" is required');
                expectValidate(schema, {
                    DB_LOGGING: 'a'
                }).toContain('"DB_LOGGING" must be a boolean');
            });
            test('valid cases', ()=>{
                const arrange = [
                    true,
                    false,
                    'true',
                    'false'
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, {
                        DB_LOGGING: value
                    }).not.toContain('DB_LOGGING');
                });
            });
        });
        describe('DB_AUTO_LOAD_MODELS', ()=>{
            test('invalid cases', ()=>{
                expectValidate(schema, {}).toContain('"DB_AUTO_LOAD_MODELS" is required');
                expectValidate(schema, {
                    DB_AUTO_LOAD_MODELS: 'a'
                }).toContain('"DB_AUTO_LOAD_MODELS" must be a boolean');
            });
            test('valid cases', ()=>{
                const arrange = [
                    true,
                    false,
                    'true',
                    'false'
                ];
                arrange.forEach((value)=>{
                    expectValidate(schema, {
                        DB_AUTO_LOAD_MODELS: value
                    }).not.toContain('DB_AUTO_LOAD_MODELS');
                });
            });
        });
    });
});
describe('ConfigModule Unit Tests', ()=>{
    it('should throw an error when env vars are invalid', ()=>{
        try {
            _testing.Test.createTestingModule({
                imports: [
                    _configmodule.ConfigModule.forRoot({
                        envFilePath: (0, _path.join)(__dirname, '.env.fake')
                    })
                ]
            });
            fail('ConfigModule should throw an error when env vars are invalid');
        } catch (e) {
            expect(e.message).toContain('"DB_VENDOR" must be one of [mysql, sqlite]');
        }
    });
    it('should be valid', ()=>{
        const module = _testing.Test.createTestingModule({
            imports: [
                _configmodule.ConfigModule.forRoot()
            ]
        });
        expect(module).toBeDefined();
    });
});

//# sourceMappingURL=config.module.spec.js.map