import { MaxLength } from 'class-validator';
import { Tenant } from './tenant.aggregate';
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields';
import { Notification } from '../../shared/domain/validators/notification';

export class TenantRules {
  @MaxLength(255, { groups: ['name'] })
  name: string;

  constructor(entity: Tenant) {
    Object.assign(this, entity);
  }
}

export class TenantValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['name'];
    return super.validate(notification, new TenantRules(data), newFields);
  }
}
export class TenantValidatorFactory {
  static create() {
    return new TenantValidator();
  }
}
