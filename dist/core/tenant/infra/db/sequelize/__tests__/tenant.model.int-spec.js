"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _helpers = require("../../../../../shared/infra/testing/helpers");
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantmodel = require("../tenant.model");
describe('TenantModel Integration Tests', ()=>{
    (0, _helpers.setupSequelize)({
        models: [
            _tenantmodel.TenantModel
        ]
    });
    test('should create a tenant', async ()=>{
        const tenant = _tenantentity.Tenant.fake().aTenant().build();
        await _tenantmodel.TenantModel.create({
            tenant_id: tenant.tenant_id.id,
            name: tenant.name,
            description: tenant.description,
            is_active: tenant.is_active,
            created_at: tenant.created_at,
            updated_at: tenant.updated_at
        });
    });
});

//# sourceMappingURL=tenant.model.int-spec.js.map