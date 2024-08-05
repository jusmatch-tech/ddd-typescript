import { TenantsController } from '../tenants.controller';
import { SortDirection } from '@core/shared/domain/repository/search-params';
import { CreateTenantOutput } from '@core/tenant/application/use-case/create-tenant/create-tenant.use-case';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import {
  TenantPresenter,
  TenantCollectionPresenter,
} from '../tenants.presenter';
import { UpdateTenantOutput } from '@core/tenant/application/use-case/update-tenant/update-tenant.use-case';
import { UpdateTenantInput } from '@core/tenant/application/use-case/update-tenant/update-tenant.input';
import { GetTenantOutput } from '@core/tenant/application/use-case/get-tenant/get-tenant.use-case';
import { ListTenantsOutput } from '@core/tenant/application/use-case/list-tenants/list-tenants.use-case';

describe('TenantsController Unit tests', () => {
  let controller: TenantsController;

  beforeEach(async () => {
    controller = new TenantsController();
  });

  it('should creates a tenant', async () => {
    //Arrange
    const output: CreateTenantOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateTenantDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };

    //Act
    const presenter = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(TenantPresenter);
    expect(presenter).toStrictEqual(new TenantPresenter(output));
  });

  it('should updates a tenant', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: UpdateTenantOutput = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: Omit<UpdateTenantInput, 'id'> = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(TenantPresenter);
    expect(presenter).toStrictEqual(new TenantPresenter(output));
  });

  it('should deletes a tenant', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error defined part of methods
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a tenant', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: GetTenantOutput = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['getUseCase'] = mockGetUseCase;
    const presenter = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(TenantPresenter);
    expect(presenter).toStrictEqual(new TenantPresenter(output));
  });

  it('should list tenants', async () => {
    const output: ListTenantsOutput = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['listUseCase'] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const presenter = await controller.search(searchParams);
    expect(presenter).toBeInstanceOf(TenantCollectionPresenter);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new TenantCollectionPresenter(output));
  });
});
