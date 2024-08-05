"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetTenantUseCase", {
    enumerable: true,
    get: function() {
        return GetTenantUseCase;
    }
});
const _notfounderror = require("../../../../shared/domain/errors/not-found.error");
const _uuidvo = require("../../../../shared/domain/value-objects/uuid.vo");
const _tenantentity = require("../../../domain/tenant.entity");
const _tenantoutput = require("../common/tenant-output");
let GetTenantUseCase = class GetTenantUseCase {
    async execute(input) {
        const uuid = new _uuidvo.Uuid(input.id);
        const entity = await this.tenantRepo.findById(uuid);
        if (!entity) {
            throw new _notfounderror.NotFoundError(input.id, _tenantentity.Tenant);
        }
        return _tenantoutput.TenantOutputMapper.toOutput(entity);
    }
    constructor(tenantRepo){
        this.tenantRepo = tenantRepo;
    }
};

//# sourceMappingURL=get-tenant.use-case.js.map