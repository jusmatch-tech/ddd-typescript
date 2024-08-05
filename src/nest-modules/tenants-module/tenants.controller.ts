import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CreateTenantUseCase } from '@core/tenant/application/use-case/create-tenant/create-tenant.use-case';
import { UpdateTenantUseCase } from '@core/tenant/application/use-case/update-tenant/update-tenant.use-case';
import { DeleteTenantUseCase } from '@core/tenant/application/use-case/delete-tenant/delete-tenant.use-case';
import { GetTenantUseCase } from '@core/tenant/application/use-case/get-tenant/get-tenant.use-case';
import { ListTenantsUseCase } from '@core/tenant/application/use-case/list-tenants/list-tenants.use-case';
import {
  TenantPresenter,
  TenantCollectionPresenter,
} from './tenants.presenter';
import { TenantOutput } from '@core/tenant/application/use-case/common/tenant-output';
import { SearchTenantsDto } from './dto/search-tenants.dto';

@Controller('tenants')
export class TenantsController {
  @Inject(CreateTenantUseCase)
  private createUseCase: CreateTenantUseCase;

  @Inject(UpdateTenantUseCase)
  private updateUseCase: UpdateTenantUseCase;

  @Inject(DeleteTenantUseCase)
  private deleteUseCase: DeleteTenantUseCase;

  @Inject(GetTenantUseCase)
  private getUseCase: GetTenantUseCase;

  @Inject(ListTenantsUseCase)
  private listUseCase: ListTenantsUseCase;

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    const output = await this.createUseCase.execute(createTenantDto);
    return TenantsController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchTenantsDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new TenantCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.getUseCase.execute({ id });
    return TenantsController.serialize(output);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    const output = await this.updateUseCase.execute({
      ...updateTenantDto,
      id,
    });
    return TenantsController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: TenantOutput) {
    return new TenantPresenter(output);
  }
}
