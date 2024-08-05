import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export type UpdateTenantInputConstructorProps = {
  id: string;
  name?: string | null;
  description?: string | null;
  is_active?: boolean;
};

export class UpdateTenantInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  constructor(props: UpdateTenantInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.is_active = props.is_active;
  }
}

export class ValidateUpdateTenantInput {
  static validate(input: UpdateTenantInput) {
    return validateSync(input);
  }
}
