"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantFakeBuilder", {
    enumerable: true,
    get: function() {
        return TenantFakeBuilder;
    }
});
const _chance = require("chance");
const _tenantentity = require("./tenant.entity");
let TenantFakeBuilder = class TenantFakeBuilder {
    static aTenant() {
        return new TenantFakeBuilder();
    }
    static theTenants(countObjs) {
        return new TenantFakeBuilder(countObjs);
    }
    withUuid(valueOrFactory) {
        this._tenant_id = valueOrFactory;
        return this;
    }
    withName(valueOrFactory) {
        this._name = valueOrFactory;
        return this;
    }
    withDescription(valueOrFactory) {
        this._description = valueOrFactory;
        return this;
    }
    activate() {
        this._is_active = true;
        return this;
    }
    deactivate() {
        this._is_active = false;
        return this;
    }
    withCreatedAt(valueOrFactory) {
        this._created_at = valueOrFactory;
        return this;
    }
    withUpdatedAt(valueOrFactory) {
        this._updated_at = valueOrFactory;
        return this;
    }
    withInvalidNameTooLong(value) {
        this._name = value ?? this.chance.word({
            length: 256
        });
        return this;
    }
    build() {
        const tenants = new Array(this.countObjs).fill(undefined).map((_, index)=>{
            const tenant = new _tenantentity.Tenant({
                tenant_id: !this._tenant_id ? undefined : this.callFactory(this._tenant_id, index),
                name: this.callFactory(this._name, index),
                description: this.callFactory(this._description, index),
                is_active: this.callFactory(this._is_active, index),
                ...this._created_at && {
                    created_at: this.callFactory(this._created_at, index)
                },
                ...this._updated_at && {
                    updated_at: this.callFactory(this._updated_at, index)
                }
            });
            tenant.validate();
            return tenant;
        });
        return this.countObjs === 1 ? tenants[0] : tenants;
    }
    get tenant_id() {
        return this.getValue('tenant_id');
    }
    get name() {
        return this.getValue('name');
    }
    get description() {
        return this.getValue('description');
    }
    get is_active() {
        return this.getValue('is_active');
    }
    get created_at() {
        return this.getValue('created_at');
    }
    get updated_at() {
        return this.getValue('updated_at');
    }
    getValue(prop) {
        const optional = [
            'tenant_id',
            'created_at',
            'updated_at'
        ];
        const privateProp = `_${prop}`;
        if (!this[privateProp] && optional.includes(prop)) {
            throw new Error(`Property ${prop} not have a factory, use 'with' methods`);
        }
        return this.callFactory(this[privateProp], 0);
    }
    callFactory(factoryOrValue, index) {
        return typeof factoryOrValue === 'function' ? factoryOrValue(index) : factoryOrValue;
    }
    constructor(countObjs = 1){
        // auto generated in entity
        this._tenant_id = undefined;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._name = (_index)=>this.chance.word();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._description = (_index)=>this.chance.paragraph();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._is_active = (_index)=>true;
        // auto generated in entity
        this._created_at = undefined;
        // auto generated in entity
        this._updated_at = undefined;
        this.countObjs = countObjs;
        this.chance = (0, _chance.Chance)();
    }
};

//# sourceMappingURL=tenant-fake.builders.js.map