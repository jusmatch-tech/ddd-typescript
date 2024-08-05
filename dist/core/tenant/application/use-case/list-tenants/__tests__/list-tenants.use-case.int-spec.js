"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _helpers = require("../../../../../shared/infra/testing/helpers");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantsequelizerepository = require("../../../../infra/db/sequelize/tenant-sequelize.repository");
const _tenantmodel = require("../../../../infra/db/sequelize/tenant.model");
const _tenantoutput = require("../../common/tenant-output");
const _listtenantsusecase = require("../list-tenants.use-case");
describe('ListTenantUseCase Integration tests', ()=>{
    let useCase;
    let repository;
    (0, _helpers.setupSequelize)({
        models: [
            _tenantmodel.TenantModel
        ]
    });
    beforeEach(()=>{
        repository = new _tenantsequelizerepository.TenantSequelizeRepository(_tenantmodel.TenantModel);
        useCase = new _listtenantsusecase.ListTenantsUseCase(repository);
    });
    it('should return output soprted by created_at when input params is empty', async ()=>{
        const tenants = _tenantentity.Tenant.fake().theTenants(2).withCreatedAt((i)=>new Date(new Date().getTime() + 1000 + i)).build();
        await repository.bulkInsert(tenants);
        const output = await useCase.execute({});
        expect(output).toEqual({
            items: [
                ...tenants
            ].reverse().map(_tenantoutput.TenantOutputMapper.toOutput),
            total: 2,
            current_page: 1,
            per_page: 15,
            last_page: 1
        });
    });
    it('should return output using pagination, sort and filter', async ()=>{
        const items = [
            new _tenantentity.Tenant({
                name: 'a'
            }),
            new _tenantentity.Tenant({
                name: 'AAA'
            }),
            new _tenantentity.Tenant({
                name: 'AaA'
            }),
            new _tenantentity.Tenant({
                name: 'b'
            }),
            new _tenantentity.Tenant({
                name: 'c'
            })
        ];
        await repository.bulkInsert(items);
        let output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'a'
        });
        expect(output).toEqual({
            items: [
                items[1],
                items[2]
            ].map(_tenantoutput.TenantOutputMapper.toOutput),
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
        output = await useCase.execute({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'a'
        });
        expect(output).toEqual({
            items: [
                items[0]
            ].map(_tenantoutput.TenantOutputMapper.toOutput),
            total: 3,
            current_page: 2,
            per_page: 2,
            last_page: 2
        });
        output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'a'
        });
        expect(output).toStrictEqual({
            items: [
                items[0],
                items[2]
            ].map(_tenantoutput.TenantOutputMapper.toOutput),
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
    });
});

//# sourceMappingURL=list-tenants.use-case.int-spec.js.map