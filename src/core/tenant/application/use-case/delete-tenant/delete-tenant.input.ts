import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export type DeleteTenantInputConstructorProps = {
  id: string;
};
export class DeleteTenantInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(props: DeleteTenantInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateCreateTenantInput {
  static validate(input: DeleteTenantInput) {
    return validateSync(input);
  }
}
