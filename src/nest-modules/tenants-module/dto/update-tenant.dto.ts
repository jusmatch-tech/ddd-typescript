import { UpdateTenantInput } from '@core/tenant/application/use-case/update-tenant/update-tenant.input';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateTenantInputWithoutId extends OmitType(UpdateTenantInput, [
  'id',
] as const) {}

export class UpdateTenantDto extends UpdateTenantInputWithoutId {}
