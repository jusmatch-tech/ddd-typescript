import { ISearchableRepository } from '../../shared/domain/repository/repository-interface';
import { Tenant, TenantId } from './tenant.aggregate';
import { SearchParams } from '../../shared/domain/repository/search-params';
import { SearchResult } from '../../shared/domain/repository/search-result';

export type TenantFilter = string;

export class TenantSearchParams extends SearchParams<TenantFilter> {}

export class TenantSearchResult extends SearchResult<Tenant> {}

export interface ITenantRepository
  extends ISearchableRepository<
    Tenant,
    TenantId,
    TenantFilter,
    TenantSearchParams,
    TenantSearchResult
  > {}
