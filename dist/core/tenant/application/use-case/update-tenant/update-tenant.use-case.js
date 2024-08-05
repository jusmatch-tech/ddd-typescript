"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateTenantUseCase", {
    enumerable: true,
    get: function() {
        return UpdateTenantUseCase;
    }
});
const _notfounderror = require("../../../../shared/domain/errors/not-found.error");
const _uuidvo = require("../../../../shared/domain/value-objects/uuid.vo");
const _tenantentity = require("../../../domain/tenant.entity");
const _tenantoutput = require("../common/tenant-output");
let UpdateTenantUseCase = class UpdateTenantUseCase {
    async execute(input) {
        const uuid = new _uuidvo.Uuid(input.id);
        const entity = await this.tenantRepo.findById(uuid);
        if (!entity) {
            throw new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant);
        }
        input.name && entity.changeName(input.name);
        if (input.description !== undefined) {
            entity.changeDescription(input.description);
        }
        if (input.is_active === true) {
            entity.activate();
        }
        if (input.is_active === false) {
            entity.deactivate();
        }
        await this.tenantRepo.update(entity);
        return _tenantoutput.TenantOutputMapper.toOutput(entity);
    }
    constructor(tenantRepo){
        this.tenantRepo = tenantRepo;
    }
};

//# sourceMappingURL=update-tenant.use-case.js.map