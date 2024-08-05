import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Tenant, TenantId } from '../../../domain/tenant.aggregate';
import { ITenantRepository } from '../../../domain/tenant.repository';
import { TenantOutput, TenantOutputMapper } from '../common/tenant-output';
import { UpdateTenantInput } from './update-tenant.input';

export class UpdateTenantUseCase
  implements IUseCase<UpdateTenantInput, UpdateTenantOutput>
{
  constructor(private readonly tenantRepo: ITenantRepository) {}

  async execute(input: UpdateTenantInput): Promise<UpdateTenantOutput> {
    const tenantId = new TenantId(input.id);
    const entity = await this.tenantRepo.findById(tenantId);

    if (!entity) {
      throw new NotFoundError(input.id, Tenant);
    }

    input.name && entity.changeName(input.name);

    if (input.description !== undefined) {
      entity.changeDescription(input.description!);
    }
    if (input.is_active === true) {
      entity.activate();
    }
    if (input.is_active === false) {
      entity.deactivate();
    }
    await this.tenantRepo.update(entity);

    return TenantOutputMapper.toOutput(entity);
  }
}

export type UpdateTenantOutput = TenantOutput;
