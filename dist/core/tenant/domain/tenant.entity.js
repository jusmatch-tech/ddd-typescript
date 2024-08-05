"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Tenant", {
    enumerable: true,
    get: function() {
        return Tenant;
    }
});
const _uuidvo = require("../../shared/domain/value-objects/uuid.vo");
const _tenantvalidator = require("./tenant.validator");
const _entity = require("../../shared/domain/entity");
const _tenantfakebuilders = require("./tenant-fake.builders");
let Tenant = class Tenant extends _entity.Entity {
    get entity_id() {
        return this.tenant_id;
    }
    static create(props) {
        const tenant = new Tenant(props);
        tenant.validate([
            'name'
        ]);
        return tenant;
    }
    changeName(name) {
        this.name = name;
        this.validate([
            'name'
        ]);
    }
    changeDescription(description) {
        this.description = description;
        this.validate([
            'name'
        ]);
    }
    activate() {
        this.is_active = true;
    }
    deactivate() {
        this.is_active = false;
    }
    validate(fields) {
        const validator = _tenantvalidator.TenantValidatorFactory.create();
        return validator.validate(this.notification, this, fields);
    }
    static fake() {
        return _tenantfakebuilders.TenantFakeBuilder;
    }
    toJSON() {
        return {
            tenant_id: this.tenant_id.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
    constructor(props){
        super();
        this.tenant_id = props.tenant_id ?? new _uuidvo.Uuid();
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.created_at = props.created_at ?? new Date();
        this.updated_at = props.updated_at ?? new Date();
    }
};

//# sourceMappingURL=tenant.entity.js.map