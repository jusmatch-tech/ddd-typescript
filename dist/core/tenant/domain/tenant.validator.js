"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    TenantRules: function() {
        return TenantRules;
    },
    TenantValidator: function() {
        return TenantValidator;
    },
    TenantValidatorFactory: function() {
        return TenantValidatorFactory;
    }
});
const _classvalidator = require("class-validator");
const _classvalidatorfields = require("../../shared/domain/validators/class-validator-fields");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TenantRules = class TenantRules {
    constructor(entity){
        Object.assign(this, entity);
    }
};
_ts_decorate([
    (0, _classvalidator.MaxLength)(255, {
        groups: [
            'name'
        ]
    }),
    _ts_metadata("design:type", String)
], TenantRules.prototype, "name", void 0);
let TenantValidator = class TenantValidator extends _classvalidatorfields.ClassValidatorFields {
    validate(notification, data, fields) {
        const newFields = fields?.length ? fields : [
            'name'
        ];
        return super.validate(notification, new TenantRules(data), newFields);
    }
};
let TenantValidatorFactory = class TenantValidatorFactory {
    static create() {
        return new TenantValidator();
    }
};

//# sourceMappingURL=tenant.validator.js.map