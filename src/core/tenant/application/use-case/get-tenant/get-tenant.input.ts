import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export type GetTenantInputConstructorProps = {
  id: string;
};
export class GetTenantInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(props: GetTenantInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateCreateTenantInput {
  static validate(input: GetTenantInput) {
    return validateSync(input);
  }
}
