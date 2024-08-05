import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';
import { SortDirection } from '../../../../shared/domain/repository/search-params';
import { TenantFilter } from '../../../domain/tenant.repository';

export type ListTenantsInputConstructorProps = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: TenantFilter | null;
};
export class ListTenantsInput {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  per_page?: number;

  @IsString()
  @IsOptional()
  sort?: string | null;

  @IsOptional()
  sort_dir?: SortDirection | null;

  @IsOptional()
  filter?: TenantFilter | null;

  constructor(props: ListTenantsInputConstructorProps) {
    if (!props) return;

    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }
}

export class ValidateListTenantsInput {
  static validate(input: ListTenantsInput) {
    return validateSync(input);
  }
}
