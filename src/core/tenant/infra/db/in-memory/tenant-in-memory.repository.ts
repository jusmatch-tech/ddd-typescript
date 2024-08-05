import {
  ITenantRepository,
  TenantFilter,
} from '@core/tenant/domain/tenant.repository';
import { SortDirection } from '../../../../shared/domain/repository/search-params';
import { InMemorySearchableRepository } from '../../../../shared/infra/db/in-memory/in-memory.repository';
import { Tenant, TenantId } from '../../../domain/tenant.aggregate';

export class TenantInMemoryRepository
  extends InMemorySearchableRepository<Tenant, TenantId>
  implements ITenantRepository
{
  sortableFields: string[] = ['name', 'created_at', 'updated_at'];

  protected async applyFilter(
    items: Tenant[],
    filter: TenantFilter | null,
  ): Promise<Tenant[]> {
    if (!filter) return items;

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  getEntity(): new (...args: any[]) => Tenant {
    return Tenant;
  }

  protected applySort(
    items: Tenant[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
