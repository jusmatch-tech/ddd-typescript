import { Module } from '@nestjs/common';
import { TenantsModule } from './nest-modules/tenants-module/tenants.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { SharedModule } from './nest-modules/shared-module/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TenantsModule,
    SharedModule,
  ],
})
export class AppModule {}
