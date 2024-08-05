"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantrepository = require("../../../../domain/tenant.repository");
const _tenantinmemoryrepository = require("../../../../infra/db/in-memory/tenant-in-memory.repository");
const _tenantoutput = require("../../common/tenant-output");
const _listtenantsusecase = require("../list-tenants.use-case");
describe('ListTenantUseCase Unit tests', ()=>{
    let useCase;
    let repository;
    beforeEach(()=>{
        repository = new _tenantinmemoryrepository.TenantInMemoryRepository();
        useCase = new _listtenantsusecase.ListTenantsUseCase(repository);
    });
    test('output method', async ()=>{
        let result = new _tenantrepository.TenantSearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
        const entity = _tenantentity.Tenant.create({
            name: 'test'
        });
        result = new _tenantrepository.TenantSearchResult({
            items: [
                entity
            ],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [
                entity
            ].map(_tenantoutput.TenantOutputMapper.toOutput),
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
    });
    it('should return output soprted by created_at when input params is empty', async ()=>{
        const items = [
            new _tenantentity.Tenant({
                name: 'test1'
            }),
            new _tenantentity.Tenant({
                name: 'test2',
                created_at: new Date(new Date().getTime() + 1000)
            })
        ];
        repository.items = items;
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [
                ...items
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
        repository.items = items;
        let output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'a'
        });
        expect(output).toStrictEqual({
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
        expect(output).toStrictEqual({
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

//# sourceMappingURL=list-tenants.use-case.spec.js.map