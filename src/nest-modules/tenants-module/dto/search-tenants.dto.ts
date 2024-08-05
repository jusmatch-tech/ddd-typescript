import { SortDirection } from '@core/shared/domain/repository/search-params';
import { ListTenantsInput } from '@core/tenant/application/use-case/list-tenants/list-tenants.input';

export class SearchTenantsDto implements ListTenantsInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
