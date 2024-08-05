import { TenantOutput } from '@core/tenant/application/use-case/common/tenant-output';
import { ListTenantsOutput } from '@core/tenant/application/use-case/list-tenants/list-tenants.use-case';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../shared-module/collection.presenter';

export class TenantPresenter {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date;

  constructor(output: TenantOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
  }
}

export class TenantCollectionPresenter extends CollectionPresenter {
  data: TenantPresenter[];

  constructor(output: ListTenantsOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new TenantPresenter(item));
  }
}
