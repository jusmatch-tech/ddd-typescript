import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../shared/application/pagination-output';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import {
  ITenantRepository,
  TenantSearchParams,
  TenantSearchResult,
} from '../../../domain/tenant.repository';
import { TenantOutput, TenantOutputMapper } from '../common/tenant-output';
import { ListTenantsInput } from './list-tenants.input';

export class ListTenantsUseCase
  implements IUseCase<ListTenantsInput, ListTenantsOutput>
{
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(input: ListTenantsInput): Promise<ListTenantsOutput> {
    const params = new TenantSearchParams(input);
    const searchResult = await this.tenantRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: TenantSearchResult): ListTenantsOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return TenantOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListTenantsOutput = PaginationOutput<TenantOutput>;
