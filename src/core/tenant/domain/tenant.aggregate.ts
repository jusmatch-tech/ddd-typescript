import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { TenantValidatorFactory } from './tenant.validator';
import { ValueObject } from '../../shared/domain/value-object';
import { TenantFakeBuilder } from './tenant-fake.builders';
import { AggregateRoot } from '@core/shared/domain/aggregate-root';

export type TenantConstructorProps = {
  tenant_id?: TenantId;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type TenantCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class TenantId extends Uuid {}

export class Tenant extends AggregateRoot {
  tenant_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(props: TenantConstructorProps) {
    super();
    this.tenant_id = props.tenant_id ?? new TenantId();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.tenant_id;
  }

  static create(props: TenantCreateCommand): Tenant {
    const tenant = new Tenant(props);
    tenant.validate(['name']);
    return tenant;
  }
  changeName(name: string): void {
    this.name = name;
    this.validate(['name']);
  }

  changeDescription(description: string): void {
    this.description = description;
    this.validate(['name']);
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  validate(fields?: string[]) {
    const validator = TenantValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  static fake() {
    return TenantFakeBuilder;
  }

  toJSON() {
    return {
      tenant_id: this.tenant_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
