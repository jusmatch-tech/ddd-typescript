"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _databasemodule = require("../database.module");
const _sequelize = require("@nestjs/sequelize");
const _configmodule = require("../../config-module/config.module");
describe('DatabaseModule Unit Tests', ()=>{
    describe('sqlite connection', ()=>{
        const connOptions = {
            DB_VENDOR: 'sqlite',
            DB_HOST: ':memory:',
            DB_LOGGING: false,
            DB_AUTO_LOAD_MODELS: true
        };
        it('should be a sqlite connection', async ()=>{
            const module = await _testing.Test.createTestingModule({
                imports: [
                    _databasemodule.DatabaseModule,
                    _configmodule.ConfigModule.forRoot({
                        isGlobal: true,
                        ignoreEnvFile: true,
                        ignoreEnvVars: true,
                        validationSchema: null,
                        load: [
                            ()=>connOptions
                        ]
                    })
                ]
            }).compile();
            const app = module.createNestApplication();
            const conn = app.get((0, _sequelize.getConnectionToken)());
            expect(conn).toBeDefined();
            expect(conn.options.dialect).toBe('sqlite');
            expect(conn.options.host).toBe(':memory:');
            await conn.close();
        });
    });
    describe('mysql connection', ()=>{
        const connOptions = {
            DB_VENDOR: 'mysql',
            DB_HOST: 'db',
            DB_DATABASE: 'wise360pro',
            DB_USERNAME: 'root',
            DB_PASSWORD: 'root',
            DB_PORT: 3306,
            DB_LOGGING: false,
            DB_AUTO_LOAD_MODELS: true
        };
        it('should be a mysql connection', async ()=>{
            const module = await _testing.Test.createTestingModule({
                imports: [
                    _databasemodule.DatabaseModule,
                    _configmodule.ConfigModule.forRoot({
                        isGlobal: true,
                        ignoreEnvFile: true,
                        ignoreEnvVars: true,
                        validationSchema: null,
                        load: [
                            ()=>connOptions
                        ]
                    })
                ]
            }).compile();
            const app = module.createNestApplication();
            const conn = app.get((0, _sequelize.getConnectionToken)());
            expect(conn).toBeDefined();
            expect(conn.options.dialect).toBe(connOptions.DB_VENDOR);
            expect(conn.options.host).toBe(connOptions.DB_HOST);
            expect(conn.options.database).toBe(connOptions.DB_DATABASE);
            expect(conn.options.username).toBe(connOptions.DB_USERNAME);
            expect(conn.options.password).toBe(connOptions.DB_PASSWORD);
            expect(conn.options.port).toBe(connOptions.DB_PORT);
            await conn.close();
        });
    });
});

//# sourceMappingURL=database.module.spec.js.map