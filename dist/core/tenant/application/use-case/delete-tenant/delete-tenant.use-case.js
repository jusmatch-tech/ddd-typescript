"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteTenantUseCase", {
    enumerable: true,
    get: function() {
        return DeleteTenantUseCase;
    }
});
const _uuidvo = require("../../../../shared/domain/value-objects/uuid.vo");
let DeleteTenantUseCase = class DeleteTenantUseCase {
    async execute(input) {
        const uuid = new _uuidvo.Uuid(input.id);
        await this.tenantRepo.delete(uuid);
    }
    constructor(tenantRepo){
        this.tenantRepo = tenantRepo;
    }
};

//# sourceMappingURL=delete-tenant.use-case.js.map