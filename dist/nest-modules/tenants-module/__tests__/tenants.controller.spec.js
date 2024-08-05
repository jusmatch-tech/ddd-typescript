"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _tenantscontroller = require("../tenants.controller");
const _tenantspresenter = require("../tenants.presenter");
describe('TenantsController Unit tests', ()=>{
    let controller;
    beforeEach(async ()=>{
        controller = new _tenantscontroller.TenantsController();
    });
    it('should creates a tenant', async ()=>{
        //Arrange
        const output = {
            id: '9366b7dc-2d71-4799-b91c-c64adb205104',
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        const mockCreateUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        };
        //@ts-expect-error defined part of methods
        controller['createUseCase'] = mockCreateUseCase;
        const input = {
            name: 'Movie',
            description: 'some description',
            is_active: true
        };
        //Act
        const presenter = await controller.create(input);
        //Assert
        expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
        expect(presenter).toBeInstanceOf(_tenantspresenter.TenantPresenter);
        expect(presenter).toStrictEqual(new _tenantspresenter.TenantPresenter(output));
    });
    it('should updates a tenant', async ()=>{
        const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
        const output = {
            id,
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        const mockUpdateUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        };
        //@ts-expect-error defined part of methods
        controller['updateUseCase'] = mockUpdateUseCase;
        const input = {
            name: 'Movie',
            description: 'some description',
            is_active: true
        };
        const presenter = await controller.update(id, input);
        expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({
            id,
            ...input
        });
        expect(presenter).toBeInstanceOf(_tenantspresenter.TenantPresenter);
        expect(presenter).toStrictEqual(new _tenantspresenter.TenantPresenter(output));
    });
    it('should deletes a tenant', async ()=>{
        const expectedOutput = undefined;
        const mockDeleteUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        };
        //@ts-expect-error defined part of methods
        controller['deleteUseCase'] = mockDeleteUseCase;
        const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
        expect(controller.remove(id)).toBeInstanceOf(Promise);
        const output = await controller.remove(id);
        expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({
            id
        });
        expect(expectedOutput).toStrictEqual(output);
    });
    it('should gets a tenant', async ()=>{
        const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
        const output = {
            id,
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        const mockGetUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        };
        //@ts-expect-error defined part of methods
        controller['getUseCase'] = mockGetUseCase;
        const presenter = await controller.findOne(id);
        expect(mockGetUseCase.execute).toHaveBeenCalledWith({
            id
        });
        expect(presenter).toBeInstanceOf(_tenantspresenter.TenantPresenter);
        expect(presenter).toStrictEqual(new _tenantspresenter.TenantPresenter(output));
    });
    it('should list tenants', async ()=>{
        const output = {
            items: [
                {
                    id: '9366b7dc-2d71-4799-b91c-c64adb205104',
                    name: 'Movie',
                    description: 'some description',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            current_page: 1,
            last_page: 1,
            per_page: 1,
            total: 1
        };
        const mockListUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        };
        //@ts-expect-error defined part of methods
        controller['listUseCase'] = mockListUseCase;
        const searchParams = {
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'test'
        };
        const presenter = await controller.search(searchParams);
        expect(presenter).toBeInstanceOf(_tenantspresenter.TenantCollectionPresenter);
        expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
        expect(presenter).toEqual(new _tenantspresenter.TenantCollectionPresenter(output));
    });
});

//# sourceMappingURL=tenants.controller.spec.js.map