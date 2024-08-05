"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _chance = require("chance");
const _tenantfakebuilders = require("../tenant-fake.builders");
const _uuidvo = require("../../../shared/domain/value-objects/uuid.vo");
describe('TenantFakerBuilder Unit Tests', ()=>{
    describe('tenant_id prop', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        test('should throw error when any with methods has called', ()=>{
            expect(()=>faker.tenant_id).toThrow(new Error("Property tenant_id not have a factory, use 'with' methods"));
        });
        test('should be undefined', ()=>{
            expect(faker['_tenant_id']).toBeUndefined();
        });
        test('withTenantId', ()=>{
            const tenant_id = new _uuidvo.Uuid();
            const $this = faker.withUuid(tenant_id);
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_tenant_id']).toBe(tenant_id);
            faker.withUuid(()=>tenant_id);
            //@ts-expect-error _tenant_id is a callable
            expect(faker['_tenant_id']()).toBe(tenant_id);
            expect(faker.tenant_id).toBe(tenant_id);
        });
        test('should pass index to tenant_id factory', ()=>{
            let mockFactory = jest.fn(()=>new _uuidvo.Uuid());
            faker.withUuid(mockFactory);
            faker.build();
            expect(mockFactory).toHaveBeenCalledTimes(1);
            const tenantId = new _uuidvo.Uuid();
            mockFactory = jest.fn(()=>tenantId);
            const fakerMany = _tenantfakebuilders.TenantFakeBuilder.theTenants(2);
            fakerMany.withUuid(mockFactory);
            fakerMany.build();
            expect(mockFactory).toHaveBeenCalledTimes(2);
            expect(fakerMany.build()[0].tenant_id).toBe(tenantId);
            expect(fakerMany.build()[1].tenant_id).toBe(tenantId);
        });
    });
    describe('name prop', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        test('should be a function', ()=>{
            expect(typeof faker['_name']).toBe('function');
        });
        test('should call the word method', ()=>{
            const chance = (0, _chance.Chance)();
            const spyWordMethod = jest.spyOn(chance, 'word');
            faker['chance'] = chance;
            faker.build();
            expect(spyWordMethod).toHaveBeenCalled();
        });
        test('withName', ()=>{
            const $this = faker.withName('test name');
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_name']).toBe('test name');
            faker.withName(()=>'test name');
            //@ts-expect-error name is callable
            expect(faker['_name']()).toBe('test name');
            expect(faker.name).toBe('test name');
        });
        test('should pass index to name factory', ()=>{
            faker.withName((index)=>`test name ${index}`);
            const tenant = faker.build();
            expect(tenant.name).toBe(`test name 0`);
            const fakerMany = _tenantfakebuilders.TenantFakeBuilder.theTenants(2);
            fakerMany.withName((index)=>`test name ${index}`);
            const tenants = fakerMany.build();
            expect(tenants[0].name).toBe(`test name 0`);
            expect(tenants[1].name).toBe(`test name 1`);
        });
        test('invalid too long case', ()=>{
            const $this = faker.withInvalidNameTooLong();
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_name'].length).toBe(256);
            const tooLong = 'a'.repeat(256);
            faker.withInvalidNameTooLong(tooLong);
            expect(faker['_name'].length).toBe(256);
            expect(faker['_name']).toBe(tooLong);
        });
    });
    describe('description prop', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        test('should be a function', ()=>{
            expect(typeof faker['_description']).toBe('function');
        });
        test('should call the paragraph method', ()=>{
            const chance = (0, _chance.Chance)();
            const spyParagraphMethod = jest.spyOn(chance, 'paragraph');
            faker['chance'] = chance;
            faker.build();
            expect(spyParagraphMethod).toHaveBeenCalled();
        });
        test('withDescription', ()=>{
            const $this = faker.withDescription('test description');
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_description']).toBe('test description');
            faker.withDescription(()=>'test description');
            //@ts-expect-error description is callable
            expect(faker['_description']()).toBe('test description');
            expect(faker.description).toBe('test description');
        });
        test('should pass index to description factory', ()=>{
            faker.withDescription((index)=>`test description ${index}`);
            const tenant = faker.build();
            expect(tenant.description).toBe(`test description 0`);
            const fakerMany = _tenantfakebuilders.TenantFakeBuilder.theTenants(2);
            fakerMany.withDescription((index)=>`test description ${index}`);
            const tenants = fakerMany.build();
            expect(tenants[0].description).toBe(`test description 0`);
            expect(tenants[1].description).toBe(`test description 1`);
        });
    });
    describe('is_active prop', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        test('should be a function', ()=>{
            expect(typeof faker['_is_active']).toBe('function');
        });
        test('activate', ()=>{
            const $this = faker.activate();
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_is_active']).toBe(true);
            expect(faker.is_active).toBe(true);
        });
        test('deactivate', ()=>{
            const $this = faker.deactivate();
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_is_active']).toBe(false);
            expect(faker.is_active).toBe(false);
        });
    });
    describe('created_at prop', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        test('should throw error when any with methods has called', ()=>{
            const fakerTenant = _tenantfakebuilders.TenantFakeBuilder.aTenant();
            expect(()=>fakerTenant.created_at).toThrow(new Error("Property created_at not have a factory, use 'with' methods"));
        });
        test('should be undefined', ()=>{
            expect(faker['_created_at']).toBeUndefined();
        });
        test('withCreatedAt', ()=>{
            const date = new Date();
            const $this = faker.withCreatedAt(date);
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_created_at']).toBe(date);
            faker.withCreatedAt(()=>date);
            //@ts-expect-error _created_at is a callable
            expect(faker['_created_at']()).toBe(date);
            expect(faker.created_at).toBe(date);
        });
        test('should pass index to created_at factory', ()=>{
            const date = new Date();
            faker.withCreatedAt((index)=>new Date(date.getTime() + index + 2));
            const tenant = faker.build();
            expect(tenant.created_at.getTime()).toBe(date.getTime() + 2);
            const fakerMany = _tenantfakebuilders.TenantFakeBuilder.theTenants(2);
            fakerMany.withCreatedAt((index)=>new Date(date.getTime() + index + 2));
            const tenants = fakerMany.build();
            expect(tenants[0].created_at.getTime()).toBe(date.getTime() + 2);
            expect(tenants[1].created_at.getTime()).toBe(date.getTime() + 3);
        });
    });
    describe('updated_at prop', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        test('should throw error when any with methods has called', ()=>{
            const fakerTenant = _tenantfakebuilders.TenantFakeBuilder.aTenant();
            expect(()=>fakerTenant.updated_at).toThrow(new Error("Property updated_at not have a factory, use 'with' methods"));
        });
        test('should be undefined', ()=>{
            expect(faker['_updated_at']).toBeUndefined();
        });
        test('withUpdatedAt', ()=>{
            const date = new Date();
            const $this = faker.withUpdatedAt(date);
            expect($this).toBeInstanceOf(_tenantfakebuilders.TenantFakeBuilder);
            expect(faker['_updated_at']).toBe(date);
            faker.withCreatedAt(()=>date);
            //expect(faker['_updated_at']()).toBe(date);
            expect(faker.updated_at).toBe(date);
        });
        test('should pass index to updated_at factory', ()=>{
            const date = new Date();
            faker.withUpdatedAt((index)=>new Date(date.getTime() + index + 2));
            const tenant = faker.build();
            expect(tenant.updated_at.getTime()).toBe(date.getTime() + 2);
            const fakerMany = _tenantfakebuilders.TenantFakeBuilder.theTenants(2);
            fakerMany.withUpdatedAt((index)=>new Date(date.getTime() + index + 2));
            const tenants = fakerMany.build();
            expect(tenants[0].updated_at.getTime()).toBe(date.getTime() + 2);
            expect(tenants[1].updated_at.getTime()).toBe(date.getTime() + 3);
        });
    });
    test('should create a tenant', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.aTenant();
        let tenant = faker.build();
        expect(tenant.tenant_id).toBeInstanceOf(_uuidvo.Uuid);
        expect(typeof tenant.name === 'string').toBeTruthy();
        expect(typeof tenant.description === 'string').toBeTruthy();
        expect(tenant.is_active).toBe(true);
        expect(tenant.created_at).toBeInstanceOf(Date);
        const created_at = new Date();
        const updated_at = new Date();
        const tenant_id = new _uuidvo.Uuid();
        tenant = faker.withUuid(tenant_id).withName('name test').withDescription('description test').deactivate().withCreatedAt(created_at).withUpdatedAt(updated_at).build();
        expect(tenant.tenant_id.id).toBe(tenant_id.id);
        expect(tenant.name).toBe('name test');
        expect(tenant.description).toBe('description test');
        expect(tenant.is_active).toBe(false);
        expect(tenant.created_at).toBe(created_at);
    });
    test('should create many tenants', ()=>{
        const faker = _tenantfakebuilders.TenantFakeBuilder.theTenants(2);
        let tenants = faker.build();
        tenants.forEach((tenant)=>{
            expect(tenant.tenant_id).toBeInstanceOf(_uuidvo.Uuid);
            expect(typeof tenant.name === 'string').toBeTruthy();
            expect(typeof tenant.description === 'string').toBeTruthy();
            expect(tenant.is_active).toBe(true);
            expect(tenant.created_at).toBeInstanceOf(Date);
            expect(tenant.updated_at).toBeInstanceOf(Date);
        });
        const created_at = new Date();
        const updated_at = new Date();
        const tenant_id = new _uuidvo.Uuid();
        tenants = faker.withUuid(tenant_id).withName('name test').withDescription('description test').deactivate().withCreatedAt(created_at).withUpdatedAt(updated_at).build();
        tenants.forEach((tenant)=>{
            expect(tenant.tenant_id.id).toBe(tenant_id.id);
            expect(tenant.name).toBe('name test');
            expect(tenant.description).toBe('description test');
            expect(tenant.is_active).toBe(false);
            expect(tenant.created_at).toBe(created_at);
            expect(tenant.updated_at).toBe(updated_at);
        });
    });
});

//# sourceMappingURL=tenant-fake.builders.spec.js.map