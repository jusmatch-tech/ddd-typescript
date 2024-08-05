import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Tenant, TenantId } from '../../../domain/tenant.aggregate';
import { ITenantRepository } from '../../../domain/tenant.repository';
import { TenantOutput, TenantOutputMapper } from '../common/tenant-output';
import { GetTenantInput } from './get-tenant.input';

export class GetTenantUseCase
  implements IUseCase<GetTenantInput, GetTenantOutput>
{
  constructor(private readonly tenantRepo: ITenantRepository) {}

  async execute(input: GetTenantInput): Promise<GetTenantOutput> {
    const tenantId = new TenantId(input.id);
    const entity = await this.tenantRepo.findById(tenantId);

    if (!entity) {
      throw new NotFoundError(input.id, Tenant);
    }

    return TenantOutputMapper.toOutput(entity);
  }
}

export type GetTenantOutput = TenantOutput;
