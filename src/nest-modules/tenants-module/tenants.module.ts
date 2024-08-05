import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantModel } from '@core/tenant/infra/db/sequelize/tenant.model';
import { TENANT_PROVIDERS } from './tenants.providers';

@Module({
  imports: [SequelizeModule.forFeature([TenantModel])],
  controllers: [TenantsController],
  providers: [
    ...Object.values(TENANT_PROVIDERS.REPOSITORIES),
    ...Object.values(TENANT_PROVIDERS.USE_CASES),
  ],
})
export class TenantsModule {}
