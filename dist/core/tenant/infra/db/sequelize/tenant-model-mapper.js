"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantModelMapper", {
    enumerable: true,
    get: function() {
        return TenantModelMapper;
    }
});
const _validationerror = require("../../../../shared/domain/validators/validation.error");
const _uuidvo = require("../../../../shared/domain/value-objects/uuid.vo");
const _tenantentity = require("../../../domain/tenant.entity");
const _tenantmodel = require("./tenant.model");
let TenantModelMapper = class TenantModelMapper {
    static toModel(entity) {
        return _tenantmodel.TenantModel.build({
            tenant_id: entity.tenant_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
    }
    static toEntity(model) {
        const tenant = new _tenantentity.Tenant({
            tenant_id: new _uuidvo.Uuid(model.tenant_id),
            name: model.name,
            description: model.description,
            is_active: model.is_active,
            created_at: model.created_at,
            updated_at: model.updated_at
        });
        tenant.validate();
        if (tenant.notification.hasErrors()) {
            throw new _validationerror.EntityValidationError(tenant.notification.toJSON());
        }
        return tenant;
    }
};

//# sourceMappingURL=tenant-model-mapper.js.map