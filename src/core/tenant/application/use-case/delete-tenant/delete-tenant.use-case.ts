import { TenantId } from '@core/tenant/domain/tenant.aggregate';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { ITenantRepository } from '../../../domain/tenant.repository';
import { DeleteTenantInput } from './delete-tenant.input';

export class DeleteTenantUseCase
  implements IUseCase<DeleteTenantInput, DeleteTenantOutput>
{
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(input: DeleteTenantInput): Promise<DeleteTenantOutput> {
    const tenantId = new TenantId(input.id);
    await this.tenantRepo.delete(tenantId);
  }
}

export type DeleteTenantOutput = void;
