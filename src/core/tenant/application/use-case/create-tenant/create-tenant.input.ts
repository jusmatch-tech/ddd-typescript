import { IsBoolean, IsNotEmpty, IsOptional, IsString, validateSync } from "class-validator";
import { Is } from "sequelize-typescript";

export type CreateTenantInputConstructorProps = {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export class CreateTenantInput {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string | null;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  constructor(props: CreateTenantInputConstructorProps) {
    if(!props) return;

    this.name = props.name;
    this.description = props.description;
    this.is_active = props.is_active;
  }

}

export class ValidateCreateTenantInput {
  static validate(input: CreateTenantInput) {
    return validateSync(input)
  }
}